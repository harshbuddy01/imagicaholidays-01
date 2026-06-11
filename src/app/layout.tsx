import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script, Playfair_Display, Rye, Sancreek, Cinzel_Decorative, UnifrakturMaguntia, DM_Serif_Display } from "next/font/google";
import type { ReactNode } from "react";
import Script from "next/script";
import ContactMenu from "@/components/ContactMenu";
import Preloader from "@/components/Preloader";
import TrendingPopup from "@/components/ui/TrendingPopup";
import ScrollProgress from "@/components/ui/ScrollProgress";
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

const oldEnglishFont = UnifrakturMaguntia({
  variable: "--font-old-english",
  subsets: ["latin"],
  weight: ["400"]
});

const runtimeFont = DM_Serif_Display({
  variable: "--font-runtime",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: {
    template: "%s | Imagica Holidays",
    default: "Imagica Holidays | Luxury India Tour Packages",
  },
  description: "Handcrafted luxury India tours & custom holiday packages. Book premium retreat itineraries for Sikkim, Darjeeling, Kashmir, Kerala, & Rajasthan.",
  keywords: [
    "Luxury Tour Packages India",
    "Customized Holiday Packages",
    "Sikkim Gangtok Tour Packages",
    "Darjeeling Luxury Holidays",
    "Kashmir Holiday Packages",
    "Manali Tour Packages",
    "Kerala Backwater Houseboats",
    "Ooty Luxury Resorts",
    "Jaipur Udaipur Rajasthan Tours",
    "Kanyakumari Sightseeing Tours",
    "Bespoke India Tour Operator",
    "Imagica Holidays"
  ],
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
    title: "Imagica Holidays | Luxury India Tour Packages",
    description: "Handcrafted luxury India tours & custom holiday packages. Book premium retreat itineraries for Sikkim, Darjeeling, Kashmir, Kerala, & Rajasthan.",
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
    title: "Imagica Holidays | Luxury India Tour Packages",
    description: "Handcrafted luxury India tours & custom holiday packages.",
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
      <body className={`${headingFont.variable} ${bodyFont.variable} ${scriptFont.variable} ${romanFont.variable} ${ornateFont.variable} ${westEndFont.variable} ${glypticFont.variable} ${oldEnglishFont.variable} ${runtimeFont.variable} antialiased`}>
        <ScrollProgress />
        <Preloader />
        <TrendingPopup />
        {children}

        {/* Floating Action Menu */}
        <ContactMenu />

        {/* TravelAgency Structured Data (JSON-LD) for GEO/AI Indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Imagica Holidays",
              "url": "https://imagicaholidays.com",
              "logo": "https://imagicaholidays.com/icon.svg",
              "image": "https://images.unsplash.com/photo-1518640467707-6811f4a4ab75?q=80&w=1600&auto=format&fit=crop",
              "description": "Bespoke tour packages, custom travel plans, and boutique luxury hotel bookings across Sikkim, Gangtok, Lachung, Darjeeling, Kerala, Ooty, and Shimla.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "Sikkim" },
                { "@type": "AdministrativeArea", "name": "Gangtok" },
                { "@type": "AdministrativeArea", "name": "Lachung" },
                { "@type": "AdministrativeArea", "name": "Darjeeling" },
                { "@type": "AdministrativeArea", "name": "Kerala" },
                { "@type": "AdministrativeArea", "name": "Ooty" },
                { "@type": "AdministrativeArea", "name": "Shimla" }
              ],
              "priceRange": "$$$",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61590360517029",
                "https://www.instagram.com/imagica_holidays/"
              ]
            })
          }}
        />
        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

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
