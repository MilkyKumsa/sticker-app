import { NextResponse } from "next/server";

const sizePricing: Record<string, number> = {
  Small: 40,
  Medium: 60,
  Large: 100,
};

export async function POST(req: Request) {
  const botToken = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
  }

  const contentType = req.headers.get("content-type") || "";

  try {
    // -------------------------
    // Custom Order (FormData)
    // -------------------------
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;
      const quantityStr = formData.get("quantity") as string;
      const size = formData.get("size") as string;
      const image = formData.get("image") as File | null;

      if (!image) return NextResponse.json({ error: "Image required" }, { status: 400 });

      const quantity = parseInt(quantityStr);
      if (quantity < 5) {
        return NextResponse.json({ error: "Minimum order quantity is 5" }, { status: 400 });
      }

      const unitPrice = sizePricing[size] ?? 0;
      const totalPrice = unitPrice * quantity;

      const caption = `
📦 *CUSTOM STICKER ORDER*
👤 Name: ${name}
📞 Phone: ${phone}
📐 Size: ${size}
🔢 Quantity: ${quantity}
💰 Total Price: ${totalPrice} ETB
      `;

      const tgForm = new FormData();
      tgForm.append("chat_id", chatId);
      tgForm.append("caption", caption);
      tgForm.append("parse_mode", "Markdown");
      tgForm.append("photo", image);

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000);

      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: tgForm,
        signal: controller.signal,
      });

      if (!tgRes.ok) {
        const text = await tgRes.text();
        console.error("Telegram error:", text);
        return NextResponse.json({ error: "Failed to send to Telegram" }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // -------------------------
    // Normal Checkout (JSON)
    // -------------------------
    const body = await req.json();
    const { name, phone, items, payableAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const text = `
🛒 *NEW ORDER*
👤 Name: ${name}
📞 Phone: ${phone}
💰 Total: ${payableAmount} ETB

${items.map((i: any) => `• ${i.sticker} (${i.size}) x${i.quantity ?? 1}`).join("\n")}
    `;

    const resMsg = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });

    if (!resMsg.ok) {
      const text = await resMsg.text();
      console.error("Telegram error:", text);
      return NextResponse.json({ error: "Failed to send to Telegram" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
