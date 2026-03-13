import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StickyContact from "@/components/StickyContact";

export const metadata: Metadata = {
  title: "Business Warehouse Storage in UAE | Cargoz",
  description:
    "Find verified warehouse storage across Dubai, Abu Dhabi and Sharjah. General cargo, food grade, DG class, pharmaceutical and cold storage. No brokers. Connect within 24 hours.",
  openGraph: {
    title: "Business Warehouse Storage in UAE | Cargoz",
    description:
      "Find verified warehouse storage across Dubai, Abu Dhabi and Sharjah. Any type. Any size. No brokers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <StickyContact />
      </body>
    </html>
  );
}
