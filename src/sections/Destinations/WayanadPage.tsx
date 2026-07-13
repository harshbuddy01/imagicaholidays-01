"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "Kerala" },
  { label: "Tour Packages", value: "3 Active Tours" },
  { label: "Starting Price", value: "₹12,400" },
  { label: "Famous For", value: "Spices & Waterfalls" },
];

const whyVisit = [
  {
    title: "Enchanting Nature",
    desc: "Wayanad is renowned for its lush green mountains, cascading waterfalls, and sprawling spice plantations that define the beauty of the Western Ghats.",
    icon: "leaf",
  },
  {
    title: "Rich Heritage",
    desc: "Home to the mystic Edakkal Caves, featuring prehistoric petroglyphs datable to the Neolithic age, taking you back in time.",
    icon: "mountain",
  },
  {
    title: "Exotic Wildlife",
    desc: "Explore the Wayanad Wildlife Sanctuary, an integral part of the Nilgiri Biosphere Reserve known for tigers, leopards, and herds of wild elephants.",
    icon: "wildlife",
  },
];

const attractions = [
  {
    name: "Edakkal Caves",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/36964491/pexels-photo-36964491.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Natural caves on the Ambukuthi Hills featuring ancient petroglyphs and breathtaking views of the massive valleys below.",
  },
  {
    name: "Chembra Peak",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The highest peak in Wayanad, offering a challenging trek and boasting a naturally heart-shaped lake, Hridaya Saras.",
  },
  {
    name: "Banasura Sagar Dam",
    tag: "Nature",
    image: "https://images.pexels.com/photos/17545322/pexels-photo-17545322.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The largest earth dam in India, featuring small islands in the reservoir and backdrops of the Banasura hills. Perfect for speed boating.",
  },
  {
    name: "Soochipara Falls",
    tag: "Nature",
    image: "https://images.pexels.com/photos/29845028/pexels-photo-29845028.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Also known as Sentinel Rock Waterfalls, it's a magnificent three-tiered waterfall surrounded by dense evergreen forests.",
  },
  {
    name: "Wayanad Wildlife Sanctuary",
    tag: "Wildlife",
    image: "https://images.pexels.com/photos/29845020/pexels-photo-29845020.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A contiguous network with Mudumalai and Bandipur sanctuaries, hosting vast herds of elephants and vibrant birdlife.",
  },
  {
    name: "Pookode Lake",
    tag: "Nature",
    image: "https://images.pexels.com/photos/29757657/pexels-photo-29757657.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A scenic freshwater lake nestled amongst evergreen forests, renowned for its shape resembling India's map and serene boating rides.",
  },
];

const seasons = [
  {
    name: "Winter",
    months: "October - February",
    temp: "10°C - 24°C",
    desc: "The absolute best time to explore Wayanad. The weather is delightfully crisp and cool, perfect for trekking to Chembra Peak or exploring the Edakkal Caves.",
    color: "#7b9eb8",
    recommended: true,
  },
  {
    name: "Summer",
    months: "March - May",
    temp: "20°C - 36°C",
    desc: "Summers can be warm but the forest areas remain relatively cool compared to the plains. An excellent time for spotting wildlife near water reservoirs.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Monsoon",
    months: "June - September",
    temp: "18°C - 25°C",
    desc: "Wayanad receives heavy rainfall, turning the district into a deeply vibrant emerald green. Perfect for experiencing spectacular waterfalls in full flow.",
    color: "#8ba87e",
    recommended: true,
  },
];

const tourPackages = [
  {
    title: "Wayanad Weekend Escape 3 Days 2 Nights",
    price: "₹12,400",
    duration: "3 Days/ 2 Night",
    tag: "Couple Friendly",
    image: "https://images.pexels.com/photos/30561587/pexels-photo-30561587.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Mystical Wayanad Adventure 4 Days 3 Nights",
    price: "₹17,200",
    duration: "4 Days/ 3 Nights",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/18151791/pexels-photo-18151791.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Kerala Backwoods Explorer 6 Days 5 Nights",
    price: "₹24,500",
    duration: "6 Days/ 5 Night",
    tag: "Family-Friendly",
    image: "https://images.pexels.com/photos/34713309/pexels-photo-34713309.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function WayanadPage() {
  return (
    <PremiumCityDetailPage
      citySlug="wayanad"
      cityName="Wayanad"
      stateName="Kerala"
      tagline="Ancient Caves & Spices in the Ghats"
      heroImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
