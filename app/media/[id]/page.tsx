// app/media/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMediaById, getRelatedMedia } from "@/lib/repos";
import VideoPlayer from "@/components/media/VideoPlayer";

// ✅ Loosen the prop typing here so we don't fight Next's generated PageProps
export default async function MediaDetail(props: any) {
  const { id } = props.params;

  const item = await getMediaById(id);
  if (!item) return notFound();

  const related = await getRelatedMedia(
    (item as any).category,
    (item as any).id
  );
  const isVideo = (item as any).type === "video";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/media"
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
          Back to Gallery
        </Link>
      </div>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Media Display */}
            <div className="mb-8 lg:mb-12">
              {isVideo ? (
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                  <VideoPlayer
                    src={(item as any).url}
                    poster={(item as any).posterUrl}
                    autoPlay={true}
                  />
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-800 shadow-2xl">
                  {/* 🔥 Bigger, viewport-based height so it feels like a full media view */}
                  <div className="relative h-[52vh] sm:h-[58vh] lg:h-[70vh] min-h-[280px]">
                    <Image
                      src={(item as any).url}
                      alt={(item as any).title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Media Information */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <header className="mb-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isVideo
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {isVideo ? "VIDEO" : "PHOTO"}
                    </span>
                    {(item as any).category && (
                      <span className="px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-sm font-semibold">
                        {(item as any).category}
                      </span>
                    )}
                    {(item as any).createdAt && (
                      <span className="text-white/60 text-sm">
                        {new Date((item as any).createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-black text-white mb-4">
                    {(item as any).title}
                  </h1>

                  {(item as any).description && (
                    <p className="text-lg text-white/80 leading-relaxed mb-6">
                      {(item as any).description}
                    </p>
                  )}
                </header>

                {/* Extra Details */}
                {(item as any).location ||
                (item as any).match ||
                (item as any).season ? (
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {(item as any).match && (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-sm font-semibold text-white/70 mb-1">
                          Match
                        </h3>
                        <p className="text-white">{(item as any).match}</p>
                      </div>
                    )}
                    {(item as any).season && (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-sm font-semibold text-white/70 mb-1">
                          Season
                        </h3>
                        <p className="text-white">{(item as any).season}</p>
                      </div>
                    )}
                    {(item as any).location && (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-sm font-semibold text-white/70 mb-1">
                          Location
                        </h3>
                        <p className="text-white">{(item as any).location}</p>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Tags */}
                {(item as any).tags && (item as any).tags.length > 0 ? (
                  <div className="mb-10">
                    <h3 className="text-sm font-semibold text-white/70 mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(item as any).tags.map((t: string) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 transition-colors"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Sidebar: Meta Info */}
              <aside className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-sm font-semibold text-white/70 mb-3">
                    Media Details
                  </h3>
                  <dl className="space-y-2 text-sm text-white/80">
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/60">Type</dt>
                      <dd>{isVideo ? "Video" : "Photo"}</dd>
                    </div>
                    {(item as any).category && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/60">Category</dt>
                        <dd>{(item as any).category}</dd>
                      </div>
                    )}
                    {(item as any).createdAt && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/60">Date</dt>
                        <dd>
                          {new Date((item as any).createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </dd>
                      </div>
                    )}
                    {(item as any).photographer && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/60">
                          {isVideo ? "Director" : "Photographer"}
                        </dt>
                        <dd>{(item as any).photographer}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Share / CTA */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-blue/20 border border-brand-gold/40">
                  <h3 className="text-sm font-semibold text-black/80 mb-2">
                    Share the Moment
                  </h3>
                  <p className="text-xs text-black/70 mb-4">
                    Let others experience the Primus FC story. Share this media
                    with your friends and fellow supporters.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-900 transition">
                      Copy Link
                    </button>
                    <button className="px-3 py-1.5 rounded-full bg-white/90 text-black text-xs font-semibold hover:bg-white transition">
                      Share
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Media */}
      {related && related.length > 0 && (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Related Media
                  </h2>
                  <p className="text-white/60 text-sm">
                    More visuals from the same category and story.
                  </p>
                </div>
                <Link
                  href="/media"
                  className="hidden sm:inline-flex items-center text-brand-gold hover:text-yellow-400 text-sm font-semibold"
                >
                  View All
                  <svg
                    className="w-4 h-4 ml-1"
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {related.map((m: any) => {
                  const rIsVideo = m.type === "video";
                  return (
                    <Link
                      key={m.id}
                      href={`/media/${m.id}`}
                      className="group block rounded-2xl overflow-hidden border border-white/10 bg-slate-900 hover:border-brand-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-gold/20"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={rIsVideo ? m.posterUrl || m.url : m.url}
                          alt={m.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(min-width: 768px) 33vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 left-2 flex gap-2">
                          <span className="px-2 py-1 rounded-full bg-black/70 text-white/80 text-[10px] font-semibold">
                            {rIsVideo ? "VIDEO" : "PHOTO"}
                          </span>
                          {m.category && (
                            <span className="px-2 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-semibold">
                              {m.category}
                            </span>
                          )}
                        </div>
                        {rIsVideo && (
                          <div className="absolute inset-0 grid place-items-center">
                            <div className="w-9 h-9 rounded-full bg-brand-gold/90 grid place-items-center shadow-xl transform group-hover:scale-110 transition-transform">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="black"
                                className="ml-0.5"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs font-semibold text-white line-clamp-2 bg-black/70 rounded-lg px-2 py-1">
                            {m.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
