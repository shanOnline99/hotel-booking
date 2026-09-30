import { Room, RatePlan, Reservation } from '@/types';

export const MOCK_RATE_PLANS: RatePlan[] = [
  {
    id: 'standard',
    name: 'flex rate (free cancellation)',
    description: 'cancel up to 48 hours before check-in with zero fee. breakfast optional.',
    priceMultiplier: 1.0,
    includedBenefits: ['free high-speed Wi-Fi', 'welcome drink on arrival', 'flexible cancellation'],
  },
  {
    id: 'breakfast',
    name: 'daily gourmet breakfast included',
    description: 'enjoy daily morning buffet & à la carte breakfast at our oceanfront bistro.',
    priceMultiplier: 1.15,
    includedBenefits: ['daily breakfast for all guests', 'free high-speed Wi-Fi', 'welcome fruit basket & prosecco'],
  },
  {
    id: 'full-experience',
    name: 'tantor luxury experience package',
    description: 'includes breakfast, 3-course dinner, daily spa credit, and airport transfer.',
    priceMultiplier: 1.4,
    includedBenefits: [
      'daily breakfast & 3-course chef dinner',
      '$100 daily spa credit',
      'complimentary roundtrip airport transfer',
      'sunset cocktail hour daily',
    ],
  },
];

export const MOCK_ROOMS: Room[] = [
  {
    id: 'room-1',
    slug: 'king-dutugemunu',
    name: 'King Dutugemunu',
    shortDescription: 'spacious family cabana for up to 4 guests with 2 double beds and en-suite bathroom.',
    description:
      'Designed for family retreats deep in Habarana\'s nature. King Dutugemunu offers generous living space, traditional wooden cabana architecture, two comfortable double beds, and a private en-suite bathroom.',
    maxOccupancy: 4,
    sizeSqm: 65,
    bedType: '2 Double Beds',
    view: 'Tropical Garden & Jungle View',
    basePrice: 140,
    featured: true,
    photos: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'En-suite private bathroom',
      'Tropical garden view veranda',
      'Air conditioning & ceiling fan',
      'Free high-speed Wi-Fi',
      'Complimentary bottled water',
    ],
  },
  {
    id: 'room-2',
    slug: 'king-wasabha',
    name: 'King Wasabha',
    shortDescription: 'family cabana accommodating 4 pax with 2 double beds and private bathroom.',
    description:
      'A serene family cabana named after ancient Sri Lankan heritage. Featuring two double beds, airy veranda, private bathroom, and surrounding rainforest views.',
    maxOccupancy: 4,
    sizeSqm: 65,
    bedType: '2 Double Beds',
    view: 'Jungle & Nature Sanctuary',
    basePrice: 140,
    featured: true,
    photos: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'En-suite private bathroom',
      'Airy wooden veranda',
      'Air conditioning & ceiling fan',
      'Free high-speed Wi-Fi',
      'Complimentary tea & coffee',
    ],
  },
  {
    id: 'room-3',
    slug: 'ivory-nest',
    name: 'Ivory Nest',
    shortDescription: 'cozy romantic couple cabana with 1 double bed and private en-suite bathroom.',
    description:
      'Tucked amidst tree canopy lianas, Ivory Nest is an intimate sanctuary for couples. Features a plush double bed, private wooden veranda, and attached en-suite bathroom.',
    maxOccupancy: 2,
    sizeSqm: 45,
    bedType: '1 Double Bed',
    view: 'Forest Canopy View',
    basePrice: 110,
    featured: true,
    photos: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'En-suite private bathroom',
      'Private couple veranda',
      'Air conditioning & fan',
      'Free high-speed Wi-Fi',
      'Garden view daybed',
    ],
  },
  {
    id: 'room-4',
    slug: 'family-river-villa',
    name: 'Family River Villa',
    shortDescription: 'expansive 2-villa complex for up to 12 guests with two rooms and 2 bathrooms.',
    description:
      'Our flagship family retreat featuring two connected villas, two private bathrooms, multiple bedrooms, and riverbank views. Perfect for large groups and extended family stays.',
    maxOccupancy: 12,
    sizeSqm: 140,
    bedType: 'Multiple Double & Single Beds',
    view: 'Riverbank & Jungle Sanctuary',
    basePrice: 320,
    featured: false,
    photos: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '2 connected private villas',
      '2 en-suite private bathrooms',
      'Spacious outdoor lounge deck',
      'Air conditioning in all bedrooms',
      'Free high-speed Wi-Fi',
    ],
  },
  {
    id: 'room-5',
    slug: 'moon-light-1',
    name: 'Moon Light 1',
    shortDescription: 'luxury cabana for couples or small families with private plunge pool and extra single bed.',
    description:
      'Moon Light 1 features a private stone plunge pool, 1 double bed, plus an extra single bed. Step straight onto your private pool deck for evening stargazing.',
    maxOccupancy: 3,
    sizeSqm: 75,
    bedType: '1 Double Bed + 1 Extra Single Bed',
    view: 'Private Pool & Garden View',
    basePrice: 220,
    featured: false,
    photos: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Private stone plunge pool',
      'En-suite private bathroom',
      'Pool deck loungers',
      'Air conditioning',
      'Free high-speed Wi-Fi',
    ],
  },
  {
    id: 'room-6',
    slug: 'moon-light-2',
    name: 'Moon Light 2',
    shortDescription: 'spacious cabana with private plunge pool, 1 double bed, and 2 extra single beds.',
    description:
      'The ultimate pool cabana experience. Moon Light 2 comes with your own private plunge pool, 1 double bed, two extra single beds, and private sun terrace.',
    maxOccupancy: 4,
    sizeSqm: 85,
    bedType: '1 Double Bed + 2 Extra Beds',
    view: 'Private Pool & Jungle Sanctuary',
    basePrice: 240,
    featured: false,
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Private stone plunge pool',
      'En-suite private bathroom',
      'Private pool terrace',
      'Air conditioning',
      'Free high-speed Wi-Fi',
    ],
  },
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    bookingCode: 'TR-84920',
    roomId: 'room-1',
    checkIn: '2026-10-10',
    checkOut: '2026-10-15',
    guests: 2,
    roomsCount: 1,
    guestName: 'Elena Rostova',
    guestPhone: '+1 555 019 2831',
    guestEmail: 'elena@example.com',
    ratePlanId: 'breakfast',
    ratePlanName: 'daily gourmet breakfast included',
    totalAmount: 2760,
    specialRequests: 'high floor preference, quiet corner if available.',
    status: 'confirmed',
    source: 'direct',
    createdAt: '2026-09-20T10:30:00Z',
  },
  {
    id: 'res-102',
    bookingCode: 'TR-19284',
    roomId: 'room-2',
    checkIn: '2026-11-01',
    checkOut: '2026-11-04',
    guests: 2,
    roomsCount: 1,
    guestName: 'Julian Vance',
    guestPhone: '+44 7700 900077',
    guestEmail: 'julian@example.com',
    ratePlanId: 'standard',
    ratePlanName: 'flex rate (free cancellation)',
    totalAmount: 960,
    specialRequests: 'honeymoon setup with fresh flowers.',
    status: 'confirmed',
    source: 'whatsapp',
    createdAt: '2026-09-24T14:15:00Z',
  },
];

