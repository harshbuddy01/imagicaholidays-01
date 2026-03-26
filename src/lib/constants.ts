export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type ExperienceCard = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Sacred Serenity",
    subtitle: "Discover the peace within.",
    image: "https://unsplash.com/photos/GdlEMsUsOy0/download?force=true&w=1800"
  },
  {
    id: "slide-2",
    title: "Mountain Heights",
    subtitle: "Breathtaking views.",
    image: "https://unsplash.com/photos/-umeutkfZew/download?force=true&w=1800"
  },
  {
    id: "slide-3",
    title: "Wildlife Wonders",
    subtitle: "Embrace nature.",
    image: "https://unsplash.com/photos/A0vabw8DVx0/download?force=true&w=1800"
  },
  {
    id: "slide-4",
    title: "Concrete Coast",
    subtitle: "Modern marvels.",
    image: "https://unsplash.com/photos/yjQQO8hIH6A/download?force=true&w=1800"
  },
  {
    id: "slide-5",
    title: "Green Valleys",
    subtitle: "Endless horizons.",
    image: "https://unsplash.com/photos/ilrO9BN7QSE/download?force=true&w=1800"
  },
  {
    id: "slide-7",
    title: "Tranquil Waters",
    subtitle: "A journey of peace.",
    image: "https://unsplash.com/photos/29ezCWtMtnM/download?force=true&w=1800"
  }
];

export const hotelTabs = {
  Sikkim: [
    {
      id: "v1",
      title: "Exterior and Setting",
      description: "Nestled in the lush hills, Vivanta Sikkim offers unparalleled views of the Himalayas.",
      image: "https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: "v2",
      title: "Luxury Rooms",
      description: "Experience absolute comfort in our premium rooms with contemporary design.",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: "v3",
      title: "Mynt - All Day Dining",
      description: "A culinary journey combining authentic local flavors with global cuisine.",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: "v4",
      title: "Jiva Spa",
      description: "Inhale pure mountain air and exhale stress at our signature wellness retreat.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80"
    },
    {
      id: "v5",
      title: "Wink Lounge Bar",
      description: "Relax with a premium beverage while enjoying the breathtaking valley views.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=80"
    }
  ]
} as const;

export const pools: ExperienceCard[] = [
  {
    id: "p1",
    title: "Infinity Pools",
    description: "Tiered oceanfront pools designed around horizon lines.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "p2",
    title: "River Pool",
    description: "A quiet, jungle-lined retreat with cinematic stillness.",
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "p3",
    title: "Family Lagoon",
    description: "Wide decks and gentle depth zones for all-day play.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "p4",
    title: "Clifftop Deck Pool",
    description: "A highline pool experience where sunset and sea merge.",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=80"
  }
];

export const dining: ExperienceCard[] = [
  {
    id: "d1",
    title: "Seafood Grill",
    description: "Fire-led cooking with sunset theater and coastal produce.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "d2",
    title: "Teppanyaki Stage",
    description: "Interactive Japanese dining with precision and showmanship.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "d3",
    title: "Sunset Lounge",
    description: "Cocktails, live rhythm, and dramatic cliffside viewpoints.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "d4",
    title: "Mediterranean Terrace",
    description: "Seasonal plates, ocean breezes, and candle-lit evenings.",
    image: "https://images.unsplash.com/photo-1559339352-f7e7c9f5f7a9?auto=format&fit=crop&w=1400&q=80"
  }
];

export const spa: ExperienceCard[] = [
  {
    id: "sp1",
    title: "Ocean Spa on the Rocks",
    description: "Treatment villas suspended over waves and sea breeze.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "sp2",
    title: "Balinese Rituals",
    description: "Rooted healing traditions, curated for modern restoration.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "sp3",
    title: "Hydrotherapy Circuit",
    description: "Thermal pathways and guided contrast therapies.",
    image: "https://images.unsplash.com/photo-1640553891631-0f29f8ecf6f4?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "sp4",
    title: "Moonlight Wellness",
    description: "Evening treatments designed around stillness, breath, and rest.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=80"
  }
];
