import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "WeSticker",
  description: "Your favorite custom sticker shop!",
  icons: {
    icon: "/dog.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-green-50 text-gray-800">
        {/* 🧩 Page Content */}
        <main>{children}</main>

        {/* 📜 Footer */}
        <footer className="bg-green-700 text-white text-center py-6 mt-16">
          <p>© {new Date().getFullYear()} WeSticker. All rights reserved.</p>
          <p className="text-sm opacity-80">Crafted with ❤️ using Next.js</p>
        </footer>
      </body>
    </html>
  );
}
