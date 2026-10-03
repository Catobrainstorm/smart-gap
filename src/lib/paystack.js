// src/lib/paystack.js
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Helper to dynamically load Paystack Inline JS script if not already loaded
export const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }
    const existingScript = document.getElementById("paystack-inline-script");
    if (existingScript) {
      existingScript.onload = () => resolve(window.PaystackPop);
      existingScript.onerror = () => reject(new Error("Failed to load Paystack script."));
      return;
    }
    const script = document.createElement("script");
    script.id = "paystack-inline-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve(window.PaystackPop);
    script.onerror = () => reject(new Error("Failed to load Paystack script."));
    document.body.appendChild(script);
  });
};

const PAYSTACK_PUBLIC_KEY =
  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ||
  "pk_live_6d12b16321a8e32ead290969b9c3c8f809556cdd";

/**
 * Trigger a Paystack payment popup
 * @param {Object} options
 * @param {string} options.email - Customer email
 * @param {number} options.amount - Amount in NGN (will be converted to kobo)
 * @param {string} options.type - 'sponsorship' | 'giftcard' | 'giftbox'
 * @param {Object} options.metadata - Extra data (senderName, recipientName, note, quantity, etc.)
 * @param {Function} options.onSuccess - Callback on payment success
 * @param {Function} options.onClose - Callback on modal close
 */
export const initializePaystackPayment = async ({
  email,
  amount,
  type = "giftcard",
  metadata = {},
  onSuccess,
  onClose,
  onError,
}) => {
  try {
    await loadPaystackScript();

    if (!window.PaystackPop) {
      throw new Error("Paystack SDK not available. Please check your internet connection.");
    }

    const reference = `SG_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    const amountInKobo = Math.round(Number(amount) * 100);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: amountInKobo,
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "Payment Type", variable_name: "payment_type", value: type },
          { display_name: "Donor / Sender", variable_name: "sender_name", value: metadata.senderName || "Anonymous" },
          { display_name: "Recipient", variable_name: "recipient_name", value: metadata.recipientName || "Self / General" },
          { display_name: "Phone", variable_name: "phone", value: metadata.phone || "N/A" },
          { display_name: "Notes", variable_name: "notes", value: metadata.note || "N/A" },
          { display_name: "Quantity / Tier", variable_name: "tier", value: metadata.tier || "Standard" },
        ],
      },
      callback: function (response) {
        console.log("Paystack Payment Successful:", response);

        // Record to Firestore asynchronously
        (async () => {
          try {
            const collectionName =
              type === "sponsorship"
                ? "sponsorships"
                : type === "giftbox"
                ? "giftboxes"
                : "giftcards";

            await addDoc(collection(db, collectionName), {
              email,
              amount: Number(amount),
              type,
              reference: response.reference || reference,
              paystackStatus: response.status || "success",
              transactionId: response.transaction || null,
              metadata,
              createdAt: serverTimestamp(),
            });
          } catch (dbErr) {
            console.error("Error saving payment to Firestore:", dbErr);
          }
        })();

        if (typeof onSuccess === "function") {
          onSuccess({
            ...response,
            reference: response.reference || reference,
            amount,
            email,
            metadata,
          });
        }
      },
      onClose: function () {
        if (typeof onClose === "function") onClose();
      },
    });

    handler.openIframe();
  } catch (err) {
    console.error("Paystack Initialization Error:", err);
    if (onError) onError(err);
    else alert(`Payment could not be started: ${err.message}`);
  }
};
