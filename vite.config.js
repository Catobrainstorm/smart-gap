import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import crypto from 'node:crypto'

const mintGiftCardsPlugin = () => ({
  name: 'mint-gift-cards-api',
  configureServer(server) {
    server.middlewares.use('/api/mint-gift-cards', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      let bodyStr = '';
      req.on('data', (chunk) => {
        bodyStr += chunk;
      });
      req.on('end', async () => {
        try {
          const env = loadEnv('development', process.cwd(), '');
          const secret =
            env.SMARTGAP_WEBHOOK_SECRET ||
            process.env.SMARTGAP_WEBHOOK_SECRET;

          if (!secret) {
            console.error('[SmartGap Mint Server] SMARTGAP_WEBHOOK_SECRET environment variable is missing');
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Server configuration error: webhook secret missing' }));
            return;
          }

          const order = JSON.parse(bodyStr);
          console.log('[SmartGap Mint Server] Order received:', order);

          // Build exact body string ONCE as required by the platform doc
          const payload = JSON.stringify({
            orderRef: String(order.orderRef),
            count: Math.min(10, Math.max(1, Number(order.count) || 1)),
            valueNaira: Number(order.valueNaira) || 50000,
            purchaser: order.purchaser || 'Valued Buyer',
            purchaserEmail: order.purchaserEmail,
            plan: 'GIFT_CARD',
            label: order.label || `Website order ${order.orderRef}`,
          });

          const timestamp = String(Date.now());
          const signature = crypto
            .createHmac('sha256', secret)
            .update(`${timestamp}.${payload}`)
            .digest('hex');

          console.log('[SmartGap Mint Server] Forwarding HMAC-signed payload to platform:');
          console.log('  Timestamp:', timestamp);
          console.log('  Signature:', signature.substring(0, 16) + '...');
          console.log('  Payload:', payload);

          const platformRes = await fetch(
            'https://play.thesmartgap.com/api/webhooks/gift-cards',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-smartgap-signature': signature,
                'x-smartgap-timestamp': timestamp,
              },
              body: payload,
            }
          );

          const responseText = await platformRes.text();
          console.log('[SmartGap Mint Server] Platform response status:', platformRes.status);
          console.log('[SmartGap Mint Server] Platform response text:', responseText);

          let responseData;
          try {
            responseData = JSON.parse(responseText);
          } catch (_) {
            responseData = { status: 'unknown_response', raw: responseText };
          }

          res.statusCode = platformRes.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(responseData));
        } catch (err) {
          console.error('[SmartGap Mint Server] Internal error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mintGiftCardsPlugin(),
  ],
  server: {
    proxy: {
      '/api/verify': {
        target: 'https://play.thesmartgap.com',
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})