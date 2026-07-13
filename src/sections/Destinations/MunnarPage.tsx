"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Kerala" },
  { label: "Tour Packages", value: "3 Active Tours" },
  { label: "Starting Price", value: "₹14,500" },
  { label: "Famous For", value: "Tea Estates & Backwaters" },
];

const whyVisit = [
  {
    title: "Lush Tea Plantations",
    desc: "Munnar is famous for its endless expanse of tea estates rolling over the hills, offering breathtaking emerald landscapes and fresh mountain air.",
    icon: "tea",
  },
  {
    title: "Rich Wildlife",
    desc: "Home to the Eravikulam National Park, where you can spot the endangered Nilgiri Tahr and experience the rare Neelakurinji blooms.",
    icon: "wildlife",
  },
  {
    title: "Tranquil Backwaters",
    desc: "Experience the unique houseboat stays and serene backwater cruises that Kerala is worldwide renowned for.",
    icon: "boat",
  },
];

const attractions = [
  {
    name: "Mattupetty Dam",
    tag: "Nature",
    image: "https://images.pexels.com/photos/17545322/pexels-photo-17545322.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A concrete gravity dam nestled in the hills, known for its scenic water reservoir and exciting boating experiences.",
  },
  {
    name: "Eravikulam National Park",
    tag: "Wildlife",
    image: "https://images.pexels.com/photos/29757657/pexels-photo-29757657.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Kerala's first national park, famous for the endangered Nilgiri Tahr and rolling grasslands.",
  },
  {
    name: "Tea Museum",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/36964491/pexels-photo-36964491.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Discover the legacy and history of tea plantations in Munnar, complete with fresh tea tasting sessions.",
  },
  {
    name: "Echo Point",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A picturesque spot situated on the banks of a serene lake, famous for its natural echo phenomenon.",
  },
  {
    name: "Kundala Lake",
    tag: "Nature",
    image: "https://images.pexels.com/photos/29845028/pexels-photo-29845028.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "An idyllic lake surrounded by lush green hills, where you can enjoy pedal boating and Kashmiri Shikara rides.",
  },
  {
    name: "Attukal Waterfalls",
    tag: "Nature",
    image: "https://images.pexels.com/photos/29845020/pexels-photo-29845020.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A spectacular waterfall cascading through rolling hills and dense jungles, perfect for trekking enthusiasts.",
  },
];

const seasons = [
  {
    name: "Winter",
    months: "September - March",
    temp: "10°C - 25°C",
    desc: "Winter is the best time to visit Munnar. The weather is cool, pleasant, and perfect for sightseeing, trekking, and exploring the tea estates.",
    color: "#7b9eb8",
    recommended: true,
  },
  {
    name: "Summer",
    months: "April - May",
    temp: "15°C - 25°C",
    desc: "Summers are mild and peaceful. It's an excellent time to escape the scorching heat of the plains and enjoy the cool mountain breeze.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Monsoon",
    months: "June - August",
    temp: "10°C - 20°C",
    desc: "Munnar looks stunningly lush and green during the monsoon. Ideal for nature lovers seeking quiet retreats, though outdoor activities may be restricted.",
    color: "#8ba87e",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Magical Munnar Explorer 4 Days 3 Nights",
    price: "₹14,500",
    duration: "4 Days/ 3 Night",
    tag: "Couple Friendly",
    image: "https://images.pexels.com/photos/30561587/pexels-photo-30561587.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Kerala Backwaters & Munnar – 6 Nights 7 Days",
    price: "₹26,200",
    duration: "7 Days/ 6 Nights",
    tag: "Family-Friendly",
    image: "https://images.pexels.com/photos/18151791/pexels-photo-18151791.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Munnar Wildlife & Heritage 5 Days 4 Nights",
    price: "₹19,200",
    duration: "5 Days/ 4 Night",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/34713309/pexels-photo-34713309.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function MunnarPage() {
  return (
    <PremiumCityDetailPage
      citySlug="munnar"
      cityName="Munnar"
      stateName="Kerala"
      tagline="The Emerald Heaven of Kerala"
      heroImage="https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
