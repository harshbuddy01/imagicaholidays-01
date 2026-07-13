"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Goa" },
  { label: "Tour Packages", value: "3 Active Tours" },
  { label: "Starting Price", value: "₹18,500" },
  { label: "Famous For", value: "Beaches & Heritage Villas" },
];

const whyVisit = [
  {
    title: "Pristine Beaches",
    desc: "From the vibrant shores of Baga and Calangute to the serene sands of Palolem and Agonda, Goa offers a beach for every mood.",
    icon: "beach",
  },
  {
    title: "Portuguese Heritage",
    desc: "Explore the charming Latin Quarter of Fontainhas and the majestic churches of Old Goa, reflecting centuries of Portuguese influence.",
    icon: "palace",
  },
  {
    title: "Vibrant Nightlife",
    desc: "Experience world-class beach clubs, night markets, and sunset parties that make Goa the entertainment capital of India.",
    icon: "sparkle",
  },
];

const attractions = [
  {
    name: "Basilica of Bom Jesus",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/20717176/pexels-photo-20717176.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A UNESCO World Heritage site and a landmark in the history of Christianity, known for its baroque architecture.",
  },
  {
    name: "Palolem Beach",
    tag: "Nature",
    image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A beautiful crescent-shaped beach in South Goa known for its calm waters and palm-fringed shores.",
  },
  {
    name: "Dudhsagar Falls",
    tag: "Nature",
    image: "https://images.pexels.com/photos/29236033/pexels-photo-29236033.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of India's tallest waterfalls, located on the Mandovi River, looking like a 'sea of milk' as it cascades down.",
  },
  {
    name: "Aguada Fort",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A well-preserved 17th-century Portuguese fort and lighthouse overlooking the Arabian Sea.",
  },
  {
    name: "Fontainhas",
    tag: "Cultural",
    image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The vibrant Latin Quarter of Panjim, famous for its colorful narrow streets and colonial-style villas.",
  },
  {
    name: "Anjuna Flea Market",
    tag: "Shopping",
    image: "https://images.pexels.com/photos/11442148/pexels-photo-11442148.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A legendary Wednesday market offering everything from handicrafts to bohemian clothing and jewelry.",
  },
];

const seasons = [
  {
    name: "Winter",
    months: "November - February",
    temp: "20°C - 30°C",
    desc: "The peak tourist season. The weather is perfect for beach activities and water sports. All beach shacks and clubs are fully operational.",
    color: "#7b9eb8",
    recommended: true,
  },
  {
    name: "Summer",
    months: "March - May",
    temp: "25°C - 35°C",
    desc: "A great time for those seeking peace and luxury at discounted rates. The sea is calm, perfect for dolphin sighting tours.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Monsoon",
    months: "June - September",
    temp: "24°C - 30°C",
    desc: "Goa turns into a lush green paradise. Romantic and peaceful, perfect for nature lovers and experiencing the vibrant traditional festivals.",
    color: "#8ba87e",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Luxury North Goa Retreat 4D/3N",
    price: "₹18,500",
    duration: "4 Days / 3 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "South Goa Serenity & Wellness",
    price: "₹22,000",
    duration: "5 Days / 4 Nights",
    tag: "Wellness",
    image: "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Romantic Goa Honeymoon Special",
    price: "₹28,500",
    duration: "6 Days / 5 Nights",
    tag: "Couple Friendly",
    image: "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function GoaPage() {
  return (
    <PremiumCityDetailPage
      citySlug="goa"
      cityName="Goa"
      stateName="Goa"
      tagline="Sunkissed Beaches & Indo-Portuguese Heritage"
      heroImage="https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
