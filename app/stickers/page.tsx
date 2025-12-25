"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // You'll need to install lucide-react: npm i lucide-react

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
    setMobileMenuOpen(false);
  };

  const categories = ["Movies", "Spiritual", "Sports", "Tech", "Cool", "Ethiopia"];

  const stickers: Sticker[] = [
    // Movies
// Movies
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

// Spiritual
{ id: 21, title: "jesus-is-king", category: "Spiritual", image: "/spiritual/spiritual1.jpg" },
{ id: 22, title: "cross", category: "Spiritual", image: "/spiritual/spiritual2.jpg" },
{ id: 23, title: "lamb-99", category: "Spiritual", image: "/spiritual/spiritual3.jpg" },
{ id: 24, title: "God-on-mountain-and-valley", category: "Spiritual", image: "/spiritual/spiritual4.jpg" },
{ id: 25, title: "am-with-u", category: "Spiritual", image: "/spiritual/spiritual5.jpg" },
{ id: 26, title: "God-is-good", category: "Spiritual", image: "/spiritual/spiritual6.jpg" },
{ id: 27, title: "light-of-the-world", category: "Spiritual", image: "/spiritual/spiritual7.jpg" },
{ id: 28, title: "with-God-Possible", category: "Spiritual", image: "/spiritual/spiritual8.jpg" },
{ id: 29, title: "Love-them", category: "Spiritual", image: "/spiritual/spiritual9.jpg" },
{ id: 30, title: "behold", category: "Spiritual", image: "/spiritual/spiritual10.jpg" },
{ id: 31, title: "faith", category: "Spiritual", image: "/spiritual/spiritual11.jpg" },
{ id: 32, title: "God-detail", category: "Spiritual", image: "/spiritual/spiritual12.jpg" },
{ id: 33, title: "philipiens", category: "Spiritual", image: "/spiritual/spiritual13.jpg" },
{ id: 34, title: "chorintians", category: "Spiritual", image: "/spiritual/spiritual14.jpg" },
{ id: 35, title: "all-things-new", category: "Spiritual", image: "/spiritual/spiritual15.jpg" },
{ id: 36, title: "cross-red", category: "Spiritual", image: "/spiritual/spiritual16.jpg" },
{ id: 37, title: "God-plan", category: "Spiritual", image: "/spiritual/spiritual17.jpg" },
{ id: 38, title: "jesus-heals", category: "Spiritual", image: "/spiritual/spiritual18.jpg" },
{ id: 39, title: "tetelestai", category: "Spiritual", image: "/spiritual/spiritual19.jpg" },
{ id: 40, title: "jesus cloth", category: "Spiritual", image: "/spiritual/spiritual20.jpg" },

// Sports
{ id: 41, title: "Football 1", category: "Sports", image: "/sport/sports1.jpg" },
{ id: 42, title: "Football 2", category: "Sports", image: "/sport/sports2.jpg" },
{ id: 43, title: "Basketball 1", category: "Sports", image: "/sport/sports3.jpg" },
{ id: 44, title: "Basketball 2", category: "Sports", image: "/sport/sports4.jpg" },
{ id: 45, title: "Tennis 1", category: "Sports", image: "/sport/sports5.jpg" },
{ id: 46, title: "Tennis 2", category: "Sports", image: "/sport/sports6.jpg" },
{ id: 47, title: "Soccer 1", category: "Sports", image: "/sport/sports7.jpg" },
{ id: 48, title: "Soccer 2", category: "Sports", image: "/sport/sports8.jpg" },
{ id: 49, title: "Tennis 3", category: "Sports", image: "/sport/sports9.jpg" },
{ id: 50, title: "Soccer 3", category: "Sports", image: "/sport/sports10.jpg" },
{ id: 51, title: "Soccer 4", category: "Sports", image: "/sport/sports11.jpg" },
{ id: 52, title: "Tennis 4", category: "Sports", image: "/sport/sports12.jpg" },
{ id: 53, title: "Soccer 5", category: "Sports", image: "/sport/sports13.jpg" },
{ id: 54, title: "Soccer 6", category: "Sports", image: "/sport/sports14.jpg" },
{ id: 55, title: "Tennis 5", category: "Sports", image: "/sport/sports15.jpg" },
{ id: 56, title: "Tennis 6", category: "Sports", image: "/sport/sports16.jpg" },

// Tech
{ id: 57, title: "Tech 1", category: "Tech", image: "/tech/tech1.jpg" },
{ id: 58, title: "Tech 2", category: "Tech", image: "/tech/tech2.jpg" },
{ id: 59, title: "Tech 3", category: "Tech", image: "/tech/tech3.jpg" },
{ id: 60, title: "Tech 4", category: "Tech", image: "/tech/tech4.jpg" },
{ id: 61, title: "Tech 5", category: "Tech", image: "/tech/tech5.jpg" },
{ id: 62, title: "Tech 6", category: "Tech", image: "/tech/tech6.jpg" },
{ id: 63, title: "Tech 7", category: "Tech", image: "/tech/tech7.jpg" },
{ id: 64, title: "Tech 8", category: "Tech", image: "/tech/tech8.jpg" },
{ id: 65, title: "Tech 9", category: "Tech", image: "/tech/tech9.jpg" },
{ id: 66, title: "Tech 10", category: "Tech", image: "/tech/tech10.jpg" },
{ id: 67, title: "Tech 11", category: "Tech", image: "/tech/tech11.jpg" },
{ id: 68, title: "Tech 12", category: "Tech", image: "/tech/tech12.jpg" },
{ id: 69, title: "Tech 13", category: "Tech", image: "/tech/tech13.jpg" },
{ id: 70, title: "Tech 14", category: "Tech", image: "/tech/tech14.jpg" },
{ id: 71, title: "Tech 15", category: "Tech", image: "/tech/tech15.jpg" },
{ id: 72, title: "Tech 16", category: "Tech", image: "/tech/tech16.jpg" },
{ id: 73, title: "Tech 17", category: "Tech", image: "/tech/tech17.jpg" },
{ id: 74, title: "Tech 18", category: "Tech", image: "/tech/tech18.jpg" },
{ id: 75, title: "Tech 19", category: "Tech", image: "/tech/tech19.jpg" },
{ id: 76, title: "Tech 20", category: "Tech", image: "/tech/tech20.jpg" },
{ id: 77, title: "Tech 21", category: "Tech", image: "/tech/tech21.jpg" },
{ id: 78, title: "Tech 22", category: "Tech", image: "/tech/tech22.jpg" },
{ id: 79, title: "Tech 23", category: "Tech", image: "/tech/tech23.jpg" },

// Ethiopia
{ id: 80, title: "gobez", category: "eth", image: "/eth/eth1.jpg" },
{ id: 81, title: "eth 2", category: "eth", image: "/eth/eth2.jpg" },
{ id: 82, title: "eth 3", category: "eth", image: "/eth/eth3.jpg" },
{ id: 83, title: "eth 4", category: "eth", image: "/eth/eth4.jpg" },
{ id: 84, title: "eth 5", category: "eth", image: "/eth/eth5.jpg" },
{ id: 85, title: "eth 6", category: "eth", image: "/eth/eth6.jpg" },
{ id: 86, title: "eth 7", category: "eth", image: "/eth/eth7.jpg" },
{ id: 87, title: "eth 8", category: "eth", image: "/eth/eth8.jpg" },
{ id: 88, title: "eth 9", category: "eth", image: "/eth/eth9.jpg" },
{ id: 89, title: "eth 10", category: "eth", image: "/eth/eth10.jpg" },
{ id: 90, title: "eth 11", category: "eth", image: "/eth/eth11.jpg" },
{ id: 91, title: "eth 12", category: "eth", image: "/eth/eth12.jpg" },
{ id: 92, title: "eth 13", category: "eth", image: "/eth/eth13.jpg" },
{ id: 93, title: "eth 14", category: "eth", image: "/eth/eth14.jpg" },
{ id: 94, title: "eth 15", category: "eth", image: "/eth/eth15.jpg" },
{ id: 95, title: "eth 16", category: "eth", image: "/eth/eth16.jpg" },
{ id: 96, title: "eth 17", category: "eth", image: "/eth/eth17.jpg" },
{ id: 97, title: "eth 18", category: "eth", image: "/eth/eth18.jpg" },
{ id: 98, title: "eth 19", category: "eth", image: "/eth/eth19.jpg" },
{ id: 99, title: "eth 20", category: "eth", image: "/eth/eth20.jpg" },
{ id: 100, title: "eth 21", category: "eth", image: "/eth/eth21.jpg" },

  ];

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
      [category]: prev[category] === 15 ? stickers.filter((s) => s.category === category).length : 15,
    }));
  };

  return (
    <main className="relative min-h-screen bg-transparent text-gray-800 scroll-smooth pt-20">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-lg backdrop-blur-xl"
            : "bg-white/70 backdrop-blur-2xl"
        } border-b border-white/50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/animal/favicon.ico"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                StickerBet
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
              <a href="/" className="hover:text-indigo-500 transition">Home</a>
              <a href="/#how" className="hover:text-indigo-500 transition">Order</a>
              <a href="/#pricing" className="hover:text-indigo-500 transition">Pricing</a>
              <a href="/#contact" className="hover:text-indigo-500 transition">Contact</a>
              <a href="/stickers" className="text-indigo-600 font-bold">Stickers</a>
            </div>

            {/* Right Side: Cart + Hamburger (Mobile) */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCart(true)}
                className="relative bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              >
                Cart ({cart.length})
              </motion.button>

              {/* Hamburger - Mobile Only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden pt-20 px-6"
              >
                <div className="flex flex-col gap-6 text-lg font-medium">
                  <a href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-500">Home</a>
                  <a href="/#how" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-500">Order</a>
                  <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-500">Pricing</a>
                  <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-500">Contact</a>
                  <button onClick={() => { scrollToSection("Movies"); }} className="text-left text-indigo-600">Stickers</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* STICKERS CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((cat) => {
          const catStickers = stickers.filter((s) => s.category === cat);
          if (catStickers.length === 0) return null;
          const visibleStickers = catStickers.slice(0, visibleCounts[cat] || 15);
          const hasMore = catStickers.length > 15;

          return (
            <section key={cat} id={cat} className="mb-16">
              <h2 className="text-3xl font-bold text-indigo-600 mb-8">{cat}</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"> 
                 {visibleStickers.map((sticker) => {
  const inCart = cart.some((s) => s.id === sticker.id);
  return (
    <div
      key={sticker.id}
      className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow"
    >
      <Image
        src={sticker.image}
        alt={sticker.title}
        fill
        className="object-contain p-6 transition-transform group-hover:scale-105"
      />

      {/* Add/Remove Button - Small and neat */}
      <button
        onClick={() => {
          if (inCart) {
            removeFromCart(sticker.id);
          } else {
            setShowSizeMenu(sticker.id);
          }
        }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg transition-all z-10 ${
          inCart
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        }`}
      >
        {inCart ? "×" : "+"}
      </button>
    </div>
  );
})}

{/* Size Menu Portal - Rendered once, outside the grid */}
<AnimatePresence>
  {showSizeMenu !== null && (
    <>
      {/* Backdrop to close menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
        onClick={() => setShowSizeMenu(null)}
      />

      {/* Find the selected sticker to position the menu near it */}
      {(() => {
        const selectedSticker = stickers.find((s) => s.id === showSizeMenu);
        if (!selectedSticker) return null;

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed bg-white rounded-xl shadow-2xl border border-gray-200 py-3 px-2 w-40 z-50"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            // Centered on mobile/small screens, adjust if you want near-button positioning
          >
            <button
              onClick={() => addToCartWithSize(selectedSticker, "Small (4cm)")}
              className="block w-full text-left px-4 py-2.5 hover:bg-indigo-50 text-sm font-medium rounded-lg transition"
            >
              Small(4cm)
            </button>
            <button
              onClick={() => addToCartWithSize(selectedSticker, "Medium (6cm)")}
              className="block w-full text-left px-4 py-2.5 hover:bg-indigo-50 text-sm font-medium rounded-lg transition"
            >
              Medium 
              (6cm)
            </button>
            <button
              onClick={() => addToCartWithSize(selectedSticker, "Large (9cm)")}
              className="block w-full text-left px-4 py-2.5 hover:bg-indigo-50 text-sm font-medium rounded-lg transition"
            >
              Large (9 cm)
            </button>
          </motion.div>
        );
      })()}
    </>
  )}
</AnimatePresence>
              </div>

              {hasMore && (
                <div className="mt-10 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleShowMore(cat)}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition"
                  >
                    {visibleCounts[cat] === 15 ? "see more  " : "watch less"}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto bg-white rounded-3xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-700">Your Cart</h3>
                <button onClick={() => setShowCart(false)} className="text-3xl text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-contain" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold capitalize">{item.title.replace(/-/g, " ")}</p>
                          <p className="text-sm text-gray-500">Size: {item.size || "Not selected"}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 font-medium hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setShowCart(false);
                      router.push("/checkout");
                    }}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-2xl shadow-lg transition"
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