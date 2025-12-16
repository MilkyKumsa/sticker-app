import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const botToken = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram env vars missing" }, { status: 500 });
    }

    if (!body.name || !body.phone || !body.items || !body.payableAmount) {
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }

    // Build message
    const message =
      `🛒 *NEW ORDER*\n\n` +
      `*Name:* ${body.name}\n` +
      `*Phone:* ${body.phone}\n\n` +
      body.items.map((item: any, i: number) =>
        `${i + 1}. *Sticker:* ${item.sticker}\n   *Size:* ${item.size}\n   *Price:* ${item.price} ETB`
      ).join("\n\n") +
      `\n\n*Total Payable:* ${body.payableAmount} ETB`;

    // Send to Telegram
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const tgData = await tgRes.json();

    if (!tgData.ok) {
      return NextResponse.json({ error: tgData.description || "Telegram send failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error in sendOrder API:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
