import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/repos";

export const metadata = {
  title: "News — Primus FC",
  description:
    "Stay updated with the latest news, match reports, and announcements from Primus FC.",
};

export default async function NewsPage() {
  const news = await getArticles();

  // Group news by category for the filter
  const categories = [
    "All",
    "Club News",
    "Match Reports",
    "Academy",
    "Community",
    "Transfers",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Latest Updates
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Primus{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                News
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Stay informed with the latest club announcements, match reports,
              transfer news, and stories from our academy and community
              programs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Featured Article (if any) */}
          {news.length > 0 && (
            <div className="mb-12 lg:mb-16">
              <Link
                href={`/news/${news[0].slug}`}
                className="group block rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-slate-800 to-purple-900/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-video lg:aspect-square">
                    <Image
                      src={news[0].coverUrl || "/media/gallery/placeholder.jpg"}
                      alt={news[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-brand-gold text-black text-sm font-bold">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-sm font-semibold">
                        {news[0].category || "Club News"}
                      </span>
                      <span className="text-white/60 text-sm">
                        {news[0].createdAt
                          ? new Date(news[0].createdAt).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-4xl font-black text-white mb-4 group-hover:text-brand-gold transition-colors">
                      {news[0].title}
                    </h2>
                    {news[0].excerpt && (
                      <p className="text-lg text-white/80 leading-relaxed mb-6">
                        {news[0].excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-brand-gold font-semibold group-hover:gap-3 transition-all">
                      Read Full Story
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* News Grid */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-6">
              Latest News
            </h2>

            {news.length > 1 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {news.slice(1).map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group block transform hover:scale-105 transition-all duration-500"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900 group-hover:border-brand-gold/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-gold/20">
                      {/* Article Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={
                            article.coverUrl || "/media/gallery/placeholder.jpg"
                          }
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-semibold border border-white/20">
                            {article.category || "News"}
                          </span>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-4 lg:p-6">
                        <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                          <span>{article.category || "Club News"}</span>
                          <span>
                            {article.createdAt
                              ? new Date(article.createdAt).toLocaleDateString()
                              : "Recent"}
                          </span>
                        </div>

                        <h3 className="font-bold text-white text-lg mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors">
                          {article.title}
                        </h3>

                        {article.excerpt && (
                          <p className="text-white/70 text-sm line-clamp-3 mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>
                        )}

                        <div className="flex items-center text-brand-gold text-sm font-semibold group-hover:gap-2 transition-all">
                          Read More
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : news.length === 0 ? (
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
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0 0h4m-4 0l4-4m-4 4l4 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No News Yet
                </h3>
                <p className="text-white/70 max-w-md mx-auto">
                  We're working on bringing you the latest updates. Check back
                  soon for news and announcements.
                </p>
              </div>
            ) : null}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-800 to-purple-900/30 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-black text-white mb-4">
                  Never Miss an Update
                </h3>
                <p className="text-white/70 mb-6">
                  Subscribe to our newsletter and be the first to know about
                  match results, player signings, and community events.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30"
                  />
                  <button className="px-6 py-3 rounded-2xl bg-brand-gold text-black font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                  <div className="text-3xl font-black text-brand-gold">
                    {news.length}+
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">
                      Articles Published
                    </div>
                    <div className="text-white/60 text-sm">And counting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
