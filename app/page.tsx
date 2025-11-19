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
    <main className="relative overflow-hidden bg-transparent text-gray-800 scroll-smooth">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(147,197,253,0.25),transparent_55%)]"></div>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 border border-white/70 shadow-[0_15px_60px_rgba(15,118,110,0.12)] backdrop-blur-xl"
            : "bg-white/40 border border-white/60 shadow-none backdrop-blur-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Image src="/animal/animal_5.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Stickify
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-semibold">
            <a href="#hero" className={activeSection === "hero" ? "text-indigo-600" : "text-gray-700"}>
              Home
            </a>
            <a href="#how" className={activeSection === "how" ? "text-indigo-600" : "text-gray-700"}>
              Order
            </a>
            <a href="#pricing" className={activeSection === "pricing" ? "text-indigo-600" : "text-gray-700"}>
              Pricing
            </a>
            <a href="#contact" className={activeSection === "contact" ? "text-indigo-600" : "text-gray-700"}>
              Contact
            </a>
            {/* NEW: Stickers Page Link */}
            <a href="/stickers" className="text-gray-700 hover:text-indigo-500">
              Stickers
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="ml-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-indigo-200"
          >
            Cart
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image src="/img4.jpg" alt="Hero" fill className="object-cover brightness-75 blur-[4px]" />
        </motion.div> 

        <div className="relative z-10 glass-panel max-w-3xl text-center px-10 py-12">
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-200 mb-4">Premium Stickers & Prints</p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Stick Your <span className="text-indigo-200">Story</span>, Define Your Space
          </h1>
          <p className="max-w-xl mx-auto mb-8 font-medium text-white/90">
            We craft expressive sticker sets for brands, creators, and dreamers. Order sustainably printed designs that
            effortlessly elevate laptops, bottles, and packaging.
          </p>

          <a
            href="/stickers"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-12  py-3 rounded-full font-bold shadow"
          >
            Browse Stickers
          </a>
        </div>
      </section>

      <section id="how" className="py-20 px-6 md:px-10">
        <div className="mx-auto max-w-5xl glass-panel px-10 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Process</p>
          <h2 className="text-4xl font-bold text-indigo-700 mt-3 mb-10">How to Order</h2>
          <div className="grid gap-10 md:grid-cols-4 text-left">
            {[
              { title: "Browse", desc: "Explore curated packs across animals, tech, art, and more." },
              { title: "Select", desc: "Tap + on your favorites and pick your perfect size." },
              { title: "Share", desc: "Tell us about your project and deliverables in one form." },
              { title: "Confirm", desc: "We finalize proofing, print with eco-inks, and ship worldwide." },
            ].map((step, idx) => (
              <div key={step.title} className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm">
                <span className="text-sm font-semibold text-indigo-500">0{idx + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="py-24 px-6 md:px-10 bg-[radial-gradient(circle_at_10px_10px,rgba(129,140,248,0.08)_1px,transparent_0)] bg-[length:44px_44px]"
      >
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Simple Plans</p>
          <h2 className="text-4xl font-bold text-indigo-700 mt-3">Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Transparent packages for every scale — from a single storyboard to a brand-wide rollout.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Small Pack",
              desc: "Perfect for small orders",
              price: "40 ETB",
              perks: ["15x15 cm Stickers", "Matte or Glossy", "High-quality print"],
            },
            {
              name: "Standard Pack",
              desc: "Our most loved tier",
              price: "60 ETB",
              perks: ["30x30 cm Stickers", "Matte or Glossy", "Custom sizes available"],
              featured: true,
            },
            {
              name: "Large Pack",
              desc: "For serious sticker drops",
              price: "100 ETB",
              perks: ["50x50 cm Stickers", "Matte, Glossy, or Transparent", "Priority printing"],
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-10 shadow-xl transition hover:-translate-y-1 ${
                plan.featured
                  ? "border-indigo-200 bg-gradient-to-b from-white via-white to-indigo-50"
                  : "border-white/80 bg-white"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-8 rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white">
                  Best Value
                </span>
              )}
              <h3 className="text-2xl font-bold text-indigo-700">{plan.name}</h3>
              <p className="text-gray-500 mt-2 mb-6">{plan.desc}</p>
              <p className="text-4xl font-black text-gray-900 mb-6">{plan.price}</p>
              <ul className="text-gray-600 space-y-2 mb-6">
                {plan.perks.map((perk) => (
                  <li key={perk}>✔ {perk}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3 text-center font-semibold text-white shadow-indigo-200"
              >
                Order Now
              </a>
            </div>
          ))}
        </div>
      </section>


      <section id="contact" className="py-24 px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Say Hello</p>
          <h2 className="text-4xl font-bold text-indigo-700 mt-3 mb-6">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Need a custom illustration pack, rush order, or wholesale collaboration? Drop us a note and we will reach you
            within 24 hours.
          </p>
        </div>

        <form
          className="max-w-xl mx-auto glass-panel space-y-5 p-8"
  onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Type-safe access to form elements
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement;

    const data = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (err) {
      alert("Error sending message. Please try again later.");
      console.error(err);
    }
  }}
>
  <input
    name="name"
    type="text"
    placeholder="Your Name"
  className="w-full border-2 border-indigo-400 p-3 rounded-lg bg-white focus:ring-2 focus:ring-indigo-400"
    required
  />
  <input
    name="email"
    type="email"
    placeholder="Your Email"
  className="w-full border-2 border-indigo-400 p-3 rounded-lg bg-white focus:ring-2 focus:ring-indigo-400"
    required
  />
  <textarea
    name="message"
    placeholder="Your Message"
  className="w-full border-2 border-indigo-400 p-3 rounded-lg h-32 resize-none bg-white focus:ring-2 focus:ring-indigo-400"
    required
  />
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg shadow-indigo-200 transition"
  >
    Send Message
  </button>
</form>



  {/* SOCIAL MEDIA ICONS */}
        <h3 className="text-2xl font-semibold text-indigo-700 mt-14">Follow Us</h3>
        <div className="flex justify-center gap-6 mt-6">
          {[
            { icon: "/icons/facebook.png", href: "https://facebook.com" },
            { icon: "/icons/instagram.png", href: "https://instagram.com" },
            { icon: "/icons/telegram.png", href: "https://t.me" },
            { icon: "/icons/tiktok.png", href: "mailto:yourshop@gmail.com" },
          ].map((link) => (
            <a
              key={link.icon}
              href={link.href}
              target="_blank"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/80 shadow-md shadow-indigo-100 transition hover:-translate-y-1"
            >
              <img src={link.icon} alt="Social icon" className="h-6 w-6" />
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
