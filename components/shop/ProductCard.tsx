import Image from "next/image";
import Link from "next/link";

export type ProductLike = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  description?: string | null;
  imageUrl?: string | null;
  images?: { url: string; alt?: string | null }[];
  category?: string | null; // Updated to match Prisma schema
  stock?: number;
};

export default function ProductCard({ p }: { p: ProductLike }) {
  const cover = p.images?.[0]?.url || p.imageUrl || "/media/products/scarf.svg";
  const href = `/shop/${p.slug}`;

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 hover:border-brand-gold/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-gold/20">
      <Link href={href} className="block focus:outline-none">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={cover}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          {p.category && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-2 py-1 text-xs font-bold text-black shadow">
              {p.category}
            </span>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-4 lg:p-6">
          <div className="mb-2">
            <h3 className="font-bold text-white line-clamp-1 text-sm lg:text-base">
              {p.name}
            </h3>
            {p.description && (
              <p className="text-white/70 text-xs line-clamp-2 mt-1 leading-relaxed">
                {p.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <div className="text-lg lg:text-xl font-black text-brand-gold">
                {(p.priceCents / 100).toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <div className="text-xs text-white/50">Free Shipping</div>
            </div>

            <button className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 rounded-full bg-white/10 hover:bg-brand-gold hover:text-black p-2 backdrop-blur-sm">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-brand-gold/30 transition-colors duration-300 pointer-events-none" />
      </Link>
    </article>
  );
}
