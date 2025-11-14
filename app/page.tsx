"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ["hero", "how", "pricing", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white text-gray-800 scroll-smooth">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white/40 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Image src="/img1.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
              WeSticker
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-semibold">
            <a href="#hero" className={activeSection === "hero" ? "text-green-600" : "text-gray-700"}>
              Home
            </a>
            <a href="#how" className={activeSection === "how" ? "text-green-600" : "text-gray-700"}>
              Order
            </a>
            <a href="#pricing" className={activeSection === "pricing" ? "text-green-600" : "text-gray-700"}>
              Pricing
            </a>
            <a href="#contact" className={activeSection === "contact" ? "text-green-600" : "text-gray-700"}>
              Contact
            </a>
            {/* NEW: Stickers Page Link */}
            <a href="/stickers" className="text-gray-700 hover:text-green-600">
              Stickers
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.07 }}
            className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-md"
          >
            Cart
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="hero" className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image src="/img1.jpg" alt="Hero" fill className="object-cover brightness-75" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-green-400">WeSticker</span>
          </h1>
          <p className="max-w-xl mx-auto mb-6">
            Personalize your world — choose your favorite stickers and express yourself!
          </p>

          <a
            href="/stickers"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow"
          >
            Browse Stickers
          </a>
        </div>
      </section>

<section
  id="how"
  className="py-20 px-8 text-center"
  style={{
    backgroundColor: "#E6F4EA", // soft light green
  }}
>
  <h2 className="text-4xl font-bold text-green-700 mb-6">How to Order</h2>

  <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
    Follow these simple steps to place an order:
    <br /><br />

    <span className="font-bold">1. Browse Stickers:</span> Scroll through the stickers and explore all categories.
    <br /><br />

    <span className="font-bold">2. Add to Cart:</span> Click the <span className="font-bold">“+”</span> button on any sticker to add it to your cart.  
    Click <span className="font-bold">“×”</span> to remove it.
    <br /><br />

    <span className="font-bold">3. Contact Us:</span> Fill out the form with your details so we can confirm your order.
    <br /><br />

    <span className="font-bold">4. Order Confirmation:</span> We’ll reach out to finalize everything and start preparing your stickers!
  </p>
</section>

      {/* PRICING */}
      <section
  id="pricing"
  className="py-24 px-8 text-center"
  style={{
    backgroundImage:
      "radial-gradient(circle at 10px 10px, rgba(16,185,129,0.07) 1px, transparent 0)",
    backgroundSize: "44px 44px",
  }}
>
  <h2 className="text-4xl font-bold text-green-700 mb-4">Pricing</h2>

  <p className="text-gray-700 max-w-2xl mx-auto mb-14 text-lg">
    Simple and transparent pricing. No hidden charges. Choose what fits your needs!
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {/* BASIC */}
    <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
      <h3 className="text-2xl font-bold text-green-700">Basic Pack</h3>
      <p className="text-gray-500 mt-2 mb-6">Perfect for small orders</p>

      <p className="text-4xl font-extrabold text-gray-800 mb-6">$5</p>

      <ul className="text-gray-600 space-y-2 mb-6">
        <li>✔ 5 Stickers</li>
        <li>✔ Matte or Glossy</li>
        <li>✔ High-quality print</li>
      </ul>

      <a
        href="#order"
        className="block bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition font-medium"
      >
        Order Now
      </a>
    </div>

    {/* STANDARD */}
    <div className="bg-white p-10 rounded-2xl shadow-lg border border-green-400 hover:shadow-xl transition relative">
      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
        Best Value
      </span>

      <h3 className="text-2xl font-bold text-green-700">Standard Pack</h3>
      <p className="text-gray-500 mt-2 mb-6">Perfect for regular use</p>

      <p className="text-4xl font-extrabold text-gray-800 mb-6">$10</p>

      <ul className="text-gray-600 space-y-2 mb-6">
        <li>✔ 15 Stickers</li>
        <li>✔ Matte or Glossy</li>
        <li>✔ Custom sizes available</li>
      </ul>

      <a
        href="#order"
        className="block bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition font-medium"
      >
        Order Now
      </a>
    </div>

    {/* PREMIUM */}
    <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
      <h3 className="text-2xl font-bold text-green-700">Premium Pack</h3>
      <p className="text-gray-500 mt-2 mb-6">Best for large projects</p>

      <p className="text-4xl font-extrabold text-gray-800 mb-6">$20</p>

      <ul className="text-gray-600 space-y-2 mb-6">
        <li>✔ 40 Stickers</li>
        <li>✔ Matte, Glossy, or Transparent</li>
        <li>✔ Priority printing</li>
      </ul>

      <a
        href="#order"
        className="block bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition font-medium"
      >
        Order Now
      </a>
    </div>
  </div>
</section>


      <section
  id="contact"
  className="py-24 px-6 text-center bg-white"
>
  <h2 className="text-4xl font-bold text-green-700 mb-6">Contact Us</h2>
  <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-lg">
    Have questions, suggestions, or want a custom sticker order? Fill out the form below and we'll get back to you as soon as possible!
  </p>

  {/* CONTACT FORM */}
  <form 
    className="max-w-xl mx-auto bg-green-50 p-8 rounded-2xl shadow-lg space-y-5"
    onSubmit={(e) => {
      e.preventDefault();
      alert("Form submitted! Connect backend to send email.");
    }}
  >
    <input
      type="text"
      placeholder="Your Name"
      className="w-full border-2 border-green-400 p-3 rounded-lg bg-white focus:ring-2 focus:ring-green-400"
      required
    />

    <input
      type="email"
      placeholder="Your Email"
      className="w-full border-2 border-green-400 p-3 rounded-lg bg-white focus:ring-2 focus:ring-green-400"
      required
    />

    <textarea
      placeholder="Your Message"
      className="w-full border-2 border-green-400 p-3 rounded-lg h-32 resize-none bg-white focus:ring-2 focus:ring-green-400"
      required
    ></textarea>

    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg transition"
    >
      Send Message
    </button>
  </form>

  {/* SOCIAL MEDIA ICONS */}
  <h3 className="text-2xl font-semibold text-green-700 mt-14">Follow Us</h3>

  <div className="flex justify-center gap-10 mt-6">
    <a
      href="https://facebook.com"
      target="_blank"
      className="p-4 bg-green-50 rounded-full shadow-md hover:scale-110 transition"
    >
      <img src="/icons/facebook.png" alt="Facebook" className="w-7 h-7" />
    </a>

    <a
      href="https://instagram.com"
      target="_blank"
      className="p-4 bg-green-50 rounded-full shadow-md hover:scale-110 transition"
    >
      <img src="/icons/instagram.png" alt="Instagram" className="w-7 h-7" />
    </a>

    <a
      href="https://t.me"
      target="_blank"
      className="p-4 bg-green-50 rounded-full shadow-md hover:scale-110 transition"
    >
      <img src="/icons/telegram.png" alt="Telegram" className="w-7 h-7" />
    </a>

    <a
      href="mailto:yourshop@gmail.com"
      className="p-4 bg-green-50 rounded-full shadow-md hover:scale-110 transition"
    >
      <img src="/icons/tiktok.png" alt="Tiktok" className="w-7 h-7" />
    </a>
  </div>
</section>

    </main>
  );
}
