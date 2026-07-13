"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Sikkim" },
  { label: "Tour Packages", value: "7 Active Tours" },
  { label: "Starting Price", value: "₹10,129" },
  { label: "Famous For", value: "Valley of Flowers" },
];

const whyVisit = [
  {
    title: "Gateway to Yumthang Valley",
    desc: "Lachung is the base for visiting Yumthang Valley — blooming rhododendrons in spring, snow-covered landscapes in winter, surrounded by majestic Himalayan mountains.",
    icon: "flower",
  },
  {
    title: "Scenic Road Journey with Waterfalls",
    desc: "The journey to Lachung is filled with natural beauty — Seven Sisters Waterfall, Naga Waterfall, Bhim Nala Waterfall, and stunning Teesta River views along the entire route.",
    icon: "flower",
  },
  {
    title: "Peaceful Himalayan Village Experience",
    desc: "Unlike crowded tourist places, Lachung offers calm, pollution-free environment, traditional wooden houses, apple orchards, the beautiful Lachung Monastery, and authentic Bhutia culture.",
    icon: "mountain",
  },
];

const attractions = [
  {
    name: "Yumthang Valley",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The Valley of Flowers of Sikkim — surrounded by snow-capped peaks, alpine meadows, hot springs, and the Teesta River. Blooms with colorful rhododendrons in spring.",
  },
  {
    name: "Mount Katao",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A high-altitude snow destination known for breathtaking mountain views and winter snow activities. Less crowded, ideal for adventure lovers.",
  },
  {
    name: "Yumesamdong (Zero Point)",
    tag: "Nature",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Where the civilian road ends near the Indo-China border. Surrounded by snow-clad mountains and alpine terrain — raw Himalayan beauty.",
  },
  {
    name: "Shingba Rhododendron Sanctuary",
    tag: "Nature",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Home to over 40 species of rhododendrons. In spring, the valley turns into a vibrant carpet of red, pink, white, and purple flowers.",
  },
  {
    name: "Sanglaphu Lake",
    tag: "Nature",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A pristine high-altitude lake at 16,670 ft, newly opened in 2024. Known for its frozen beauty and sacred, untouched nature.",
  },
  {
    name: "Lachung Monastery",
    tag: "Religious",
    image: "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Built in 1880, this Nyingma sect monastery features colorful murals, prayer flags, and a large statue of Guru Padmasambhava surrounded by pine forests.",
  },
];

const seasons = [
  {
    name: "Spring",
    months: "March – May",
    temp: "5°C – 18°C",
    desc: "Yumthang Valley blooms with colorful rhododendrons. Snow starts melting, revealing lush green landscapes. Clear mountain views and pleasant weather — ideal for sightseeing and photography.",
    color: "#8ba87e",
    recommended: true,
  },
  {
    name: "Summer",
    months: "June – August",
    temp: "10°C – 22°C",
    desc: "Cool and refreshing compared to the plains. Green valleys and waterfalls everywhere. Good for family vacations. Occasional rainfall as monsoon begins late June.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Autumn",
    months: "September – November",
    temp: "5°C – 18°C",
    desc: "Crystal-clear views of snow peaks. Fresh post-monsoon greenery. Pleasant and stable weather with less rainfall — another excellent time to visit.",
    color: "#c47d3e",
    recommended: false,
  },
  {
    name: "Winter",
    months: "December – February",
    temp: "-5°C – 10°C",
    desc: "Snow-covered mountains and roads. Best time to visit Zero Point for snow. Magical white landscapes but very cold weather — dress warm!",
    color: "#7b9eb8",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Lachen, Lachung Budget Group Tour",
    price: "₹5,500",
    duration: "4 Days / 3 Nights",
    tag: "Group Tour",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Lachen Lachung 6N/7D",
    price: "₹18,800",
    duration: "7 Days / 6 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok & Lachung Yumthang Valley",
    price: "₹9,000",
    duration: "5 Days / 4 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Lachen Lachung with Gurudongmar",
    price: "₹11,400",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Lachung 2N/3D Tour Package",
    price: "₹14,000",
    duration: "3 Days / 2 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Lachen Lachung 3N North Sikkim",
    price: "₹7,700",
    duration: "4 Days / 3 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Lachung Budget Group Tour",
    price: "₹4,500",
    duration: "3 Days / 2 Nights",
    tag: "Budget",
    image: "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function LachungPage() {
  return (
    <PremiumCityDetailPage
      citySlug="lachung"
      cityName="Lachung"
      stateName="Sikkim"
      tagline="Alpine Valleys & Snow Peaks in North Sikkim"
      heroImage="https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
