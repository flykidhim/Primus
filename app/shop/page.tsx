import { getProducts } from "@/lib/repos";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Official Store — Primus FC",
  description:
    "Shop official Primus FC merchandise including kits, training wear, accessories, and match tickets.",
};

type SP = { cat?: string };

const CATS = ["All", "Kits", "Training", "Accessories", "Tickets"];

// ✅ Next.js 15: searchParams is a Promise in server components
export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  const sp = await (searchParams ?? Promise.resolve<SP>({}));
  const catLc = (sp.cat ?? "All").toLowerCase();

  const products = await getProducts();
  const filtered =
    catLc === "all"
      ? products
      : products.filter((p: any) =>
          ((p.category ?? "all") as string).toLowerCase().includes(catLc)
        );

  // Category counts (case-insensitive)
  const getCategoryCount = (category: string) => {
    const target = category.toLowerCase();
    if (target === "all") return products.length;
    return products.filter(
      (p: any) => ((p.category ?? "") as string).toLowerCase() === target
    ).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Official Store
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Wear The{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Pride
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Official Primus FC merchandise, kits, and accessories. Every
              purchase supports our youth development programs and community
              initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {products.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Products
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {
                  products.filter(
                    (p: any) =>
                      ((p.category ?? "") as string).toLowerCase() === "kits"
                  ).length
                }
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Kits
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                Free
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Shipping
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              {CATS.map((c) => {
                const active = c.toLowerCase() === catLc;
                const count = getCategoryCount(c);

                return (
                  <Link
                    key={c}
                    href={
                      c === "All" ? "/shop" : `/shop?cat=${c.toLowerCase()}`
                    }
                    className={`group relative px-5 py-3 rounded-full border text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-brand-gold text-black border-brand-gold shadow-lg shadow-brand-gold/30"
                        : "bg-white/5 text-white/90 border-white/20 hover:bg-white/10 hover:border-white/30"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {c}
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          active ? "bg-black/20" : "bg-white/10"
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Sort Options (UI only for now) */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">Sort by:</span>
              <select className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30">
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((p: any) => (
                <div
                  key={p.id}
                  className="transform hover:scale-105 transition-transform duration-500"
                >
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Products Found
              </h3>
              <p className="text-white/70 max-w-md mx-auto">
                No products available in this category yet. Check back soon for
                new merchandise!
              </p>
            </div>
          )}

          {/* Shop Benefits */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-brand-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Secure Payment</h4>
              <p className="text-white/70 text-sm">
                All transactions are secure and encrypted
              </p>
            </div>

            <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-brand-gold"
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
              </div>
              <h4 className="font-semibold text-white mb-2">
                Support Our Mission
              </h4>
              <p className="text-white/70 text-sm">
                Proceeds fund youth development programs
              </p>
            </div>

            <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-brand-gold"
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
              </div>
              <h4 className="font-semibold text-white mb-2">Free Shipping</h4>
              <p className="text-white/70 text-sm">
                Free delivery on all orders over $50
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
              Support Our{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Every purchase helps us discover and develop young African
              football talent from underserved communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 rounded-full bg-brand-gold text-black font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-brand-gold/30"
              >
                Learn About Our Mission
                <svg
                  className="w-5 h-5 ml-2"
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
              <Link
                href="/tickets"
                className="inline-flex items-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Get Match Tickets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
