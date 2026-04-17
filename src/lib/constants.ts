export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  location?: string;
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
    image: "https://unsplash.com/photos/GdlEMsUsOy0/download?force=true&w=1800",
    location: "Varanasi"
  },
  {
    id: "slide-2",
    title: "Mountain Heights",
    subtitle: "Breathtaking views.",
    image: "https://unsplash.com/photos/-umeutkfZew/download?force=true&w=1800",
    location: "Ladakh"
  },
  {
    id: "slide-3",
    title: "Wildlife Wonders",
    subtitle: "Embrace nature.",
    image: "https://unsplash.com/photos/A0vabw8DVx0/download?force=true&w=1800",
    location: "Madhya Pradesh"
  },
  {
    id: "slide-4",
    title: "Concrete Coast",
    subtitle: "Modern marvels.",
    image: "https://unsplash.com/photos/yjQQO8hIH6A/download?force=true&w=1800",
    location: "Maharashtra"
  },
  {
    id: "slide-5",
    title: "Green Valleys",
    subtitle: "Endless horizons.",
    image: "https://unsplash.com/photos/ilrO9BN7QSE/download?force=true&w=1800",
    location: "Himachal Pradesh"
  },
  {
    id: "slide-7",
    title: "Tranquil Waters",
    subtitle: "A journey of peace.",
    image: "https://unsplash.com/photos/29ezCWtMtnM/download?force=true&w=1800",
    location: "Kerala"
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
export const villas = [
  {
    id: "v1",
    title: "Vela One Bedroom Ocean Front Villa",
    description: "Poised on a cliffside with sweeping ocean views, complemented by personalized butler services to cater to your every desire.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "v2",
    title: "Vela Two Bedroom Family Villa",
    description: "A spacious sanctuary designed for families, featuring a private pool and lush garden surroundings.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "v3",
    title: "Vela Ocean View Cliff Villa",
    description: "Experience the ultimate in privacy and luxury with unobstructed views of the Indian Ocean.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "v4",
    title: "Vela River Front Villa",
    description: "Nestled along the gentle river, this villa offers a tranquil escape into nature's embrace.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=80"
  }
];

/* ═══════════════════════════════════════════════════════════
   JOURNEYS (Find Your Journey Feature)
   ═══════════════════════════════════════════════════════════ */
export const journeys = [
  {
    "id": "sikkim-journey-0",
    "title": "2-Day Sikkim Explorer Escape",
    "regions": "NORTH-EAST INDIA & SIKKIM",
    "durationNights": 1,
    "durationDays": 2,
    "pricePerGuest": 23000,
    "originalPrice": 26450,
    "departurePort": "Gangtok",
    "returnPort": "Lachung",
    "departureDate": "1 Nov 2026",
    "returnDate": "3 Nov 2026",
    "ports": 2,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "SIKKIM"
    ],
    "images": [
      "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH-EAST INDIA & SIKKIM. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Gangtok",
        "date": "1 Nov",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Lachung",
        "date": "2 Nov",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "sikkim-journey-1",
    "title": "2-Day Himalayan Ridge Retreat Expedition",
    "regions": "NORTH-EAST INDIA & SIKKIM",
    "durationNights": 1,
    "durationDays": 2,
    "pricePerGuest": 23500,
    "originalPrice": 27025,
    "departurePort": "Gangtok",
    "returnPort": "Nathula",
    "departureDate": "3 Nov 2026",
    "returnDate": "5 Nov 2026",
    "ports": 2,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "SIKKIM"
    ],
    "images": [
      "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH-EAST INDIA & SIKKIM. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Gangtok",
        "date": "3 Nov",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Nathula",
        "date": "4 Nov",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "darjeeling-journey-2",
    "title": "5-Day Darjeeling Tea Trails Retreat",
    "regions": "EAST INDIA & BENGAL",
    "durationNights": 4,
    "durationDays": 5,
    "pricePerGuest": 36000,
    "originalPrice": 41400,
    "departurePort": "Bagdogra",
    "returnPort": "Mirik",
    "departureDate": "5 Nov 2026",
    "returnDate": "10 Nov 2026",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "DARJEELING"
    ],
    "images": [
      "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/36964491/pexels-photo-36964491.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of EAST INDIA & BENGAL. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Bagdogra",
        "date": "5 Nov",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33676436/pexels-photo-33676436.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Kurseong",
        "date": "6 Nov",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Darjeeling",
        "date": "7 Nov",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/2408962/pexels-photo-2408962.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Kalimpong",
        "date": "8 Nov",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Mirik",
        "date": "9 Nov",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/6741747/pexels-photo-6741747.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "darjeeling-journey-3",
    "title": "3-Day Colonial Himalayan Escape Journey",
    "regions": "EAST INDIA & BENGAL",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 28500,
    "originalPrice": 32775,
    "departurePort": "Darjeeling",
    "returnPort": "Kurseong",
    "departureDate": "7 Nov 2026",
    "returnDate": "10 Nov 2026",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "DARJEELING"
    ],
    "images": [
      "https://images.pexels.com/photos/30778897/pexels-photo-30778897.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/36964491/pexels-photo-36964491.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/34087894/pexels-photo-34087894.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of EAST INDIA & BENGAL. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Darjeeling",
        "date": "7 Nov",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19082530/pexels-photo-19082530.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Ghoom",
        "date": "8 Nov",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Kurseong",
        "date": "9 Nov",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "kerala-journey-4",
    "title": "5-Day Kerala Backwaters & Hills Adventure",
    "regions": "SOUTH INDIA & KERALA",
    "durationNights": 4,
    "durationDays": 5,
    "pricePerGuest": 37000,
    "originalPrice": 42550,
    "departurePort": "Cochin",
    "returnPort": "Thekkady",
    "departureDate": "9 Dec 2026",
    "returnDate": "14 Dec 2026",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "KERALA"
    ],
    "images": [
      "https://images.pexels.com/photos/18151791/pexels-photo-18151791.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/5374231/pexels-photo-5374231.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/34713309/pexels-photo-34713309.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of SOUTH INDIA & KERALA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Cochin",
        "date": "9 Dec",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/20035184/pexels-photo-20035184.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Alleppey",
        "date": "10 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/17545322/pexels-photo-17545322.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Kumarakom",
        "date": "11 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/30561587/pexels-photo-30561587.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Munnar",
        "date": "12 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/8964871/pexels-photo-8964871.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Thekkady",
        "date": "13 Dec",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/14922662/pexels-photo-14922662.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "kerala-journey-5",
    "title": "5-Day Munnar Tea Estate Retreat Escape",
    "regions": "SOUTH INDIA & KERALA",
    "durationNights": 4,
    "durationDays": 5,
    "pricePerGuest": 37500,
    "originalPrice": 43125,
    "departurePort": "Cochin",
    "returnPort": "Thekkady",
    "departureDate": "11 Dec 2026",
    "returnDate": "16 Dec 2026",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "KERALA"
    ],
    "images": [
      "https://images.pexels.com/photos/5374231/pexels-photo-5374231.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/30561587/pexels-photo-30561587.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/34713309/pexels-photo-34713309.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of SOUTH INDIA & KERALA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Cochin",
        "date": "11 Dec",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/8964871/pexels-photo-8964871.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Munnar",
        "date": "12 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/14922662/pexels-photo-14922662.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Chinnar",
        "date": "13 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/20035184/pexels-photo-20035184.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Marayoor",
        "date": "14 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/17545322/pexels-photo-17545322.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Thekkady",
        "date": "15 Dec",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/18151791/pexels-photo-18151791.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "goa-journey-6",
    "title": "3-Day Coastal Luxury Escape Expedition",
    "regions": "WEST INDIA & GOA",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 30000,
    "originalPrice": 34500,
    "departurePort": "Dabolim",
    "returnPort": "Morjim",
    "departureDate": "13 Dec 2026",
    "returnDate": "16 Dec 2026",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "GOA"
    ],
    "images": [
      "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/20717176/pexels-photo-20717176.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of WEST INDIA & GOA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Dabolim",
        "date": "13 Dec",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/11442148/pexels-photo-11442148.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Panjim",
        "date": "14 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/29236033/pexels-photo-29236033.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Morjim",
        "date": "15 Dec",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "goa-journey-7",
    "title": "3-Day Cataract & Cave Expedition Retreat",
    "regions": "WEST INDIA & GOA",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 30500,
    "originalPrice": 35075,
    "departurePort": "Panjim",
    "returnPort": "Tambdi Surla",
    "departureDate": "15 Dec 2026",
    "returnDate": "18 Dec 2026",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "GOA"
    ],
    "images": [
      "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/20717176/pexels-photo-20717176.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of WEST INDIA & GOA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Panjim",
        "date": "15 Dec",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Dudhsagar",
        "date": "16 Dec",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/11442148/pexels-photo-11442148.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Tambdi Surla",
        "date": "17 Dec",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/29236033/pexels-photo-29236033.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "rajasthan-journey-8",
    "title": "5-Day Royal Rajasthan Odyssey Journey",
    "regions": "NORTH INDIA & RAJASTHAN",
    "durationNights": 4,
    "durationDays": 5,
    "pricePerGuest": 39000,
    "originalPrice": 44850,
    "departurePort": "Jaipur",
    "returnPort": "Bikaner",
    "departureDate": "17 Jan 2027",
    "returnDate": "22 Jan 2027",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "RAJASTHAN"
    ],
    "images": [
      "https://images.pexels.com/photos/31739860/pexels-photo-31739860.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/31739859/pexels-photo-31739859.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH INDIA & RAJASTHAN. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Jaipur",
        "date": "17 Jan",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19905363/pexels-photo-19905363.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Jodhpur",
        "date": "18 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19438328/pexels-photo-19438328.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Udaipur",
        "date": "19 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33230288/pexels-photo-33230288.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Jaisalmer",
        "date": "20 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34913209/pexels-photo-34913209.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Bikaner",
        "date": "21 Jan",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/28494456/pexels-photo-28494456.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "rajasthan-journey-9",
    "title": "3-Day Golden Desert Splendour Adventure",
    "regions": "NORTH INDIA & RAJASTHAN",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 31500,
    "originalPrice": 36225,
    "departurePort": "Jaisalmer",
    "returnPort": "Jodhpur",
    "departureDate": "19 Jan 2027",
    "returnDate": "22 Jan 2027",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "RAJASTHAN"
    ],
    "images": [
      "https://images.pexels.com/photos/31739859/pexels-photo-31739859.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/15534234/pexels-photo-15534234.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH INDIA & RAJASTHAN. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Jaisalmer",
        "date": "19 Jan",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33726141/pexels-photo-33726141.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Thar Desert",
        "date": "20 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/32261839/pexels-photo-32261839.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Jodhpur",
        "date": "21 Jan",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/35394354/pexels-photo-35394354.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "rajasthan-journey-10",
    "title": "6-Day City of Lakes Luxury Escape",
    "regions": "NORTH INDIA & RAJASTHAN",
    "durationNights": 5,
    "durationDays": 6,
    "pricePerGuest": 44000,
    "originalPrice": 50600,
    "departurePort": "Udaipur",
    "returnPort": "Jaipur",
    "departureDate": "21 Jan 2027",
    "returnDate": "27 Jan 2027",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "RAJASTHAN"
    ],
    "images": [
      "https://images.pexels.com/photos/19160085/pexels-photo-19160085.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/19905363/pexels-photo-19905363.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH INDIA & RAJASTHAN. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Udaipur",
        "date": "21 Jan",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/15828299/pexels-photo-15828299.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Mount Abu",
        "date": "22 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33230288/pexels-photo-33230288.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Kumbhalgarh",
        "date": "23 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/12912712/pexels-photo-12912712.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Chittorgarh",
        "date": "24 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/15534234/pexels-photo-15534234.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Jaipur",
        "date": "25 Jan",
        "time": "Full Day",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/31739860/pexels-photo-31739860.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 6",
        "title": "Discover Udaipur",
        "date": "26 Jan",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 6 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19195937/pexels-photo-19195937.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "sikkim-journey-11",
    "title": "2-Day Sikkim Explorer Expedition",
    "regions": "NORTH-EAST INDIA & SIKKIM",
    "durationNights": 1,
    "durationDays": 2,
    "pricePerGuest": 28500,
    "originalPrice": 32775,
    "departurePort": "Gangtok",
    "returnPort": "Lachung",
    "departureDate": "23 Jan 2027",
    "returnDate": "25 Jan 2027",
    "ports": 2,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "SIKKIM"
    ],
    "images": [
      "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH-EAST INDIA & SIKKIM. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Gangtok",
        "date": "23 Jan",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Lachung",
        "date": "24 Jan",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "sikkim-journey-12",
    "title": "2-Day Himalayan Ridge Retreat Retreat",
    "regions": "NORTH-EAST INDIA & SIKKIM",
    "durationNights": 1,
    "durationDays": 2,
    "pricePerGuest": 29000,
    "originalPrice": 33350,
    "departurePort": "Gangtok",
    "returnPort": "Nathula",
    "departureDate": "25 Feb 2027",
    "returnDate": "27 Feb 2027",
    "ports": 2,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "SIKKIM"
    ],
    "images": [
      "https://images.pexels.com/photos/33248529/pexels-photo-33248529.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/30156563/pexels-photo-30156563.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH-EAST INDIA & SIKKIM. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Gangtok",
        "date": "25 Feb",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/35431355/pexels-photo-35431355.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Nathula",
        "date": "26 Feb",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of SIKKIM. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34032592/pexels-photo-34032592.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "darjeeling-journey-13",
    "title": "4-Day Darjeeling Tea Trails Journey",
    "regions": "EAST INDIA & BENGAL",
    "durationNights": 3,
    "durationDays": 4,
    "pricePerGuest": 37500,
    "originalPrice": 43125,
    "departurePort": "Bagdogra",
    "returnPort": "Kalimpong",
    "departureDate": "27 Feb 2027",
    "returnDate": "3 Mar 2027",
    "ports": 4,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "DARJEELING"
    ],
    "images": [
      "https://images.pexels.com/photos/34087894/pexels-photo-34087894.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/31758870/pexels-photo-31758870.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/2408962/pexels-photo-2408962.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of EAST INDIA & BENGAL. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Bagdogra",
        "date": "27 Feb",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Kurseong",
        "date": "28 Feb",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Darjeeling",
        "date": "1 Mar",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33676436/pexels-photo-33676436.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Kalimpong",
        "date": "2 Mar",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19082530/pexels-photo-19082530.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "darjeeling-journey-14",
    "title": "5-Day Colonial Himalayan Escape Adventure",
    "regions": "EAST INDIA & BENGAL",
    "durationNights": 4,
    "durationDays": 5,
    "pricePerGuest": 42000,
    "originalPrice": 48300,
    "departurePort": "Darjeeling",
    "returnPort": "Sandakphu",
    "departureDate": "1 Mar 2027",
    "returnDate": "6 Mar 2027",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "DARJEELING"
    ],
    "images": [
      "https://images.pexels.com/photos/15138292/pexels-photo-15138292.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/6741747/pexels-photo-6741747.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/33263644/pexels-photo-33263644.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of EAST INDIA & BENGAL. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Darjeeling",
        "date": "1 Mar",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33736751/pexels-photo-33736751.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Ghoom",
        "date": "2 Mar",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/30778897/pexels-photo-30778897.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Kurseong",
        "date": "3 Mar",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19082530/pexels-photo-19082530.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Kalimpong",
        "date": "4 Mar",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34087894/pexels-photo-34087894.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Sandakphu",
        "date": "5 Mar",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of DARJEELING. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/18943817/pexels-photo-18943817.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "kerala-journey-15",
    "title": "3-Day Kerala Backwaters & Hills Escape",
    "regions": "SOUTH INDIA & KERALA",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 34500,
    "originalPrice": 39675,
    "departurePort": "Cochin",
    "returnPort": "Kumarakom",
    "departureDate": "3 Mar 2027",
    "returnDate": "6 Mar 2027",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "KERALA"
    ],
    "images": [
      "https://images.pexels.com/photos/30561587/pexels-photo-30561587.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/20035184/pexels-photo-20035184.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/17545322/pexels-photo-17545322.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of SOUTH INDIA & KERALA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Cochin",
        "date": "3 Mar",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/5374231/pexels-photo-5374231.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Alleppey",
        "date": "4 Mar",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/18151791/pexels-photo-18151791.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Kumarakom",
        "date": "5 Mar",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/8964871/pexels-photo-8964871.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "kerala-journey-16",
    "title": "5-Day Munnar Tea Estate Retreat Expedition",
    "regions": "SOUTH INDIA & KERALA",
    "durationNights": 4,
    "durationDays": 5,
    "pricePerGuest": 43000,
    "originalPrice": 49450,
    "departurePort": "Cochin",
    "returnPort": "Thekkady",
    "departureDate": "2 Apr 2027",
    "returnDate": "7 Apr 2027",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "KERALA"
    ],
    "images": [
      "https://images.pexels.com/photos/34713309/pexels-photo-34713309.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/20035184/pexels-photo-20035184.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/17545322/pexels-photo-17545322.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of SOUTH INDIA & KERALA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Cochin",
        "date": "2 Apr",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/8964871/pexels-photo-8964871.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Munnar",
        "date": "3 Apr",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/14922662/pexels-photo-14922662.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Chinnar",
        "date": "4 Apr",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/5374231/pexels-photo-5374231.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Marayoor",
        "date": "5 Apr",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/30561587/pexels-photo-30561587.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Thekkady",
        "date": "6 Apr",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of KERALA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/18151791/pexels-photo-18151791.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "goa-journey-17",
    "title": "3-Day Coastal Luxury Escape Retreat",
    "regions": "WEST INDIA & GOA",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 35500,
    "originalPrice": 40825,
    "departurePort": "Dabolim",
    "returnPort": "Morjim",
    "departureDate": "4 Apr 2027",
    "returnDate": "7 Apr 2027",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "GOA"
    ],
    "images": [
      "https://images.pexels.com/photos/29236033/pexels-photo-29236033.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/20717176/pexels-photo-20717176.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of WEST INDIA & GOA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Dabolim",
        "date": "4 Apr",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/11442148/pexels-photo-11442148.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Panjim",
        "date": "5 Apr",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Morjim",
        "date": "6 Apr",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "goa-journey-18",
    "title": "3-Day Cataract & Cave Expedition Journey",
    "regions": "WEST INDIA & GOA",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 36000,
    "originalPrice": 41400,
    "departurePort": "Panjim",
    "returnPort": "Tambdi Surla",
    "departureDate": "6 Apr 2027",
    "returnDate": "9 Apr 2027",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "GOA"
    ],
    "images": [
      "https://images.pexels.com/photos/29236033/pexels-photo-29236033.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2432269/pexels-photo-2432269.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/11442148/pexels-photo-11442148.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of WEST INDIA & GOA. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Panjim",
        "date": "6 Apr",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/20717139/pexels-photo-20717139.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Dudhsagar",
        "date": "7 Apr",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Tambdi Surla",
        "date": "8 Apr",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of GOA. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/20717176/pexels-photo-20717176.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "rajasthan-journey-19",
    "title": "4-Day Royal Rajasthan Odyssey Adventure",
    "regions": "NORTH INDIA & RAJASTHAN",
    "durationNights": 3,
    "durationDays": 4,
    "pricePerGuest": 40500,
    "originalPrice": 46575,
    "departurePort": "Jaipur",
    "returnPort": "Jaisalmer",
    "departureDate": "8 Apr 2027",
    "returnDate": "12 Apr 2027",
    "ports": 4,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "RAJASTHAN"
    ],
    "images": [
      "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/31739860/pexels-photo-31739860.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/31739859/pexels-photo-31739859.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH INDIA & RAJASTHAN. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Jaipur",
        "date": "8 Apr",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/17831363/pexels-photo-17831363.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Jodhpur",
        "date": "9 Apr",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/12912712/pexels-photo-12912712.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Udaipur",
        "date": "10 Apr",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/28494456/pexels-photo-28494456.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Jaisalmer",
        "date": "11 Apr",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34913209/pexels-photo-34913209.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "rajasthan-journey-20",
    "title": "5-Day Golden Desert Splendour Escape",
    "regions": "NORTH INDIA & RAJASTHAN",
    "durationNights": 4,
    "durationDays": 5,
    "pricePerGuest": 45000,
    "originalPrice": 51750,
    "departurePort": "Jaisalmer",
    "returnPort": "Jaipur",
    "departureDate": "11 May 2027",
    "returnDate": "16 May 2027",
    "ports": 5,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "RAJASTHAN"
    ],
    "images": [
      "https://images.pexels.com/photos/31739859/pexels-photo-31739859.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/33726141/pexels-photo-33726141.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/29626935/pexels-photo-29626935.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH INDIA & RAJASTHAN. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Jaisalmer",
        "date": "11 May",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33106473/pexels-photo-33106473.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Thar Desert",
        "date": "12 May",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/15828299/pexels-photo-15828299.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Jodhpur",
        "date": "13 May",
        "time": "Full Day",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/34913209/pexels-photo-34913209.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 4",
        "title": "Discover Pushkar",
        "date": "14 May",
        "time": "Full Day",
        "description": "Immerse yourself on Day 4 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19905363/pexels-photo-19905363.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 5",
        "title": "Discover Jaipur",
        "date": "15 May",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 5 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19160085/pexels-photo-19160085.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  },
  {
    "id": "rajasthan-journey-21",
    "title": "3-Day City of Lakes Luxury Expedition",
    "regions": "NORTH INDIA & RAJASTHAN",
    "durationNights": 2,
    "durationDays": 3,
    "pricePerGuest": 37500,
    "originalPrice": 43125,
    "departurePort": "Udaipur",
    "returnPort": "Kumbhalgarh",
    "departureDate": "13 May 2027",
    "returnDate": "16 May 2027",
    "ports": 3,
    "countries": 1,
    "vehicle": "Premium SUV",
    "badges": [
      "RAJASTHAN"
    ],
    "images": [
      "https://images.pexels.com/photos/15534234/pexels-photo-15534234.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/12912712/pexels-photo-12912712.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    "mapImage": "https://images.pexels.com/photos/29626935/pexels-photo-29626935.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "overview": "A majestic itinerary designed specifically around the distinct beauty of NORTH INDIA & RAJASTHAN. Experience luxury and impeccable service along every stop of this curated journey.",
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Discover Udaipur",
        "date": "13 May",
        "time": "Arrival 12:00",
        "description": "Immerse yourself on Day 1 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/33726141/pexels-photo-33726141.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 2",
        "title": "Discover Mount Abu",
        "date": "14 May",
        "time": "Full Day",
        "description": "Immerse yourself on Day 2 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/19438328/pexels-photo-19438328.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        "day": "Day 3",
        "title": "Discover Kumbhalgarh",
        "date": "15 May",
        "time": "Departure 10:00",
        "description": "Immerse yourself on Day 3 in the beautifully authentic geographic surroundings of RAJASTHAN. Expert guided explorations wait for you.",
        "image": "https://images.pexels.com/photos/28494456/pexels-photo-28494456.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  }
];
