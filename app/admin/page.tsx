import { prisma } from "@/lib/prisma";

export default async function AdminHome() {
  const [players, products, media, articles] = await Promise.all([
    prisma.player.count(),
    prisma.product.count(),
    prisma.media.count(),
    prisma.article.count(),
  ]);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card name="Players" n={players} />
        <Card name="Products" n={products} />
        <Card name="Media" n={media} />
        <Card name="Articles" n={articles} />
      </div>
    </div>
  );
}

function Card({ name, n }: { name: string; n: number }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-white/70 text-sm">{name}</div>
      <div className="text-3xl font-extrabold">{n}</div>
    </div>
  );
}
