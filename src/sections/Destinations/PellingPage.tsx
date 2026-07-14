"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Sikkim" },
  { label: "Tour Packages", value: "3 Active Tours" },
  { label: "Starting Price", value: "₹12,633" },
  { label: "Famous For", value: "The “Gateway to Kanchenjunga”" },
];

const whyVisit = [
  {
    title: "Spectacular Kanchenjunga Views",
    desc: "Pelling offers breathtaking sunrise and panoramic views of Mount Kanchenjunga, the third-highest mountain in the world. It is one of the best places in Sikkim for mountain photography.",
    icon: "mountain",
  },
  {
    title: "India’s First Glass Sky Walk",
    desc: "Experience the thrilling Pelling Sky Walk near the Chenrezig Statue. Walk on glass with stunning valley views below.",
    icon: "sparkle",
  },
  {
    title: "Beautiful Waterfalls",
    desc: "Pelling is famous for Kanchenjunga Waterfalls, Rimbi Waterfall, and Sewaro Rock Garden, perfect for nature lovers.",
    icon: "flower",
  },
];

const attractions = [
  {
    name: "Khecheopalri Lake",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the most sacred lakes in Sikkim, revered by both Buddhists and Hindus. Known as the “Wish-Fulfilling Lake.”",
  },
  {
    name: "Pemayangtse Monastery",
    tag: "Nature",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the oldest monasteries belonging to Nyingma sect. Offers panoramic views and houses a famous seven-tiered wooden structure.",
  },
  {
    name: "Pelling Skywalk",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "India’s first glass skywalk offering thrilling views of valleys and mountains located near the Chenrezig statue.",
  },
  {
    name: "Singshore Bridge",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The highest suspension bridge in Sikkim, offering spectacular views of deep valleys and lush hills.",
  },
  {
    name: "Rabdentse Ruins",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Historical ruins of the former capital of the Kingdom of Sikkim featuring panoramic views and peaceful walking trails.",
  },
  {
    name: "Kanchenjunga Waterfalls",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=800",
    short: "A beautiful and powerful waterfall cascading from a great height, surrounded by lush green forests.",
  },
];

const seasons = [
  {
    name: "Spring",
    months: "March - May",
    temp: "7°C - 20°C",
    desc: "Spring is considered the best season to visit Pelling. The weather remains comfortable, and the skies are mostly clear, offering spectacular views of Mount Kanchenjunga.",
    color: "#8ba87e",
    recommended: true,
  },
  {
    name: "Summer",
    months: "June - July",
    temp: "10°C - 22°C",
    desc: "Early summer is still good for travel, but late June onwards monsoon starts. The landscape becomes lush green, but mountain views may be partially blocked by clouds.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Autumn",
    months: "October - November",
    temp: "5°C - 18°C",
    desc: "Autumn is another best time to visit Pelling. The weather is fresh, and the views of Kanchenjunga are crystal clear. It is perfect for trekking, sightseeing, and adventure.",
    color: "#c47d3e",
    recommended: true,
  },
  {
    name: "Winter",
    months: "December - February",
    temp: "2°C - 12°C",
    desc: "Winter in Pelling is cold but peaceful. On rare occasions, nearby areas may receive light snowfall. It is ideal for travelers who enjoy chilly weather.",
    color: "#7b9eb8",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Gangtok Pelling Darjeeling 6 Days 5 Nights Tour Package",
    price: "₹12,500",
    duration: "6 Days/ 5 Night",
    tag: "Family-Friendly",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Pelling Darjeeling Tour Package – 7 Nights 8 Days",
    price: "₹16,200",
    duration: "8 Days/ 7 Nights",
    tag: "Family-Friendly",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Pelling & Darjeeling 5 Days 4 Nights Tour Package",
    price: "₹9,200",
    duration: "5 Days/ 4 Night",
    tag: "Family-Friendly",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function PellingPage() {
  return (
    <PremiumCityDetailPage
      citySlug="pelling"
      cityName="Pelling"
      stateName="Sikkim"
      tagline="Gateway to Majestic Kanchenjunga Vistas"
      heroImage="https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
