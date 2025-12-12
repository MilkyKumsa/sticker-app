import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, orders } = await req.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

    const message =
      `🛒 *New Sticker Order*\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `📝 Orders:\n` +
      orders.map((o: string) => `• ${o}`).join("\n");

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending order:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
