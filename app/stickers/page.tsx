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
    const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 30);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("stickersCart");
        if (saved) setCart(JSON.parse(saved));
      }
    }, []);

    const updateCartState = (updater: (prev: Sticker[]) => Sticker[]) => {
      setCart((prev) => {
        const next = updater(prev);
        if (typeof window !== "undefined") {
          localStorage.setItem("stickersCart", JSON.stringify(next));
        }
        return next;
      });
    };

    const addToCartWithSize = (sticker: Sticker, size: string) => {
      updateCartState((prev) => {
        if (prev.some((s) => s.id === sticker.id)) {
          return prev.map((s) => (s.id === sticker.id ? { ...s, size } : s));
        }
        return [...prev, { ...sticker, size }];
      });
      setShowSizeMenu(null);
    };

    const removeFromCart = (id: number) => {
      updateCartState((prev) => prev.filter((s) => s.id !== id));
    };

    const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const categories = ["Movies", "Spiritual", "Sports", "Tech", "Cool"];

    const stickers: Sticker[] = [
      { id: 1, title: "spiderman", category: "Movies", image: "/Movies/movies1.jpg" },
      { id: 2, title: "simpsons", category: "Movies", image: "/Movies/movies2.jpg" },
      { id: 3, title: "friends-unagi", category: "Movies", image: "/Movies/movies3.jpg" },
      { id: 4, title: "thats-my-spot", category: "Movies", image: "/Movies/movies4.jpg" },
      { id: 5, title: "another-day-office", category: "Movies", image: "/Movies/movies5.jpg" },
      { id: 6, title: "best-boss", category: "Movies", image: "/Movies/movies6.jpg" },
      { id: 7, title: "big-bang", category: "Movies", image: "/Movies/movies7.jpg" },
      { id: 8, title: "mic-scott", category: "Movies", image: "/Movies/movies8.jpg" },
      { id: 9, title: "the-offce", category: "Movies", image: "/Movies/movies9.jpg" },
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
      { id: 33, title: "Prayer Beads 2", category: "Spiritual", image: "/spiritual/spiritual13.jpg" },
      { id: 34, title: "Prayer Beads 2", category: "Spiritual", image: "/spiritual/spiritual14.jpg" },
      { id: 35, title: "Prayer Beads 2", category: "Spiritual", image: "/spiritual/spiritual15.jpg" },
      { id: 36, title: "Prayer Beads 2", category: "Spiritual", image: "/spiritual/spiritual16.jpg" },





      { id: 33, title: "Football 1", category: "Sports", image: "/sport/sports1.jpg" },
      { id: 34, title: "Football 2", category: "Sports", image: "/sport/sports2.jpg" },
      { id: 35, title: "Basketball 1", category: "Sports", image: "/sport/sports3.jpg" },
      { id: 36, title: "Basketball 2", category: "Sports", image: "/sport/sports4.jpg" },
      { id: 37, title: "Tennis 1", category: "Sports", image: "/sport/sports5.jpg" },
      { id: 38, title: "Tennis 2", category: "Sports", image: "/sport/sports6.jpg" },
      { id: 39, title: "Soccer 1", category: "Sports", image: "/sport/sports7.jpg" },
      { id: 40, title: "Soccer 2", category: "Sports", image: "/sport/sports8.jpg" },
      { id: 41, title: "Tennis 2", category: "Sports", image: "/sport/sports9.jpg" },
      { id: 42, title: "Soccer 1", category: "Sports", image: "/sport/sports10.jpg" },
      { id: 43, title: "Soccer 2", category: "Sports", image: "/sport/sports11.jpg" }, 
      { id: 44, title: "Tennis 2", category: "Sports", image: "/sport/sports12.jpg" },
      { id: 45, title: "Soccer 1", category: "Sports", image: "/sport/sports13.jpg" },
      { id: 46, title: "Soccer 2", category: "Sports", image: "/sport/sports14.jpg" },
      { id: 47, title: "Tennis 2", category: "Sports", image: "/sport/sports15.jpg" },
      { id: 47, title: "Tennis 2", category: "Sports", image: "/sport/sports16.jpg" },


      { id: 45, title: "Tech 1", category: "Tech", image: "/tech/tech1.jpg" },
      { id: 46, title: "Tech 2", category: "Tech", image: "/tech/tech2.jpg" },
      { id: 47, title: "Tech 3", category: "Tech", image: "/tech/tech3.jpg" },
      { id: 48, title: "Tech 4", category: "Tech", image: "/tech/tech4.jpg" },
      { id: 49, title: "Tech 5", category: "Tech", image: "/tech/tech5.jpg" },
      { id: 50, title: "Tech 6", category: "Tech", image: "/tech/tech6.jpg" },
      { id: 51, title: "Tech 7", category: "Tech", image: "/tech/tech7.jpg" },
      { id: 52, title: "Tech 3", category: "Tech", image: "/tech/tech8.jpg" },
      { id: 53, title: "Tech 4", category: "Tech", image: "/tech/tech9.jpg" },
      { id: 54, title: "Tech 5", category: "Tech", image: "/tech/tech10.jpg" },
      { id: 55, title: "Tech 6", category: "Tech", image: "/tech/tech11.jpg" },
      { id: 56, title: "Tech 7", category: "Tech", image: "/tech/tech12.jpg" },
      { id: 47, title: "Tech 3", category: "Tech", image: "/tech/tech13.jpg" },
      { id: 48, title: "Tech 4", category: "Tech", image: "/tech/tech14.jpg" },
      { id: 49, title: "Tech 5", category: "Tech", image: "/tech/tech15.jpg" },
      { id: 50, title: "Tech 6", category: "Tech", image: "/tech/tech16.jpg" },
      { id: 51, title: "Tech 7", category: "Tech", image: "/tech/tech17.jpg" },

    ];

    // Initialize visible counts on mount
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

    return (
      <main className="relative min-h-screen bg-transparent text-gray-800 scroll-smooth pt-24">
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
                StickerBet
              </h1>
            </div>
            <div className="flex gap-8 text-sm font-semibold text-gray-700">
              <a href="/" className="hover:text-indigo-500">Home</a>
              <a href="/#how" className="hover:text-indigo-500">Order</a>
              <a href="/#pricing" className="hover:text-indigo-500">Pricing</a>
              <a href="/#contact" className="hover:text-indigo-500">Contact</a>
              <a href="/stickers" className="text-indigo-600">Stickers</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCart(true)}
              className="ml-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-indigo-200"
            >
              Cart ({cart.length})
            </motion.button>
          </div>
        </motion.nav>

        {/* STICKERS */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {categories.map((cat) => {
            const catStickers = stickers.filter((s) => s.category === cat);
            if (catStickers.length === 0) return null;

            const visibleStickers = catStickers.slice(0, visibleCounts[cat] || 15);
            const hasMore = catStickers.length > 15;

            return (
              <section key={cat} id={cat} className="mb-12">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-6">{cat}</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {visibleStickers.map((sticker) => {
                    const inCart = cart.some((s) => s.id === sticker.id);
                    return (
                      <div key={sticker.id} className="relative w-full h-28">
                        <Image
                          src={sticker.image}
                          alt={sticker.title}
                          fill
                          className="object-contain"
                        />
                        <button
                          onClick={() => {
                            if (inCart) removeFromCart(sticker.id);
                            else setShowSizeMenu(sticker.id);
                          }}
                          className={`absolute top-1 right-1 w-7 h-7 text-sm rounded-full flex items-center justify-center shadow ${
                            inCart ? "bg-red-500 text-white" : "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                          }`}
                        >
                          {inCart ? "×" : "+"}
                        </button>

                        {/* Size Menu */}
                        <AnimatePresence>
                          {showSizeMenu === sticker.id && !inCart && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.12 }}
                              className="absolute right-1 top-8 bg-white shadow-xl p-2 rounded-xl border text-sm z-20 w-36"
                            >
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-indigo-50 rounded"
                                onClick={() => addToCartWithSize(sticker, "Small (5cm)")}
                              >
                                Small (4 cm)
                              </button>
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-indigo-50 rounded"
                                onClick={() => addToCartWithSize(sticker, "Medium (8cm)")}
                              >
                                Medium (6 cm)
                              </button>
                              <button
                                className="block w-full text-left px-2 py-1 hover:bg-indigo-50 rounded"
                                onClick={() => addToCartWithSize(sticker, "Large (12cm)")}
                              >
                                Large (9 cm)
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* See More / Show Less Button */}
                {hasMore && (
                  <div className="mt-6 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleShowMore(cat)}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
                    >
                      {visibleCounts[cat] === 15 ? "See More" : "Show Less"}
                    </motion.button>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* CART PANEL */}
        <AnimatePresence>
          {showCart && (
            <>
              <motion.div
                key="cart-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/70 z-50 backdrop-blur-sm"
                onClick={() => setShowCart(false)}
              />
              <motion.div
                key="cart-panel"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="fixed bottom-6 right-6 w-full max-w-md rounded-3xl border border-white/60 bg-white/95 shadow-[0_25px_80px_rgba(15,118,110,0.25)] p-6 z-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-indigo-700">Your Cart</h3>
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowCart(false)}>
                    ×
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-sm">No stickers in your cart yet.</p>
                ) : (
                  <>
                    <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <li key={item.id} className="flex items-center gap-4 border-b pb-3">
                          <div className="relative w-14 h-14 flex-shrink-0">
                            <Image src={item.image} alt={item.title} fill className="object-contain rounded-lg bg-gray-50" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-gray-500">Size: {item.size || "Not selected"}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 hover:text-red-600 font-semibold"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold shadow-sm transition"
                      onClick={() => {
                        setShowCart(false);
                        router.push("/checkout");
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    );
  }