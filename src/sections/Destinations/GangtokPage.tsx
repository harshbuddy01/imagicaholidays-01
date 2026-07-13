"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Sikkim" },
  { label: "Tour Packages", value: "8 Active Tours" },
  { label: "Starting Price", value: "₹10,475" },
  { label: "Famous For", value: "Heart of Sikkim" },
];

const whyVisit = [
  {
    title: "Spectacular Kanchenjunga Views",
    desc: "Gangtok offers breathtaking views of Mount Kanchenjunga, the third-highest mountain in the world. Sunrise views from Tashi View Point and Hanuman Tok are unforgettable.",
    icon: "mountain",
  },
  {
    title: "MG Marg – Clean & Vibrant City Life",
    desc: "MG Marg is the heart of Gangtok, famous for cafes, restaurants, local shopping, nightlife and street culture. It is one of the cleanest pedestrian zones in India.",
    icon: "sparkle",
  },
  {
    title: "Ideal for Honeymoon & Family Tours",
    desc: "Peaceful environment, luxury hotels, scenic viewpoints, and comfortable road connectivity make Gangtok ideal for honeymoon packages, family holidays, group tours, and corporate trips.",
    icon: "magic",
  },
];

const attractions = [
  {
    name: "Enchey Monastery",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the oldest Buddhist monasteries, perched on a tranquil pine-covered hill about 3 km from central Gangtok.",
  },
  {
    name: "Ganesh Tok",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A sacred temple dedicated to Lord Ganesha at 6,500 ft offering panoramic views of the Kanchenjunga range.",
  },
  {
    name: "Plant Conservatory",
    tag: "Nature",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A beautiful greenhouse garden showcasing rare Himalayan plants, orchids, and seasonal flowers.",
  },
  {
    name: "Gonjang Monastery",
    tag: "Religious",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A peaceful Buddhist monastery near Tashi View Point with beautiful views of surrounding hills and valleys.",
  },
  {
    name: "Bakthang Waterfall",
    tag: "Nature",
    image: "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A stunning waterfall about 4 km from Gangtok on the way to Tsomgo Lake, surrounded by lush green hills.",
  },
  {
    name: "Banjhakri Falls",
    tag: "Nature",
    image: "https://images.pexels.com/photos/30778897/pexels-photo-30778897.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A popular tourist waterfall set in a forested area with a rich connection to Sikkimese folklore and Shamanic traditions.",
  },
];

const seasons = [
  {
    name: "Spring",
    months: "March – May",
    temp: "10°C – 22°C",
    desc: "Spring is the best time to visit Gangtok. Pleasant weather, clear skies, and blooming rhododendrons across the hills. Perfect for sightseeing, honeymoon trips, and photography.",
    color: "#8ba87e",
    recommended: true,
  },
  {
    name: "Summer",
    months: "June – August",
    temp: "15°C – 25°C",
    desc: "Mild rainfall and lush green landscapes. Less crowded and suitable for travelers seeking peaceful holidays. Occasional landslides may affect travel.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Autumn",
    months: "September – November",
    temp: "10°C – 20°C",
    desc: "Monsoon clears the dust, offering crystal-clear views of the Himalayas. Cool and comfortable weather, great for sightseeing and adventure activities.",
    color: "#c47d3e",
    recommended: false,
  },
  {
    name: "Winter",
    months: "December – February",
    temp: "4°C – 15°C",
    desc: "Cold but beautiful. Nearby Tsomgo Lake and Nathula Pass often experience snow. Clear winter sky offers stunning mountain views.",
    color: "#7b9eb8",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Gangtok Lachen Lachung 6N/7D",
    price: "₹18,800",
    duration: "7 Days / 6 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Lachen Lachung with Gurudongmar",
    price: "₹11,400",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok & Lachung Yumthang Valley",
    price: "₹9,000",
    duration: "5 Days / 4 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Nathula Pass Group Tour",
    price: "₹1,200",
    duration: "1 Day",
    tag: "Group Tour",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 5N/6D",
    price: "₹11,800",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Pelling Darjeeling 5N/6D",
    price: "₹12,500",
    duration: "6 Days / 5 Nights",
    tag: "Popular",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 4N/5D",
    price: "₹10,200",
    duration: "5 Days / 4 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok 3N/4D Tour Package",
    price: "₹8,900",
    duration: "4 Days / 3 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function GangtokPage() {
  return (
    <PremiumCityDetailPage
      citySlug="gangtok"
      cityName="Gangtok"
      stateName="Sikkim"
      tagline="Where Tradition Meets Tranquility"
      heroImage="https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
