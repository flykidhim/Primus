// app/media/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMediaById, getRelatedMedia } from "@/lib/repos";
import VideoPlayer from "@/components/media/VideoPlayer";

type MediaItem = {
  id: string;
  title: string;
  url: string;
  posterUrl?: string | null;
  type: "photo" | "video" | string;
  category?: string | null;
  description?: string | null;
  tags?: string[] | null;
  createdAt?: string | Date | null;
};

export default async function MediaDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Next 15 expects this

  const item = (await getMediaById(id)) as MediaItem | null;
  if (!item) return notFound();

  const related = (await getRelatedMedia(
    item.category ?? "All",
    item.id
  )) as MediaItem[];

  const isVideo =
    item.type === "video" ||
    (typeof item.url === "string" &&
      (item.url.endsWith(".mp4") ||
        item.url.endsWith(".webm") ||
        item.url.includes("youtube.com") ||
        item.url.includes("youtu.be")));

  return (
    <div className="space-y-6">
      <Link href="/media" className="text-white/70 hover:text-white text-sm">
        ← Back to media
      </Link>

      <article className="space-y-4">
        {isVideo ? (
          <VideoPlayer
            src={item.url}
            poster={item.posterUrl ?? undefined}
            autoPlay={false}
          />
        ) : (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold">{item.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
            {item.category && (
              <span className="px-2 py-0.5 rounded-md bg-white/10">
                {item.category}
              </span>
            )}
            {item.createdAt && (
              <span>
                {new Date(String(item.createdAt)).toLocaleDateString()}
              </span>
            )}
            {isVideo && (
              <span className="px-2 py-0.5 rounded-md bg-brand-gold text-black">
                Video
              </span>
            )}
          </div>
        </header>

        {item.description && (
          <p className="text-white/80">{item.description}</p>
        )}

        {item.tags?.length ? (
          <ul className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <li
                key={t}
                className="text-xs px-2 py-1 rounded-lg border border-white/10 bg-white/5"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </article>

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Related</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {related.map((m) => {
              const thumb = m.type === "video" ? m.posterUrl || m.url : m.url;
              const relIsVideo =
                m.type === "video" ||
                (typeof m.url === "string" &&
                  (m.url.endsWith(".mp4") ||
                    m.url.endsWith(".webm") ||
                    m.url.includes("youtube.com") ||
                    m.url.includes("youtu.be")));
              return (
                <Link
                  key={m.id}
                  href={`/media/${m.id}`}
                  className="group block relative"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={thumb || m.url}
                      alt={m.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width:768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="text-sm font-semibold line-clamp-1">
                        {m.title}
                      </div>
                      {m.category && (
                        <div className="text-xs text-white/70">
                          {m.category}
                        </div>
                      )}
                    </div>
                  </div>
                  {relIsVideo && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="h-8 w-8 rounded-full bg-black/70 grid place-items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
