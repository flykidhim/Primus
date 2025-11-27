import { players } from "@/data/players";
import { products } from "@/data/products";
import { articles } from "@/data/news";
import { media } from "@/data/media";
import { matches } from "@/data/matches";
import { staff } from "@/data/staff";

const useDev = process.env.NEXT_PUBLIC_DATA_MODE === "dev";

export async function getPlayers() {
  if (useDev) return players;
  const { prisma } = await import("@/lib/prisma");
  return prisma.player.findMany({
    include: { photos: { orderBy: { sort: "asc" } } },
    orderBy: [{ number: "asc" }, { name: "asc" }],
  });
}
export async function getPlayerById(id: string) {
  if (useDev) return players.find((p) => p.id === id) ?? null;
  const { prisma } = await import("@/lib/prisma");
  return prisma.player.findUnique({
    where: { id },
    include: { photos: { orderBy: { sort: "asc" } } },
  });
}
export async function getProducts() {
  if (useDev) return products;
  const { prisma } = await import("@/lib/prisma");
  return prisma.product.findMany({
    include: { images: { orderBy: { sort: "asc" } } },
    orderBy: { createdAt: "asc" },
  });
}
export async function getProductBySlug(slug: string) {
  if (useDev) return products.find((p) => p.slug === slug) ?? null;
  const { prisma } = await import("@/lib/prisma");
  return prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { sort: "asc" } } },
  });
}
export async function getArticles() {
  if (useDev) return articles;
  const { prisma } = await import("@/lib/prisma");
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}
export async function getArticleBySlug(slug: string) {
  if (useDev) return articles.find((a) => a.slug === slug) ?? null;
  const { prisma } = await import("@/lib/prisma");
  return prisma.article.findUnique({ where: { slug } });
}
export async function getMedia(category?: string) {
  if (useDev)
    return media
      .filter((m) => !category || m.category === category)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const { prisma } = await import("@/lib/prisma");
  return prisma.media.findMany({
    where: { ...(category ? { category } : {}) },
    orderBy: { createdAt: "desc" },
  });
}
export async function getMediaById(id: string) {
  if (useDev) return media.find((m) => m.id === id) ?? null;
  const { prisma } = await import("@/lib/prisma");
  return prisma.media.findUnique({ where: { id } });
}
export async function getRelatedMedia(
  category: string | undefined,
  excludeId: string
) {
  const all = await getMedia(category);
  return all.filter((m: any) => m.id !== excludeId).slice(0, 6);
}
export async function getMatches() {
  if (useDev) return matches.slice().sort((a, b) => (a.date < b.date ? -1 : 1));
  const { prisma } = await import("@/lib/prisma");
  return prisma.match.findMany({ orderBy: { date: "asc" } });
}
export async function getUpcomingMatch() {
  const all = await getMatches();
  const now = new Date();
  return (
    all.find(
      (m) =>
        (m.status === "SCHEDULED" || m.status === "LIVE") &&
        new Date(m.date) >= now
    ) ?? null
  );
}
export async function getRecentMatch() {
  const all = await getMatches();
  const fts = all
    .filter((m) => m.status === "FT")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return fts[0] ?? null;
}

export async function getStaff() {
  if (useDev) return staff; // use data/staff.ts in dev mode for convenience

  const { prisma } = await import("@/lib/prisma");
  return prisma.staff.findMany({
    orderBy: [{ area: "asc" }, { name: "asc" }],
  });
}
