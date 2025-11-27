// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

// Import your TypeScript data files
import { players } from "../data/players";
import { media } from "../data/media";
import { articles } from "../data/news";
import { products } from "../data/products";
import { matches } from "../data/matches";
import { staff } from "../data/staff"; // 👈 you were missing this

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Primus FC database...");

  // ⚠️ FIRST TIME ONLY (safe if DB is empty).
  // Once you start editing content in PROD via admin, do NOT run this with
  // deleteMany() against the live DB again or it will wipe your changes.
  console.log("🧹 Clearing existing data...");
  await prisma.playerImage.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.match.deleteMany();
  await prisma.media.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();
  await prisma.player.deleteMany();
  await prisma.staff.deleteMany(); // 👈 clear staff too

  // 1. Players + PlayerImage (photos)
  console.log("👟 Seeding players...");
  for (const p of players) {
    await prisma.player.create({
      data: {
        id: p.id,
        name: p.name,
        position: p.position,
        number: p.number,
        nationality: p.nationality ?? null,
        heightCm: p.heightCm ?? null,
        bio: p.bio ?? null,
        photoUrl: p.photoUrl ?? null,
        appearances: p.appearances ?? 0,
        goals: p.goals ?? 0,
        assists: p.assists ?? 0,
        photos: p.photos
          ? {
              create: p.photos.map((ph, idx) => ({
                url: ph.url,
                alt: ph.alt ?? null,
                sort: ph.sort ?? idx,
              })),
            }
          : undefined,
      },
    });
  }

  // 2. Media
  console.log("📸 Seeding media...");
  for (const m of media) {
    await prisma.media.create({
      data: {
        id: m.id,
        title: m.title,
        type: m.type, // "photo" | "video"
        url: m.url,
        posterUrl: m.posterUrl ?? null,
        category: m.category ?? null,
        description: m.description ?? null,
        tags: m.tags ?? [],
        createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
      },
    });
  }

  // 3. Articles / News
  console.log("📰 Seeding articles...");
  for (const a of articles) {
    await prisma.article.create({
      data: {
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt ?? null,
        content: a.content,
        coverUrl: a.coverUrl ?? null,
        category: a.category ?? "Club News",
        published: a.published ?? true,
        createdAt: a.createdAt ? new Date(a.createdAt) : undefined,
      },
    });
  }

  // 4. Products + ProductImage
  console.log("🛒 Seeding products...");
  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        priceCents: p.priceCents,
        imageUrl: p.imageUrl ?? null,
        description: p.description ?? null,
        stock: p.stock ?? 0,
        badge: p.badge ?? null,
        category: p.category ?? null,
        images: p.images
          ? {
              create: p.images.map((img, idx) => ({
                url: img.url,
                alt: img.alt ?? null,
                sort: img.sort ?? idx,
              })),
            }
          : undefined,
      },
    });
  }

  // 5. Matches
  console.log("📅 Seeding matches...");
  for (const m of matches) {
    await prisma.match.create({
      data: {
        id: m.id,
        date: new Date(m.date),
        competition: m.competition,
        home: m.home,
        away: m.away,
        venue: m.venue ?? null,
        status: m.status,
        homeScore: m.homeScore ?? 0,
        awayScore: m.awayScore ?? 0,
        report: m.report ?? null,
      },
    });
  }

  // 6. Staff 👈 NEW
  console.log("👔 Seeding staff...");
  for (const s of staff) {
    await prisma.staff.create({
      data: {
        id: s.id, // overrides default(cuid()), which is fine
        name: s.name,
        role: s.role,
        area: s.area ?? null,
        bio: s.bio ?? null,
        photoUrl: s.photoUrl ?? null,
      },
    });
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