export const MOCK_RESORT_INFO = {
  name: 'Tantor Resort',
  tagline: 'A secluded sanctuary deep in Habarana\'s jungle',
  address: 'Laksirigama, Anuradhapura road, Habarana 50150',
  phone: '+94 75 699 8998',
  whatsapp: '+94 75 699 8998',
  email: 'tentorresorthabarana@gmail.com',
  mapsUrl: 'https://maps.app.goo.gl/tsm1zvaBTjxzfkUq8',
  checkInTime: '14:00',
  checkOutTime: '11:00',
  coordinates: {
    lat: 8.0451861,
    lng: 80.7281489,
  },
  amenities: [
    {
      title: '3 Outdoor Swimming Pools',
      description: '3 year-round outdoor pools for all ages with sun umbrellas, pool cover, and beach towels.',
      icon: 'Waves',
    },
    {
      title: 'Ayurvedic Spa & Sauna',
      description: 'full-body, couples, head & foot massages, steam room, sauna, and yoga classes.',
      icon: 'Droplets',
    },
    {
      title: 'Cooking Classes & Safaris',
      description: 'local Sri Lankan cooking classes, cultural tours, and direct elephant jeep safaris.',
      icon: 'Binoculars',
    },
    {
      title: 'Garden Dining & Bar',
      description: 'restaurant, bar, in-room breakfast, minibar, wine/champagne, and kid-friendly buffets.',
      icon: 'Utensils',
    },
    {
      title: '24/7 Concierge & Wi-Fi',
      description: '24-hour front desk, express check-in/out, tour desk, currency exchange & high-speed Wi-Fi.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Free Parking & Airport Shuttle',
      description: 'on-site private parking garage, car hire arrangements, and airport shuttle service.',
      icon: 'Car',
    },
  ],
  testimonials: [
    {
      quote:
        'We stayed at Tantor Resort Habarana for 2 nights, and it was an amazing experience from start to finish. The resort is peaceful, clean, and beautifully maintained. Our private pool with the cabana was fantastic—perfect for relaxing in complete privacy. Delicious food and exceptional hospitality!',
      author: 'Rumesh Dissanayaka',
      location: 'Google Review • Sri Lanka',
      rating: 5,
    },
    {
      quote:
        'We had an absolutely unforgettable stay at Tantor Resort. We stayed in the large treehouse accommodation, which was incredibly spacious, beautifully designed, and offered a unique, luxurious experience surrounded by nature. A special shoutout to Anu, who took amazing care of us!',
      author: 'Bernhard Rieder',
      location: 'Google Review • Austria',
      rating: 5,
    },
    {
      quote:
        'Our family of four spent six wonderful days at Tantor Resort. Tantor is a small, family-run resort with just four accommodation units, a swimming pool, and a beautifully kept garden. The staff were always smiling and kind. Anuu was an exceptional host who assisted us with local tips and excursions.',
      author: 'Søren Zahle',
      location: 'Google Review • Denmark',
      rating: 5,
    },
    {
      quote:
        'AMAZING! Our best stay in Sri Lanka. The room was really beautifully laid out, on stilts and in a tree. The lianas and branches of the trees hang everywhere, making you really feel like you are in a tree. Outdoor bathroom and wonderful staff. Highly recommended!',
      author: 'Rob Koopmans',
      location: 'Google Review • Netherlands',
      rating: 5,
    },
  ],
};

export const NEARBY_ATTRACTIONS = [
  { name: 'Minneriya National Park', distance: '9 km', category: 'Nature & Wildlife' },
  { name: 'Minneriya', distance: '10 km', category: 'Local Town & Reservoir' },
  { name: 'Pidurangala Rock', distance: '13 km', category: 'Hiking & Sunrise Viewpoint' },
  { name: 'Sigiriya Rock', distance: '13 km', category: 'UNESCO World Heritage' },
  { name: 'Ritigala Forest Monastery', distance: '15 km', category: 'Ancient Sanctuary' },
  { name: 'Sigiriya Museum', distance: '16 km', category: 'History & Culture' },
  { name: 'Sigiriya', distance: '16 km', category: 'Cultural Village' },
];
