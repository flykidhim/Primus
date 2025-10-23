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
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, coverUrl: true, category: true },
  });
  if (!article) return { title: "News — Primus FC" };

  return {
    title: `${article.title} — Primus FC`,
    description:
      article.excerpt ||
      `Read the latest ${article.category?.toLowerCase()} from Primus FC`,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.coverUrl ? [{ url: article.coverUrl }] : undefined,
      type: "article",
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return notFound();

  const related = await prisma.article.findMany({
    where: {
      published: true,
      NOT: { slug },
      category: article.category, // Get related articles from same category
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const createdAt = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/news"
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
          Back to News
        </Link>
      </div>

      {/* Article Content */}
      <article className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8 lg:mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-sm font-semibold">
                  {article.category || "Club News"}
                </span>
                <span className="text-white/60 text-sm">{createdAt}</span>
                <span className="text-white/60 text-sm">•</span>
                <span className="text-white/60 text-sm">5 min read</span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-xl text-white/80 leading-relaxed border-l-4 border-brand-gold pl-4 py-2">
                  {article.excerpt}
                </p>
              )}
            </header>

            {/* Featured Image */}
            {article.coverUrl && (
              <div className="relative aspect-video lg:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 mb-8 lg:mb-12 shadow-2xl">
                <Image
                  src={article.coverUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="prose-headings:text-white prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-white/80 prose-ol:text-white/80 prose-strong:text-white prose-blockquote:border-brand-gold prose-blockquote:text-white/70 prose-a:text-brand-gold hover:prose-a:text-yellow-400">
                {article.content
                  .split("\n")
                  .map((paragraph, index) =>
                    paragraph.trim() ? (
                      <p key={index}>{paragraph}</p>
                    ) : (
                      <br key={index} />
                    )
                  )}
              </div>
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-brand-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Written by</div>
                    <div className="font-semibold text-white">
                      Primus FC Media Team
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white/70">Share:</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-110 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-black hover:bg-gray-900 transition-all transform hover:scale-110 flex items-center justify-center border border-white/20">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-black text-white">
                  More{" "}
                  <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                    Stories
                  </span>
                </h2>
                <Link
                  href="/news"
                  className="group inline-flex items-center text-brand-gold hover:text-yellow-400 transition-colors font-semibold"
                >
                  View All News
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

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group block transform hover:scale-105 transition-all duration-500"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900 group-hover:border-brand-gold/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-gold/20">
                      {/* Article Image */}
                      <div className="relative aspect-video overflow-hidden">
                        {article.coverUrl && (
                          <Image
                            src={article.coverUrl}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-semibold border border-white/20">
                            {article.category || "News"}
                          </span>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-4">
                        <div className="text-xs text-white/60 mb-2">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </div>

                        <h3 className="font-bold text-white text-sm mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors">
                          {article.title}
                        </h3>

                        {article.excerpt && (
                          <p className="text-white/70 text-xs line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        )}

                        <div className="flex items-center text-brand-gold text-xs font-semibold mt-3 group-hover:gap-1 transition-all">
                          Read More
                          <svg
                            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
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
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-800 to-purple-900/30 border border-white/10">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Never Miss a Story
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about match
                results, player signings, and exclusive Primus FC content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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
          </div>
        </div>
      </section>
    </div>
  );
}
