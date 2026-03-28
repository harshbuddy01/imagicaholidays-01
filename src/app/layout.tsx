import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const scriptFont = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"]
});

const romanFont = Playfair_Display({
  variable: "--font-roman",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "imagicaholidays Inspired Stay Experience",
  description: "A modern resort website inspired by imagicaholidays.",
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} ${scriptFont.variable} ${romanFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
