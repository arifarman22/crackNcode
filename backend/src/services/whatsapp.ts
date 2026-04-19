import { env } from "../config/env";

export const sendWhatsAppNotification = async (phone: string, message: string) => {
  if (!env.WHATSAPP_API_URL || !env.WHATSAPP_API_TOKEN) {
    console.log(`[WhatsApp Mock] To: ${phone} | Message: ${message}`);
    return;
  }

  await fetch(env.WHATSAPP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.WHATSAPP_API_TOKEN}`,
    },
    body: JSON.stringify({ phone, message }),
  });
};

export const sendOrderWhatsApp = (phone: string, orderId: string, total: number) =>
  sendWhatsAppNotification(
    phone,
    `✅ Order Confirmed!\nOrder ID: ${orderId}\nTotal: $${total.toFixed(2)}\nThank you for choosing CrackNCode!`
  );
