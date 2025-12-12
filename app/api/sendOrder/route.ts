// app/api/sendOrder/route.ts
import { NextResponse } from "next/server";

interface Sticker {
  name: string;
  price: number;
}

interface Order {
  name: string;
  phone: string;
  stickers: Sticker[];
}

export async function POST(request: Request) {
  try {
    const order: Order = await request.json();

    if (!order.stickers || !Array.isArray(order.stickers)) {
      return NextResponse.json({ error: "Invalid order format" }, { status: 400 });
    }

    // Format the stickers for Telegram
    const formattedStickers = order.stickers
      .map((sticker: Sticker) => `• ${sticker.name} — $${sticker.price}`)
      .join("\n");

    // Build the Telegram message
    const telegramMessage = `
🛒 New Sticker Order

👤 Name: ${order.name}
📞 Phone: ${order.phone}
📝 Orders:
${formattedStickers}
    `.trim();

    // Send message to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      console.error("Telegram API error:", await response.text());
      return NextResponse.json({ error: "Failed to send Telegram message" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
