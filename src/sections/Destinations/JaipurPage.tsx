"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Rajasthan" },
  { label: "Tour Packages", value: "6 Active Tours" },
  { label: "Starting Price", value: "₹22,500" },
  { label: "Famous For", value: "Pink City & Royal Forts" },
];

const whyVisit = [
  {
    title: "Majestic Palaces",
    desc: "Jaipur is home to some of India's most stunning royal residences, from the iconic Hawa Mahal to the sprawling City Palace complex.",
    icon: "palace",
  },
  {
    title: "Architectural Wonders",
    desc: "Witness the precision of the Jantar Mantar observatory and the imposing scale of Amer Fort, showcasing Rajputana brilliance.",
    icon: "magic",
  },
  {
    title: "Royal Hospitality",
    desc: "Experience the legendary 'Atithi Devo Bhava' in world-renowned heritage hotels and luxury palace stays.",
    icon: "sparkle",
  },
];

const attractions = [
  {
    name: "Amer Fort",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A stunning UNESCO World Heritage site known for its artistic Hindu style elements and breathtaking views of Maota Lake.",
  },
  {
    name: "Hawa Mahal",
    tag: "Landmark",
    image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The 'Palace of Winds' is a high screen wall built so women of the royal household could observe street festivals unseen from the outside.",
  },
  {
    name: "City Palace",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/35394354/pexels-photo-35394354.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A majestic complex of courtyards, gardens, and buildings, still serving as the residence of the royal family of Jaipur.",
  },
  {
    name: "Albert Hall Museum",
    tag: "Culture",
    image: "https://images.pexels.com/photos/31739860/pexels-photo-31739860.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The oldest museum of the state, functioning as the state museum of Rajasthan and showcasing Indo-Saracenic architecture.",
  },
  {
    name: "Gaitore Ki Chhatriyan",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/19905363/pexels-photo-19905363.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The royal crematorium grounds for the Kachwaha Rajput kings, featuring intricately carved marble cenotaphs.",
  },
  {
    name: "Jantar Mantar",
    tag: "Science",
    image: "https://images.pexels.com/photos/31971481/pexels-photo-31971481.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A UNESCO World Heritage site featuring the world's largest stone sundial, built by Maharaja Sawai Jai Singh II.",
  },
];

const seasons = [
  {
    name: "Winter",
    months: "October - March",
    temp: "8°C - 25°C",
    desc: "The best time to visit Jaipur. Weather is pleasant for sightseeing and outdoor activities. Nights can be quite chilly.",
    color: "#7b9eb8",
    recommended: true,
  },
  {
    name: "Summer",
    months: "April - June",
    temp: "25°C - 45°C",
    desc: "Summers are hot in Jaipur. Luxury resorts offer excellent indoor experiences and evening palace tours.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Monsoon",
    months: "July - September",
    temp: "24°C - 33°C",
    desc: "The city turns lush and many rooftop restaurants offer beautiful views of rain-washed forts.",
    color: "#8ba87e",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Royal Jaipur Luxury Weekend 3D/2N",
    price: "₹22,500",
    duration: "3 Days / 2 Nights",
    tag: "Luxury",
    image: "https://images.pexels.com/photos/35394354/pexels-photo-35394354.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Jaipur & Amer Heritage Trail",
    price: "₹28,200",
    duration: "4 Days / 3 Nights",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Pink City Photography Tour",
    price: "₹18,500",
    duration: "2 Days / 1 Night",
    tag: "Culture",
    image: "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function JaipurPage() {
  return (
    <PremiumCityDetailPage
      citySlug="jaipur"
      cityName="Jaipur"
      stateName="Rajasthan"
      tagline="Royal Fortresses & Majestic Heritage Palaces"
      heroImage="https://images.pexels.com/photos/35394354/pexels-photo-35394354.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
