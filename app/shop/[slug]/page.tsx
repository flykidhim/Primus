import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true, imageUrl: true },
  });
  if (!product) return { title: "Product — Primus FC Shop" };

  return {
    title: `${product.name} — Primus FC Shop`,
    description:
      product.description || `Official Primus FC merchandise - ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { sort: "asc" },
      },
    },
  });

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
      `Hello Primus FC! I'm interested in purchasing:\n\n*${product.name}*\nPrice: ${priceLabel}\n\nPlease provide more details about availability and purchasing process.`
    )}`;

  // Get all images including the main image
  const allImages = [
    ...(product.imageUrl
      ? [{ url: product.imageUrl, alt: product.name, id: "main" }]
      : []),
    ...product.images,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/shop"
          className="group inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Shop
        </Link>
      </div>

      {/* Product Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl">
                {allImages[0]?.url ? (
                  <Image
                    src={allImages[0].url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="grid place-items-center h-full text-white/50">
                    <svg
                      className="w-20 h-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Badge - Using category as badge if no badge field */}
                {product.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-brand-gold text-black text-sm font-bold">
                      {product.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, index) => (
                    <button
                      key={img.id}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all"
                    >
                      <Image
                        src={img.url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {product.category && (
                    <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-sm font-semibold">
                      {product.category}
                    </span>
                  )}
                  {product.stock && product.stock > 0 ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  {product.name}
                </h1>

                <div className="text-3xl font-black text-brand-gold mb-2">
                  {priceLabel}
                </div>

                {product.stock && (
                  <div className="text-sm text-white/60">
                    {product.stock > 0
                      ? `${product.stock} units available`
                      : "Currently out of stock"}
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-invert">
                  <p className="text-white/80 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Product Details */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/70">Category</div>
                      <div className="font-semibold text-white">
                        {product.category || "General"}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/70">Availability</div>
                      <div className="font-semibold text-white">
                        {product.stock && product.stock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/70">Shipping</div>
                      <div className="font-semibold text-white">
                        Free Worldwide
                      </div>
                    </div>
                    <div>
                      <div className="text-white/70">Delivery</div>
                      <div className="font-semibold text-white">
                        3-5 Business Days
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase CTA */}
              <div className="space-y-4">
                {waHref && product.stock && product.stock > 0 ? (
                  <>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-600/30 flex items-center justify-center gap-3"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.55-8.485" />
                      </svg>
                      Purchase via WhatsApp
                    </a>
                    <p className="text-center text-white/60 text-sm">
                      We'll respond within 2 hours to confirm your order
                    </p>
                  </>
                ) : (
                  <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white/70 mb-4">
                      {!waHref
                        ? "WhatsApp checkout is currently unavailable. Please contact us directly for purchases."
                        : "This item is currently out of stock. Check back soon!"}
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 rounded-full bg-brand-gold text-black font-semibold hover:bg-yellow-400 transition-all"
                    >
                      Contact Us
                    </a>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <svg
                    className="w-6 h-6 text-brand-gold mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <div className="text-xs text-white/70">Free Shipping</div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <svg
                    className="w-6 h-6 text-brand-gold mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-xs text-white/70">Supports Youth</div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <svg
                    className="w-6 h-6 text-brand-gold mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <div className="text-xs text-white/70">Secure Payment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 lg:py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-black text-white">
                You Might{" "}
                <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                  Also Like
                </span>
              </h2>
              <Link
                href="/shop"
                className="group inline-flex items-center text-brand-gold hover:text-yellow-400 transition-colors font-semibold"
              >
                View All Products
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* This would typically come from your database */}
              <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">
                  More {product.category}
                </h3>
                <p className="text-white/60 text-xs">
                  Explore our full collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
