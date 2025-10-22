// app/shop/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
// Optional: if you added the cart island earlier
import AddToCart from "@/components/cart/AddToCart";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true, imageUrl: true },
  });
  if (!p) return { title: "Product — Shop" };
  return {
    title: `${p.name} — Shop`,
    description: p.description ?? undefined,
    openGraph: {
      title: p.name,
      description: p.description ?? undefined,
      images: p.imageUrl ? [{ url: p.imageUrl }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return notFound();

  const currency = process.env.NEXT_PUBLIC_CURRENCY || "USD";
  const priceLabel = (product.priceCents / 100).toLocaleString(undefined, {
    style: "currency",
    currency,
  });

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waHref =
    waNumber &&
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      `Hi, I'd like to buy ${product.name} (${priceLabel}).`
    )}`;

  return (
    <div className="space-y-6">
      <Link href="/shop" className="text-white/70 hover:text-white text-sm">
        ← Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="grid place-items-center h-full text-white/50">
              No image
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            {product.name}
          </h1>

          {product.description && (
            <p className="text-white/85 leading-7">{product.description}</p>
          )}

          <div className="text-xl font-bold text-brand-gold">{priceLabel}</div>

          <div className="flex flex-wrap items-center gap-3">
            {/* WhatsApp checkout (no onClick here) */}
            {waHref ? (
              <a
                href={waHref}
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Buy via WhatsApp
              </a>
            ) : (
              <span
                className="btn-outline cursor-not-allowed"
                aria-disabled="true"
                title="Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env to enable WhatsApp checkout"
              >
                Buy via WhatsApp (disabled)
              </span>
            )}

            {/* Optional: client cart island (safe to render in a Server page) */}
            <AddToCart
              id={product.id}
              name={product.name}
              priceCents={product.priceCents}
              imageUrl={product.imageUrl}
            />
          </div>

          <div className="text-sm text-white/60">
            Stock: {product.stock ?? 0}
            {product.stock <= 0 && (
              <span className="text-red-400 ml-2">Out of stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
