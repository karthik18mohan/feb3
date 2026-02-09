import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteTitle } from "@/content/copy";
import { Barlow, Cormorant_Garamond } from "next/font/google";
import { FaqChatWidget } from "@/components/FaqChatWidget/FaqChatWidget";

const bodyFont = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteTitle
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-paper text-ink ${bodyFont.variable} ${headingFont.variable}`}>
        {children}
        <FaqChatWidget />
      </body>
    </html>
  );
}
