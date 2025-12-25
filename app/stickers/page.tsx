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

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CART ================= */
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

  /* ================= DATA ================= */
  const categories = ["Movies", "Spiritual", "Sports", "Tech", "Cool"];

  const stickers: Sticker[] = [
    // MOVIES
    { id: 1, title: "spiderman", category: "Movies", image: "/Movies/movies1.jpg" },
    { id: 2, title: "simpsons", category: "Movies", image: "/Movies/movies2.jpg" },
    { id: 3, title: "friends-unagi", category: "Movies", image: "/Movies/movies3.jpg" },
    { id: 4, title: "thats-my-spot", category: "Movies", image: "/Movies/movies4.jpg" },
    { id: 5, title: "another-day-office", category: "Movies", image: "/Movies/movies5.jpg" },
    { id: 6, title: "best-boss", category: "Movies", image: "/Movies/movies6.jpg" },
    { id: 7, title: "big-bang", category: "Movies", image: "/Movies/movies7.jpg" },
    { id: 8, title: "mic-scott", category: "Movies", image: "/Movies/movies8.jpg" },
    { id: 9, title: "the-office", category: "Movies", image: "/Movies/movies9.jpg" },
    { id: 10, title: "dwight", category: "Movies", image: "/Movies/movies10.jpg" },
    { id: 11, title: "friends", category: "Movies", image: "/Movies/movies11.jpg" },
    { id: 12, title: "winter-coming", category: "Movies", image: "/Movies/movies12.jpg" },
    { id: 13, title: "tom", category: "Movies", image: "/Movies/movies13.jpg" },
    { id: 14, title: "arya-starks", category: "Movies", image: "/Movies/movies14.jpg" },
    { id: 15, title: "jon-snow", category: "Movies", image: "/Movies/movies15.jpg" },
    { id: 16, title: "jon-snow-back", category: "Movies", image: "/Movies/movies16.jpg" },
    { id: 17, title: "joy-clothes", category: "Movies", image: "/Movies/movies17.jpg" },
    { id: 18, title: "phoebe", category: "Movies", image: "/Movies/movies18.jpg" },
    { id: 19, title: "walter", category: "Movies", image: "/Movies/movies19.jpg" },
    { id: 20, title: "br-ba", category: "Movies", image: "/Movies/movies20.jpg" },

    // SPIRITUAL
    { id: 21, title: "jesus-is-king", category: "Spiritual", image: "/spiritual/spiritual1.jpg" },
    { id: 22, title: "cross", category: "Spiritual", image: "/spiritual/spiritual2.jpg" },
    { id: 23, title: "lamb-99", category: "Spiritual", image: "/spiritual/spiritual3.jpg" },
    { id: 24, title: "God-on-mountain-and-valley", category: "Spiritual", image: "/spiritual/spiritual4.jpg" },
    { id: 25, title: "Zen 1", category: "Spiritual", image: "/spiritual/spiritual5.jpg" },
    { id: 26, title: "Zen 2", category: "Spiritual", image: "/spiritual/spiritual6.jpg" },
    { id: 27, title: "Chakra 1", category: "Spiritual", image: "/spiritual/spiritual7.jpg" },
    { id: 28, title: "Chakra 2", category: "Spiritual", image: "/spiritual/spiritual8.jpg" },
    { id: 29, title: "Mandala 1", category: "Spiritual", image: "/spiritual/spiritual9.jpg" },
    { id: 30, title: "Mandala 2", category: "Spiritual", image: "/spiritual/spiritual10.jpg" },
    { id: 31, title: "Prayer Beads 1", category: "Spiritual", image: "/spiritual/spiritual11.jpg" },
    { id: 32, title: "Prayer Beads 2", category: "Spiritual", image: "/spiritual/spiritual12.jpg" },
    { id: 33, title: "Prayer Beads 3", category: "Spiritual", image: "/spiritual/spiritual13.jpg" },
    { id: 34, title: "Prayer Beads 4", category: "Spiritual", image: "/spiritual/spiritual14.jpg" },
    { id: 35, title: "Prayer Beads 5", category: "Spiritual", image: "/spiritual/spiritual15.jpg" },
    { id: 36, title: "Prayer Beads 6", category: "Spiritual", image: "/spiritual/spiritual16.jpg" },

    // SPORTS
    { id: 37, title: "Football 1", category: "Sports", image: "/sport/sports1.jpg" },
    { id: 38, title: "Football 2", category: "Sports", image: "/sport/sports2.jpg" },
    { id: 39, title: "Basketball 1", category: "Sports", image: "/sport/sports3.jpg" },
    { id: 40, title: "Basketball 2", category: "Sports", image: "/sport/sports4.jpg" },
    { id: 41, title: "Tennis 1", category: "Sports", image: "/sport/sports5.jpg" },
    { id: 42, title: "Tennis 2", category: "Sports", image: "/sport/sports6.jpg" },
    { id: 43, title: "Soccer 1", category: "Sports", image: "/sport/sports7.jpg" },
    { id: 44, title: "Soccer 2", category: "Sports", image: "/sport/sports8.jpg" },
    { id: 45, title: "Soccer 3", category: "Sports", image: "/sport/sports9.jpg" },
    { id: 46, title: "Soccer 4", category: "Sports", image: "/sport/sports10.jpg" },
    { id: 47, title: "Soccer 5", category: "Sports", image: "/sport/sports11.jpg" },
    { id: 48, title: "Tennis 3", category: "Sports", image: "/sport/sports12.jpg" },
    { id: 49, title: "Soccer 6", category: "Sports", image: "/sport/sports13.jpg" },
    { id: 50, title: "Soccer 7", category: "Sports", image: "/sport/sports14.jpg" },
    { id: 51, title: "Tennis 4", category: "Sports", image: "/sport/sports15.jpg" },
    { id: 52, title: "Tennis 5", category: "Sports", image: "/sport/sports16.jpg" },

    // TECH
    { id: 53, title: "Tech 1", category: "Tech", image: "/tech/tech1.jpg" },
    { id: 54, title: "Tech 2", category: "Tech", image: "/tech/tech2.jpg" },
    { id: 55, title: "Tech 3", category: "Tech", image: "/tech/tech3.jpg" },
    { id: 56, title: "Tech 4", category: "Tech", image: "/tech/tech4.jpg" },
    { id: 57, title: "Tech 5", category: "Tech", image: "/tech/tech5.jpg" },
    { id: 58, title: "Tech 6", category: "Tech", image: "/tech/tech6.jpg" },
    { id: 59, title: "Tech 7", category: "Tech", image: "/tech/tech7.jpg" },
    { id: 60, title: "Tech 8", category: "Tech", image: "/tech/tech8.jpg" },
    { id: 61, title: "Tech 9", category: "Tech", image: "/tech/tech9.jpg" },
    { id: 62, title: "Tech 10", category: "Tech", image: "/tech/tech10.jpg" },
    { id: 63, title: "Tech 11", category: "Tech", image: "/tech/tech11.jpg" },
    { id: 64, title: "Tech 12", category: "Tech", image: "/tech/tech12.jpg" },
    { id: 65, title: "Tech 13", category: "Tech", image: "/tech/tech13.jpg" },
    { id: 66, title: "Tech 14", category: "Tech", image: "/tech/tech14.jpg" },
    { id: 67, title: "Tech 15", category: "Tech", image: "/tech/tech15.jpg" },
    { id: 68, title: "Tech 16", category: "Tech", image: "/tech/tech16.jpg" },
    { id: 69, title: "Tech 17", category: "Tech", image: "/tech/tech17.jpg" },
  ];

  /* ================= INIT ================= */
  useEffect(() => {
    const initial: Record<string, number> = {};
    categories.forEach((cat) => {
      initial[cat] = Math.min(
        15,
        stickers.filter((s) => s.category === cat).length
      );
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

  /* ================= UI ================= */
  return (
    <main className="relative min-h-screen pt-24 bg-transparent">
      {/* ================= NAVBAR ================= */}
      <motion.nav
        className={`fixed top-0 w-full z-50 ${
          scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg" : "bg-white/50 backdrop-blur-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/animal/favicon.ico" alt="Logo" width={36} height={36} />
            <h1 className="font-extrabold text-xl text-indigo-600">StickerBet</h1>
          </div>

          <div className="hidden md:flex gap-8 font-semibold text-sm">
            <a href="/">Home</a>
            <a href="/#how">Order</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#contact">Contact</a>
            <a href="/stickers" className="text-indigo-600">Stickers</a>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="hidden md:block bg-indigo-500 text-white px-5 py-2 rounded-full"
          >
            Cart ({cart.length})
          </button>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative bg-indigo-500 text-white p-2 rounded-full">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen((p) => !p)} className="p-2 border rounded">
              ☰
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= STICKERS GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {categories.map((cat) => {
          const catStickers = stickers.filter((s) => s.category === cat);
          if (!catStickers.length) return null;

          return (
            <section key={cat} className="mb-12">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-6">{cat}</h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {catStickers.slice(0, visibleCounts[cat]).map((sticker) => {
                  const inCart = cart.some((s) => s.id === sticker.id);
                  return (
                    <div key={sticker.id} className="relative h-28">
                      <Image src={sticker.image} alt={sticker.title} fill className="object-contain" />
                      <button
                        onClick={() =>
                          inCart ? removeFromCart(sticker.id) : setShowSizeMenu(sticker.id)
                        }
                        className={`absolute top-1 right-1 w-7 h-7 rounded-full text-white ${
                          inCart ? "bg-red-500" : "bg-indigo-500"
                        }`}
                      >
                        {inCart ? "×" : "+"}
                      </button>

                      {showSizeMenu === sticker.id && (
                        <div className="absolute top-8 right-1 bg-white shadow-lg rounded p-2 text-sm z-20">
                          {["Small", "Medium", "Large"].map((s) => (
                            <button
                              key={s}
                              className="block w-full text-left px-2 py-1 hover:bg-indigo-50"
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

              {catStickers.length > 15 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => toggleShowMore(cat)}
                    className="px-6 py-2 bg-indigo-500 text-white rounded-full"
                  >
                    {visibleCounts[cat] === 15 ? "See More" : "Show Less"}
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
