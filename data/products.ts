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
    description: "Official home jersey — gold trim, breathable fabric.",
    imageUrl: "/media/products/product-5.jpg",
    images: [
      { url: "/media/products/product-4.jpg", sort: 0 },
      { url: "/media/products/product-7.jpg", sort: 1 },
    ],
    category: "kits",
    stock: 120,
    badge: "New",
  },
  {
    id: "prod-scarf",
    name: "Primus Scarf",
    slug: "scarf",
    priceCents: 1999,
    description: "Warm and stylish black & gold.",
    imageUrl: "/media/products/product-7.jpg",
    category: "accessories",
    stock: 300,
  },
  {
    id: "prod-training",
    name: "Training Top",
    slug: "training-top",
    priceCents: 3999,
    description: "Lightweight performance top for practice days.",
    imageUrl: "/media/products/product-5.jpg",
    category: "training",
    stock: 80,
  },
];
