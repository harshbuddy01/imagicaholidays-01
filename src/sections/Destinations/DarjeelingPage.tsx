"use client";

import PremiumCityDetailPage from "./PremiumCityDetailPage";

const quickInfo = [
  { label: "State", value: "West Bengal" },
  { label: "Tour Packages", value: "5 Active Tours" },
  { label: "Starting Price", value: "₹9,780" },
  { label: "Famous For", value: "Queen of the Hills" },
];

const whyVisit = [
  {
    title: "Stunning Views of Mt. Kanchenjunga",
    desc: "Darjeeling offers panoramic views of Mt. Kanchenjunga, the world's third-highest peak. Tiger Hill is a popular spot for breathtaking sunrise views over the Himalayas.",
    icon: "mountain",
  },
  {
    title: "Darjeeling Himalayan Railway (Toy Train)",
    desc: "A UNESCO World Heritage Site, the Toy Train offers a nostalgic, scenic ride through lush tea gardens and dense forests, making it a must-do activity for visitors.",
    icon: "train",
  },
  {
    title: "Tea Gardens & Estates",
    desc: "Known for its world-famous Darjeeling tea, visitors can tour the lush tea estates, learn about tea production, and enjoy freshly brewed tea while surrounded by beautiful hills.",
    icon: "tea",
  },
];

const attractions = [
  {
    name: "Tiger Hill",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33736744/pexels-photo-33736744.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The most famous sunrise viewpoint in Darjeeling. Breathtaking panoramic views of Mt. Kanchenjunga and, on clear days, even Mt. Everest.",
  },
  {
    name: "Darjeeling Himalayan Railway",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "The iconic Toy Train offers a scenic joy ride through hills, tunnels, and tea gardens. A UNESCO World Heritage railway.",
  },
  {
    name: "Japanese Peace Pagoda",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33736745/pexels-photo-33736745.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A serene white pagoda on Jalapahar Hill promoting peace and harmony, with beautiful views of Darjeeling and surrounding mountains.",
  },
  {
    name: "Happy Valley Tea Estate",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33736752/pexels-photo-33736752.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of the oldest tea estates where visitors can see tea processing and enjoy fresh Darjeeling tea tasting.",
  },
  {
    name: "Ghoom Monastery",
    tag: "Religious",
    image: "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Also known as Yiga Choeling Monastery, it houses a 15-foot-high statue of Maitreya Buddha. One of the oldest Tibetan monasteries.",
  },
  {
    name: "Batasia Loop",
    tag: "Heritage",
    image: "https://images.pexels.com/photos/33736747/pexels-photo-33736747.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A spiral railway created to lower the gradient of the Darjeeling Himalayan Railway. Commissioned in 1919 with stunning mountain views.",
  },
  {
    name: "Padmaja Naidu Zoological Park",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/30238128/pexels-photo-30238128.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "One of India's most famous high-altitude zoos, known for conservation of red pandas, snow leopards, and Himalayan black bears.",
  },
  {
    name: "Himalayan Mountaineering Institute",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/32313654/pexels-photo-32313654.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "Established in 1954 in honor of Tenzing Norgay. Houses a mountaineering museum with equipment and stories of Himalayan expeditions.",
  },
  {
    name: "Tenzing Rock",
    tag: "Adventure",
    image: "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A famous natural rock on Hill Cart Road used for rock-climbing training by the Himalayan Mountaineering Institute.",
  },
  {
    name: "Chitrey Tea Garden",
    tag: "Nature",
    image: "https://images.pexels.com/photos/33736754/pexels-photo-33736754.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A scenic tea estate near Manebhanjan along the route to Singalila National Park and Sandakphu trekking trail.",
  },
  {
    name: "Japanese Temple",
    tag: "Religious",
    image: "https://images.pexels.com/photos/17210173/pexels-photo-17210173.jpeg?auto=compress&cs=tinysrgb&w=800",
    short: "A serene Buddhist temple built by Japanese monk Nichidatsu Fujii to promote world peace, located on Jalapahar Hill.",
  },
];

const seasons = [
  {
    name: "Spring",
    months: "March – May",
    temp: "10°C – 20°C",
    desc: "Spring is one of the best times to visit. Pleasant cool weather, blooming rhododendrons and cherry blossoms, and the clearest views of Mt. Kanchenjunga.",
    color: "#8ba87e",
    recommended: true,
  },
  {
    name: "Summer",
    months: "June – August",
    temp: "15°C – 25°C",
    desc: "Mild summers make it a great escape from the plains. Moderate rainfall enhances the lush greenery. Good time for tea garden tours, but be cautious of landslides.",
    color: "#d4a853",
    recommended: false,
  },
  {
    name: "Autumn",
    months: "September – November",
    temp: "10°C – 20°C",
    desc: "Cool, dry weather with clear skies and stunning mountain views. The region is lush after the monsoon, perfect for trekking and sightseeing.",
    color: "#c47d3e",
    recommended: true,
  },
  {
    name: "Winter",
    months: "December – February",
    temp: "2°C – 12°C",
    desc: "Cold with possible snowfall at Tiger Hill and Sandakphu. Great for snow lovers and crisp Himalayan views. Warm clothing essential.",
    color: "#7b9eb8",
    recommended: false,
  },
];

const tourPackages = [
  {
    title: "Darjeeling 2N/3D Tour Package",
    price: "₹5,200",
    duration: "3 Days / 2 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 5N/6D",
    price: "₹11,800",
    duration: "6 Days / 5 Nights",
    tag: "Featured",
    image: "https://images.pexels.com/photos/33736744/pexels-photo-33736744.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Pelling Darjeeling 5N/6D",
    price: "₹12,500",
    duration: "6 Days / 5 Nights",
    tag: "Popular",
    image: "https://images.pexels.com/photos/33736747/pexels-photo-33736747.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Gangtok Darjeeling 4N/5D",
    price: "₹10,200",
    duration: "5 Days / 4 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/33736745/pexels-photo-33736745.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Pelling & Darjeeling 4N/5D",
    price: "₹9,200",
    duration: "5 Days / 4 Nights",
    tag: "",
    image: "https://images.pexels.com/photos/33736754/pexels-photo-33736754.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function DarjeelingPage() {
  return (
    <PremiumCityDetailPage
      citySlug="darjeeling"
      cityName="Darjeeling"
      stateName="West Bengal"
      tagline="Queen of the Hills & Colonial Tea Estates"
      heroImage="https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=1800"
      quickInfo={quickInfo}
      whyVisit={whyVisit}
      attractions={attractions}
      seasons={seasons}
      tourPackages={tourPackages}
    />
  );
}
