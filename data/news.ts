export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverUrl?: string;
  category?: string;
  published?: boolean;
  createdAt?: string;
};
export const articles: Article[] = [
  {
    id: "a-signing",
    title: "New Signing Announced",
    slug: "new-signing-announced",
    excerpt: "We welcome a new forward to Primus FC.",
    content: "Full article body here...",
    coverUrl: "/media/gallery/gallery-1.jpg",
    category: "Club News",
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "a-report-3-1",
    title: "Match Report: 3–1 Win",
    slug: "match-report-3-1-win",
    excerpt: "Dominant home victory for Primus FC.",
    content: "Detailed report...",
    coverUrl: "/media/gallery/gallery-2.jpg",
    category: "Match Reports",
    published: true,
    createdAt: new Date().toISOString(),
  },
];
