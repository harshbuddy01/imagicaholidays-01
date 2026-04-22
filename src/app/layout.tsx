import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script, Playfair_Display, Rye, Sancreek, Cinzel_Decorative } from "next/font/google";
import type { ReactNode } from "react";
import Script from "next/script";
import ContactMenu from "@/components/ContactMenu";
import Preloader from "@/components/Preloader";
import PageTransitionPreloader from "@/components/PageTransitionPreloader";
import TrendingPopup from "@/components/ui/TrendingPopup";
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

const ornateFont = Rye({
  variable: "--font-ornate",
  subsets: ["latin"],
  weight: ["400"]
});

const westEndFont = Sancreek({
  variable: "--font-westend",
  subsets: ["latin"],
  weight: ["400"]
});

const glypticFont = Cinzel_Decorative({
  variable: "--font-glyptic",
  subsets: ["latin"],
  weight: ["400", "700", "900"]
});

export const metadata: Metadata = {
  title: {
    template: "%s | Imagica Holidays",
    default: "Imagica Holidays | Luxury Himalayan Tours & Retreats", // a default is required when creating a template
  },
  description: "Experience the ultimate luxury travel across the Himalayas. Book bespoke tours and holiday packages to Gangtok, Darjeeling, Sikkim, and more.",
  keywords: ["Luxury Tours", "Sikkim Holidays", "Gangtok Packages", "Darjeeling Tours", "Himalayan Retreats"],
  authors: [{ name: "IMAGICA HOLIDAYS", url: "https://imagicaholidays.com" }],
  creator: "Imagica Holidays",
  publisher: "Imagica Holidays",
  metadataBase: new URL("https://imagicaholidays.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {

    type: "website",
    locale: "en_IN",
    url: "https://imagicaholidays.com",
    title: "Imagica Holidays | Luxury Himalayan Tours",
    description: "Curated itineraries and premium stays natively built to immerse you in the Himalayan beauty.",
    siteName: "Imagica Holidays",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Imagica Holidays - Handcrafted Journeys",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Imagica Holidays",
    description: "Bespoke tours and holiday packages across India's exotic destinations.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} ${scriptFont.variable} ${romanFont.variable} ${ornateFont.variable} ${westEndFont.variable} ${glypticFont.variable} antialiased`}>
        <Preloader />
        <PageTransitionPreloader />
        <TrendingPopup />
        {children}

        {/* Floating Action Menu */}
        <ContactMenu />

        {/* Chatwoot Live Chat SDK */}
        <Script id="chatwoot-js" strategy="lazyOnload">
          {`
            window.chatwootSettings = {
              hideMessageBubble: true,
              position: 'right',
              type: 'standard'
            };
            (function(d,t) {
              var BASE_URL="https://chatwoot-production-f07b.up.railway.app";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: 'fFwt7tfxHwkjkbB4oqAVJPHm',
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
          `}
        </Script>
      </body>
    </html >
  );
}
