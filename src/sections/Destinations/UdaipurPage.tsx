"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Rajasthan" },
  { label: "Tour Packages", value: "4 Active Tours" },
  { label: "Starting Price", value: "₹24,800" },
  { label: "Famous For", value: "Lakes & Romantic Palaces" },
];

const whyVisit = [
  {
    title: "City of Lakes",
    desc: "Experience the magic of Udaipur's interconnected lake system, featuring the iconic Lake Pichola and the serene Fateh Sagar Lake.",
    icon: "boat",
  },
  {
    title: "Venice of the East",
    desc: "Renowned as one of the most romantic cities in India, Udaipur offers stunning lakeside dining and breathtaking sunset boat rides.",
    icon: "sparkle",
  },
  {
    title: "Mewar Heritage",
    desc: "Explore the legacy of the Mewar dynasty through the lens of its magnificent City Palace and the historic Jag Mandir island palace.",
    icon: "palace",
  },
];

const attractions = [
  {
    name: "City Palace",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A magnificent complex of palaces on the eastern bank of Lake Pichola, built over a period of nearly 400 years.",
  },
  {
    name: "Jag Mandir",
    tag: "Island",
    image: "https://images.pexels.com/photos/29801416/pexels-photo-29801416.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "An island palace in Lake Pichola, also known as the 'Lake Garden Palace', offering stunning views and royal history.",
  },
  {
    name: "Lake Pichola",
    tag: "Nature",
    image: "https://images.pexels.com/photos/29824645/pexels-photo-29824645.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the oldest and largest lakes of Udaipur, world-famous for its scenic beauty and the palaces situated within it.",
  },
  {
    name: "Saheliyon-ki-Bari",
    tag: "Garden",
    image: "https://images.pexels.com/photos/29824651/pexels-photo-29824651.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A major garden and a popular tourist space in Udaipur, famous for its fountains, marble elephants, and lotus pools.",
  },
  {
    name: "Old City Streets",
    tag: "Culture",
    image: "https://images.pexels.com/photos/29837943/pexels-photo-29837943.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Wander through the vibrant narrow streets of the old city, filled with traditional handicrafts, silver jewelry, and local snacks.",
  },
  {
    name: "Gangaur Ghat",
    tag: "Spirituality",
    image: "https://images.pexels.com/photos/29824639/pexels-photo-29824639.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the main ghats on the waterfront of Lake Pichola, ideal for witnessing traditional ceremonies and beautiful sunsets.",
  },
];

const seasons = [
  {
    name: "Winter",
    months: "October - March",
    temp: "10°C - 28°C",
    desc: "The absolute best time to visit the City of Lakes. Perfect for boat rides and exploring the palaces without the heat.",
    color: "#7b9eb8",
    recommended: true,
  },
  {
    name: "Summer",
    months: "April - June",
    temp: "28°C - 42°C",
    desc: "A quieter time where you can enjoy the luxury lakeside resorts at a slower pace and benefit from seasonal offers.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Monsoon",
    months: "July - September",
    temp: "25°C - 35°C",
    desc: "Udaipur is arguably at its most beautiful during the rains, as the lakes fill up and the surrounding hills turn emerald green.",
    color: "#8ba87e",
    recommended: true,
  },
];

const tourPackages = [
  {
    title: "Udaipur Romantic Getaway 3D/2N",
    price: "₹24,800",
    duration: "3 Days / 2 Nights",
    tag: "Couple Friendly",
    image: "https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Mewar Royal Heritage Explorer",
    price: "₹32,500",
    duration: "5 Days / 4 Nights",
    tag: "Luxury",
    image: "https://images.pexels.com/photos/29801416/pexels-photo-29801416.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Lakes & Palaces Photography Tour",
    price: "₹21,200",
    duration: "3 Days / 2 Nights",
    tag: "Culture",
    image: "https://images.pexels.com/photos/29824639/pexels-photo-29824639.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function UdaipurPage() {
  return (
    <PremiumCityDetailPage
      citySlug="udaipur"
      cityName="Udaipur"
      stateName="Rajasthan"
      tagline="Romantic Lakeside Vistas & Marble Palace Resorts"
      heroImage="https://images.pexels.com/photos/29801402/pexels-photo-29801402.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
