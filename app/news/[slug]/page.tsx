// app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// ---------- Optional SEO (works with Next 15 Promise-based params)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, coverUrl: true },
  });
  if (!article) return { title: "News" };
  return {
    title: `${article.title} — News`,
    description: article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.coverUrl ? [{ url: article.coverUrl }] : undefined,
    },
  };
}

// ---------- Page
export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Next 15 expects Promise + await

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return notFound();

  const related = await prisma.article.findMany({
    where: { published: true, NOT: { slug } },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      coverUrl: true,
      createdAt: true,
    },
  });

  const createdAt = article.createdAt
    ? new Date(String(article.createdAt)).toLocaleDateString()
    : "";

  return (
    <div className="space-y-6">
      <Link href="/news" className="text-white/70 hover:text-white text-sm">
        ← Back to news
      </Link>

      <article className="space-y-4">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            {article.title}
          </h1>
          <div className="text-sm text-white/70">{createdAt}</div>
        </header>

        {article.coverUrl && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={article.coverUrl}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {article.excerpt && (
          <p className="text-lg text-white/85">{article.excerpt}</p>
        )}

        {/* Simple content renderer. Replace with MDX/markdown if you use it */}
        <div className="prose prose-invert max-w-none">
          {article.content.split(/\n{2,}/g).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Related</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((n) => (
              <Link
                key={n.id}
                href={`/news/${n.slug}`}
                className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition block"
              >
                {n.coverUrl && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={n.coverUrl}
                      alt={n.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="p-3">
                  <div className="font-semibold line-clamp-2">{n.title}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {new Date(String(n.createdAt)).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
