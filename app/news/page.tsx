// /app/news/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/repos";

export const metadata = { title: "News — Primus FC" };

export default async function NewsPage() {
  const news = await getArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="mb-6 text-3xl font-extrabold">Latest News</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((a) => (
          <Link
            key={a.id}
            href={`/news/${a.slug}`}
            className="group overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={a.coverUrl || "/media/gallery/placeholder.jpg"}
                alt={a.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                {a.category || "Club News"}
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold">{a.title}</h3>
              <p className="line-clamp-2 text-sm text-gray-600">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
