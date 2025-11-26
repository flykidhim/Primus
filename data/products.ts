// products.ts
export type Product = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  description?: string;
  imageUrl?: string;
  images?: { url: string; alt?: string; sort?: number }[];
  category?: string;
  stock?: number;
  badge?: string;
  externalUrl?: string;
};

export const products: Product[] = [
  {
    id: "prod-homekit",
    name: "Home Kit 24/25",
    slug: "home-kit-24-25",
    priceCents: 6999,
    description:
      "Official home jersey for the 2024/25 season featuring gold trim, advanced breathable fabric technology, and moisture-wicking properties. Includes player name and number printing options.",
    imageUrl: "/media/products/product-1.jpg",
    images: [
      {
        url: "/media/products/product-2.jpg",
        alt: "Home kit front view",
        sort: 0,
      },
      {
        url: "/media/products/product-7.jpg",
        alt: "Home kit back view",
        sort: 1,
      },
      { url: "/media/products/product-8.jpg", alt: "Home kit detail", sort: 2 },
    ],
    category: "kits",
    stock: 120,
    badge: "New",
  },
  {
    id: "prod-awaykit",
    name: "Away Kit 24/25",
    slug: "away-kit-24-25",
    priceCents: 6999,
    description:
      "Striking away kit in navy blue with gold accents. Designed for performance with lightweight fabric and enhanced ventilation.",
    imageUrl: "/media/products/product-6.jpg",
    images: [
      { url: "/media/products/product-9.jpg", alt: "Away kit front", sort: 0 },
      { url: "/media/products/product-10.jpg", alt: "Away kit back", sort: 1 },
    ],
    category: "kits",
    stock: 85,
    badge: "New",
  },
  {
    id: "prod-thirdkit",
    name: "Third Kit 24/25",
    slug: "third-kit-24-25",
    priceCents: 6999,
    description:
      "Limited edition third kit featuring a unique pattern inspired by the city's industrial heritage. Black base with metallic gold details.",
    imageUrl: "/media/products/product-9.jpg",
    category: "kits",
    stock: 45,
    badge: "Limited",
  },
  {
    id: "prod-scarf",
    name: "Primus FC Scarf",
    slug: "scarf",
    priceCents: 1999,
    description:
      "Warm and stylish black & gold wool blend scarf. Perfect for matchdays and showing your support in all weather conditions.",
    imageUrl: "/media/products/product-7.jpg",
    category: "accessories",
    stock: 300,
  },
  {
    id: "prod-training",
    name: "Training Top",
    slug: "training-top",
    priceCents: 3999,
    description:
      "Lightweight performance top for practice days. Features moisture-wicking technology and the club crest.",
    imageUrl: "/media/products/product-5.jpg",
    category: "training",
    stock: 80,
  },
  {
    id: "prod-training-jacket",
    name: "Training Jacket",
    slug: "training-jacket",
    priceCents: 5999,
    description:
      "Water-resistant training jacket with thermal lining. Perfect for cold weather training sessions.",
    imageUrl: "/media/products/product-8.jpg",
    category: "training",
    stock: 60,
  },
  {
    id: "prod-cap",
    name: "Primus FC Cap",
    slug: "cap",
    priceCents: 2499,
    description:
      "Adjustable baseball cap with embroidered club logo. Available in black with gold detailing.",
    imageUrl: "/media/products/product-1.jpg",
    category: "accessories",
    stock: 150,
  },
  {
    id: "prod-mug",
    name: "Official Club Mug",
    slug: "club-mug",
    priceCents: 1499,
    description:
      "Ceramic mug featuring the club crest and classic black and gold colors. Holds 350ml.",
    imageUrl: "/media/products/product-6.jpg",
    category: "merchandise",
    stock: 200,
  },
  {
    id: "prod-football",
    name: "Match Football",
    slug: "match-football",
    priceCents: 2999,
    description:
      "Official match ball used in Premier League games. Features high-quality construction for optimal performance.",
    imageUrl: "/media/products/product-1.jpg",
    category: "equipment",
    stock: 75,
  },
  {
    id: "prod-kids-kit",
    name: "Kids Home Kit",
    slug: "kids-home-kit",
    priceCents: 4999,
    description:
      "Junior version of the official home kit. Available in sizes for ages 3-14. Same quality and design as adult version.",
    imageUrl: "/media/products/product-9.jpg",
    category: "kids",
    stock: 90,
    badge: "Popular",
  },
];
