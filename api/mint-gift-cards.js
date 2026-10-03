// api/mint-gift-cards.js
// Serverless handler for production deployments (Vercel, Netlify, or Node Express)
// Signs the webhook using SMARTGAP_WEBHOOK_SECRET and forwards to play.thesmartgap.com

import crypto from "node:crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const secret = process.env.SMARTGAP_WEBHOOK_SECRET;
    if (!secret) {
      console.error("[SmartGap Mint Serverless] SMARTGAP_WEBHOOK_SECRET environment variable is missing");
      return res.status(500).json({ error: "Server configuration error: webhook secret missing" });
    }

    const order = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    console.log("[SmartGap Mint Serverless] Order received:", order);

    const payload = JSON.stringify({
      orderRef: String(order.orderRef),
      count: Math.min(10, Math.max(1, Number(order.count) || 1)),
      valueNaira: Number(order.valueNaira) || 50000,
      purchaser: order.purchaser || "Valued Buyer",
      purchaserEmail: order.purchaserEmail,
      plan: "GIFT_CARD",
      label: order.label || `Website order ${order.orderRef}`,
    });

    const timestamp = String(Date.now());
    const signature = crypto
      .createHmac("sha256", secret)
      .update(`${timestamp}.${payload}`)
      .digest("hex");

    const platformRes = await fetch(
      "https://play.thesmartgap.com/api/webhooks/gift-cards",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-smartgap-signature": signature,
          "x-smartgap-timestamp": timestamp,
        },
        body: payload,
      }
    );

    const responseText = await platformRes.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (_) {
      responseData = { status: "unknown_response", raw: responseText };
    }

    return res.status(platformRes.status).json(responseData);
  } catch (err) {
    console.error("[SmartGap Mint Serverless] Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
