"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Sticker {
  id: number;
  title: string;
  category: string;
  image: string;
  size?: string;
}

export default function StickersPage() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<Sticker[]>([]);
  const [showSizeMenu, setShowSizeMenu] = useState<number | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("stickersCart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const updateCartState = (updater: (prev: Sticker[]) => Sticker[]) => {
    setCart((prev) => {
      const next = updater(prev);
      localStorage.setItem("stickersCart", JSON.stringify(next));
      return next;
    });
  };

  const addToCartWithSize = (sticker: Sticker, size: string) => {
    updateCartState((prev) => {
      if (prev.some((s) => s.id === sticker.id)) {
        return prev.map((s) =>
          s.id === sticker.id ? { ...s, size } : s
        );
      }
      return [...prev, { ...sticker, size }];
    });
    setShowSizeMenu(null);
  };

  const removeFromCart = (id: number) => {
    updateCartState((prev) => prev.filter((s) => s.id !== id));
  };

  /* ---------------- DATA ---------------- */
  const categories = ["Movies", "Spiritual", "Sports", "Tech"];

  const stickers: Sticker[] = [
    { id: 1, title: "Spiderman", category: "Movies", image: "/Movies/movies1.jpg" },
    { id: 2, title: "Simpsons", category: "Movies", image: "/Movies/movies2.jpg" },

    { id: 21, title: "Jesus is King", category: "Spiritual", image: "/spiritual/spiritual1.jpg" },
    { id: 22, title: "Cross", category: "Spiritual", image: "/spiritual/spiritual2.jpg" },

    { id: 33, title: "Football", category: "Sports", image: "/sport/sports1.jpg" },
    { id: 34, title: "Basketball", category: "Sports", image: "/sport/sports2.jpg" },

    { id: 45, title: "Tech 1", category: "Tech", image: "/tech/tech1.jpg" },
    { id: 46, title: "Tech 2", category: "Tech", image: "/tech/tech2.jpg" },
  ];

  /* ---------------- INIT SEE MORE ---------------- */
  useEffect(() => {
    const initial: Record<string, number> = {};
    categories.forEach((cat) => {
      const count = stickers.filter((s) => s.category === cat).length;
      initial[cat] = Math.min(15, count);
    });
    setVisibleCounts(initial);
  }, []);

  const toggleShowMore = (category: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [category]:
        prev[category] === 15
          ? stickers.filter((s) => s.category === category).length
          : 15,
    }));
  };

  /* ========================================================= */
  return (
    <main className="min-h-screen pt-24">

      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 transition-all ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg"
            : "bg-white/50 backdrop-blur-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/animal/favicon.ico" alt="Logo" width={36} height={36} />
            <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              StickerBet
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 font-semibold text-sm">
            <a href="/">Home</a>
            <a href="/#how">Order</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#contact">Contact</a>
            <a href="/stickers" className="text-indigo-600">Stickers</a>
          </div>

          {/* Desktop Cart */}
          <button
            onClick={() => setShowCart(true)}
            className="hidden md:block bg-indigo-500 text-white px-5 py-2 rounded-full"
          >
            Cart ({cart.length})
          </button>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-full bg-indigo-500 text-white"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="p-2 border rounded"
            >
              ☰
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 w-full bg-white z-40 border-b md:hidden"
          >
            {["Home", "Order", "Pricing", "Contact", "Stickers"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-4 border-b"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= STICKERS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {categories.map((cat) => {
          const catStickers = stickers.filter((s) => s.category === cat);
          return (
            <section key={cat} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-600">{cat}</h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {catStickers.map((sticker) => {
                  const inCart = cart.some((s) => s.id === sticker.id);
                  return (
                    <div key={sticker.id} className="relative h-28">
                      <Image src={sticker.image} alt={sticker.title} fill className="object-contain" />

                      <button
                        onClick={() =>
                          inCart
                            ? removeFromCart(sticker.id)
                            : setShowSizeMenu(sticker.id)
                        }
                        className={`absolute top-1 right-1 w-7 h-7 rounded-full text-white ${
                          inCart ? "bg-red-500" : "bg-indigo-500"
                        }`}
                      >
                        {inCart ? "×" : "+"}
                      </button>

                      {showSizeMenu === sticker.id && (
                        <div className="absolute top-8 right-1 bg-white shadow-lg rounded p-2 text-sm">
                          {["Small", "Medium", "Large"].map((s) => (
                            <button
                              key={s}
                              className="block px-2 py-1 hover:bg-indigo-50 w-full text-left"
                              onClick={() => addToCartWithSize(sticker, s)}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* ================= CART PANEL ================= */}
      <AnimatePresence>
        {showCart && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCart(false)}
            />
            <div className="fixed bottom-6 right-6 bg-white rounded-xl p-6 z-50 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Your Cart</h3>

              {cart.length === 0 ? (
                <p className="text-sm text-gray-500">Cart is empty</p>
              ) : (
                <>
                  <ul className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.title}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => router.push("/checkout")}
                    className="mt-4 w-full bg-indigo-500 text-white py-2 rounded"
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
