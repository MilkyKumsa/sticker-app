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
        <footer className="bg-green-700 text-white text-center py-6">
          <p>© {new Date().getFullYear()} Stickify. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
