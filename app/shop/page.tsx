// app/shop/page.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type ShopFilters = { q?: string; cat?: string; page?: string };

export const metadata = { title: "Shop — Primus FC" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopFilters>;
}) {
  const { q } = await searchParams;

  // ✅ Explicitly type the where to satisfy Prisma
  const where: Prisma.ProductWhereInput | undefined = q?.trim()
    ? {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive" as Prisma.QueryMode, // or 'as const'
            },
          },
          {
            description: {
              contains: q,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
        ],
      }
    : undefined;

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Club Shop</h1>
        <form action="/shop" className="hidden sm:flex gap-2">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search products"
            className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
          />
          <button className="btn-primary">Search</button>
        </form>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((p) => {
          const price = (p.priceCents / 100).toLocaleString(undefined, {
            style: "currency",
            currency: process.env.NEXT_PUBLIC_CURRENCY || "USD",
          });
          return (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition block"
            >
              <div className="relative aspect-[4/3]">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="grid place-items-center h-full text-white/50">
                    No image
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="font-semibold line-clamp-2">{p.name}</div>
                <div className="text-sm text-white/70 mt-1">{price}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
