import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteTitle } from "@/content/copy";
import { Old_Standard_TT } from "next/font/google";

const bodyFont = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["700"],
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
      <body className={`min-h-screen bg-ivory text-ink ${bodyFont.variable} ${headingFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
