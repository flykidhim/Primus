import Image from "next/image";
import Link from "next/link";
export type ProductLike = { id: string; name: string; slug: string; priceCents: number; description?: string | null; imageUrl?: string | null; images?: { url: string; alt?: string | null }[]; badge?: string; externalUrl?: string; category?: string; };
export default function ProductCard({ p }: { p: ProductLike }) {
  const cover = p.images?.[0]?.url || p.imageUrl || "/media/products/scarf.svg";
  const href = p.externalUrl || `/shop/${p.slug}`;
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glass hover:border-brand-gold/40 transition">
      <Link href={href} className="block focus:outline-none">
        <div className="relative aspect-[3/4]">
          <Image src={cover} alt={p.name} fill sizes="(max-width:768px) 50vw, (max-width:1280px) 25vw, 20vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
          {p.badge && <span className="absolute left-3 top-3 rounded-md bg-brand-gold px-2 py-1 text-xs font-semibold text-black shadow">{p.badge}</span>}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-3">
          <h3 className="line-clamp-1 font-semibold">{p.name}</h3>
          {p.description && <p className="mt-1 line-clamp-2 text-xs text-white/70">{p.description}</p>}
          <div className="mt-2 flex items-center justify-between">
            <div className="font-bold text-brand-gold">{(p.priceCents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" })}</div>
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/90 group-hover:border-brand-gold/40">
              View
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path stroke="currentColor" strokeWidth="2" d="M8 5l8 7-8 7" /></svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
