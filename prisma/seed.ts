import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.media.deleteMany(),
    prisma.product.deleteMany(),
    prisma.article.deleteMany(),
    prisma.match.deleteMany(),
    prisma.player.deleteMany(),
    prisma.standing.deleteMany(),
  ]);

  await prisma.user.upsert({
    where: { email: "admin@primusfc.local" },
    update: {},
    create: {
      email: "admin@primusfc.local",
      password: "$2b$10$X9y7b1yT8VdN2oTgE9JXn.PVq2mWm8f3i5Q9fM4uXnq8dI2q7z0wa",
      name: "Site Admin",
      role: "ADMIN",
    },
  });

  // Local player images
  const P = (i: number) => `/media/players/player-${i}.jpg`;
  await prisma.player.createMany({
    data: [
      {
        name: "Kwame Asare",
        position: "GK",
        number: 1,
        nationality: "GHA",
        heightCm: 190,
        bio: "Commanding shot-stopper.",
        photoUrl: P(1),
        appearances: 26,
        goals: 0,
        assists: 0,
      },
      {
        name: "Samuel Boateng",
        position: "DF",
        number: 2,
        nationality: "GHA",
        heightCm: 188,
        bio: "Aerially dominant CB.",
        photoUrl: P(2),
        appearances: 30,
        goals: 2,
        assists: 1,
      },
      {
        name: "Peter Mensah",
        position: "DF",
        number: 3,
        nationality: "GHA",
        heightCm: 183,
        bio: "Aggressive tackler.",
        photoUrl: P(3),
        appearances: 29,
        goals: 1,
        assists: 2,
      },
      {
        name: "Kofi Asamoah",
        position: "DF",
        number: 4,
        nationality: "GHA",
        heightCm: 184,
        bio: "Ball-playing CB.",
        photoUrl: P(4),
        appearances: 27,
        goals: 1,
        assists: 3,
      },
      {
        name: "Kojo Owusu",
        position: "MF",
        number: 6,
        nationality: "GHA",
        heightCm: 178,
        bio: "Ball-winner.",
        photoUrl: P(5),
        appearances: 28,
        goals: 1,
        assists: 4,
      },
      {
        name: "Luis Romero",
        position: "MF",
        number: 8,
        nationality: "ESP",
        heightCm: 176,
        bio: "Creative playmaker.",
        photoUrl: P(6),
        appearances: 31,
        goals: 7,
        assists: 11,
      },
      {
        name: "John Mensah",
        position: "FW",
        number: 9,
        nationality: "GHA",
        heightCm: 182,
        bio: "Prolific striker.",
        photoUrl: P(7),
        appearances: 25,
        goals: 16,
        assists: 4,
      },
      {
        name: "Seth Amponsah",
        position: "MF",
        number: 10,
        nationality: "GHA",
        heightCm: 175,
        bio: "Attacking mid.",
        photoUrl: P(8),
        appearances: 24,
        goals: 6,
        assists: 8,
      },
      {
        name: "Yao Mensimah",
        position: "FW",
        number: 11,
        nationality: "GHA",
        heightCm: 184,
        bio: "Clinical finisher.",
        photoUrl: P(9),
        appearances: 22,
        goals: 9,
        assists: 3,
      },
      {
        name: "Felix Donkor",
        position: "DF",
        number: 12,
        nationality: "GHA",
        heightCm: 180,
        bio: "Pacey fullback.",
        photoUrl: P(10),
        appearances: 27,
        goals: 0,
        assists: 5,
      },
      {
        name: "Richard Appiah",
        position: "GK",
        number: 13,
        nationality: "GHA",
        heightCm: 192,
        bio: "Lightning reflexes.",
        photoUrl: P(11),
        appearances: 8,
        goals: 0,
        assists: 0,
      },
      {
        name: "Eric Owusu",
        position: "MF",
        number: 14,
        nationality: "GHA",
        heightCm: 180,
        bio: "Box-to-box engine.",
        photoUrl: P(12),
        appearances: 26,
        goals: 3,
        assists: 7,
      },
      {
        name: "Suleiman Tijani",
        position: "MF",
        number: 17,
        nationality: "GHA",
        heightCm: 179,
        bio: "Set-piece specialist.",
        photoUrl: P(13),
        appearances: 19,
        goals: 4,
        assists: 6,
      },
      {
        name: "Daniel Kusi",
        position: "FW",
        number: 7,
        nationality: "GHA",
        heightCm: 177,
        bio: "1v1 wide forward.",
        photoUrl: P(14),
        appearances: 20,
        goals: 5,
        assists: 5,
      },
    ],
  });

  const now = new Date();
  const d = (days: number) => new Date(now.getTime() + days * 86400000);
  await prisma.match.createMany({
    data: [
      {
        date: d(3),
        competition: "Premier League",
        home: "Primus FC",
        away: "Rival FC",
        venue: "Primus Arena",
        status: "SCHEDULED",
      },
      {
        date: d(-4),
        competition: "Premier League",
        home: "Primus FC",
        away: "City United",
        venue: "Primus Arena",
        status: "FT",
        homeScore: 3,
        awayScore: 1,
        report: "Dominant press and clinical finishing.",
      },
      {
        date: d(10),
        competition: "Cup",
        home: "Primus FC",
        away: "Lions",
        venue: "Primus Arena",
        status: "SCHEDULED",
      },
      {
        date: d(-12),
        competition: "Premier League",
        home: "Eagles",
        away: "Primus FC",
        venue: "Eagles Arena",
        status: "FT",
        homeScore: 0,
        awayScore: 2,
        report: "Compact block, swift counters.",
      },
    ],
  });

  await prisma.article.createMany({
    data: [
      {
        title: "Welcome to Primus FC",
        slug: "welcome-to-primus-fc",
        excerpt: "Official site is live.",
        content:
          "<p>We’re delighted to launch our new home for Primus FC fans.</p>",
        coverUrl: "/brand/hero.jpg",
      },
      {
        title: "New Signing Announced",
        slug: "new-signing-announced",
        excerpt: "A forward joins Primus FC.",
        content: "<p>Full article body here...</p>",
        coverUrl: "/media/gallery/gallery-1.jpg",
      },
      {
        title: "Match Report: 3-1 Win",
        slug: "match-report-3-1-win",
        excerpt: "Convincing home victory.",
        content: "<p>Detailed report...</p>",
        coverUrl: "/media/gallery/gallery-2.jpg",
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Home Kit 24/25",
        slug: "home-kit-24-25",
        priceCents: 6999,
        imageUrl: "/media/products/product-1.jpg",
        description: "Official home jersey.",
        stock: 120,
      },
      {
        name: "Away Kit 24/25",
        slug: "away-kit-24-25",
        priceCents: 6999,
        imageUrl: "/media/products/product-2.jpg",
        description: "Official away jersey.",
        stock: 100,
      },
      {
        name: "Third Kit 24/25",
        slug: "third-kit-24-25",
        priceCents: 6999,
        imageUrl: "/media/products/product-3.jpg",
        description: "Third kit special.",
        stock: 80,
      },
      {
        name: "Scarf",
        slug: "scarf",
        priceCents: 1999,
        imageUrl: "/media/products/product-4.jpg",
        description: "Warm and stylish.",
        stock: 300,
      },
      {
        name: "Cap",
        slug: "cap",
        priceCents: 1599,
        imageUrl: "/media/products/product-5.jpg",
        description: "Embroidered crest.",
        stock: 200,
      },
      {
        name: "Training Top",
        slug: "training-top",
        priceCents: 3999,
        imageUrl: "/media/products/product-6.jpg",
        description: "Comfort fit.",
        stock: 150,
      },
    ],
  });

  await prisma.media.createMany({
    data: [
      {
        title: "Goal Celebration",
        type: "photo",
        url: "/media/gallery/gallery-1.jpg",
      },
      {
        title: "Training Session",
        type: "photo",
        url: "/media/gallery/gallery-2.jpg",
      },
      {
        title: "Fans at Home",
        type: "photo",
        url: "/media/gallery/gallery-3.jpg",
      },
      {
        title: "Warm-up Drills",
        type: "photo",
        url: "/media/gallery/gallery-4.jpg",
      },
    ],
  });

  const table = [
    ["United Town", 30, 20, 6, 4, 61, 28],
    ["Primus FC", 30, 19, 6, 5, 58, 30],
    ["Rival FC", 30, 18, 5, 7, 54, 33],
    ["City United", 30, 16, 8, 6, 49, 31],
    ["Harbor FC", 30, 13, 9, 8, 41, 36],
  ];
  await prisma.standing.createMany({
    data: table.map((t, i) => ({
      team: t[0] as string,
      played: t[1] as number,
      won: t[2] as number,
      drawn: t[3] as number,
      lost: t[4] as number,
      gf: t[5] as number,
      ga: t[6] as number,
      gd: (t[5] as number) - (t[6] as number),
      points: (t[2] as number) * 3 + (t[3] as number),
      position: i + 1,
      season: "2025/26",
    })),
  });

  console.log("Primus FC seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
