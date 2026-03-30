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
  title: {
    template: "%s | Imagica Holidays",
    default: "Imagica Holidays | Luxury Himalayan Tours & Retreats", // a default is required when creating a template
  },
  description: "Experience the ultimate luxury travel across the Himalayas. Book bespoke tours and holiday packages to Gangtok, Darjeeling, Sikkim, and more.",
  keywords: ["Luxury Tours", "Sikkim Holidays", "Gangtok Packages", "Darjeeling Tours", "Himalayan Retreats"],
  authors: [{ name: "Imagica Holidays", url: "https://imagicaholidays.com" }],
  creator: "Imagica Holidays",
  publisher: "Imagica Holidays",
  metadataBase: new URL("https://imagicaholidays.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://imagicaholidays.com",
    title: "Imagica Holidays | Luxury Himalayan Tours",
    description: "Curated itineraries and premium stays natively built to immerse you in the Himalayan beauty.",
    siteName: "Imagica Holidays",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imagica Holidays",
    description: "Bespoke tours and holiday packages across India's exotic destinations.",
  },
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
