import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMediaById, getRelatedMedia } from "@/lib/repos";
import VideoPlayer from "@/components/media/VideoPlayer";

export default async function MediaDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

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
      <section className="py-2 lg:py-6">
        <div className="container mx-auto px-0 lg:px-4">
          <div className="max-w-7xl mx-auto">
            {/* Media Display */}
            <div className="mb-10 lg:mb-14">
              {isVideo ? (
                <div className="relative rounded-none lg:rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                  <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
                    <VideoPlayer
                      src={(item as any).url}
                      poster={(item as any).posterUrl}
                      autoPlay={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative rounded-none lg:rounded-3xl overflow-hidden border border-white/10 bg-slate-800 shadow-2xl">
                  <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
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
              {/* Primary Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    {isVideo ? "Match Highlights" : "Gallery Spotlight"}
                  </span>
                  <span className="text-xs font-medium text-white/60 border border-white/10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur">
                    {(item as any).type?.toUpperCase() || "MEDIA"}
                  </span>
                  {(item as any).category && (
                    <span className="text-xs font-medium text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full bg-emerald-500/10">
                      {(item as any).category}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                    {(item as any).match && (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="font-semibold text-white/80">
                          {(item as any).match.homeTeam}{" "}
                          <span className="text-emerald-300">vs</span>{" "}
                          {(item as any).match.awayTeam}
                        </span>
                      </span>
                    )}
                    {(item as any).createdAt && (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>
                          {new Date((item as any).createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
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

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href="/media"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-lg shadow-white/20 hover:bg-slate-100 transition-all transform hover:scale-105"
                    >
                      ← Back to Media Hub
                    </Link>

                    {isVideo && (item as any).match && (
                      <Link
                        href={`/matches/${(item as any).match.slug || ""}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                      >
                        View Match Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5">
                  <h2 className="text-sm font-semibold text-white/80 uppercase tracking-[0.18em] mb-4">
                    Media Info
                  </h2>
                  <dl className="space-y-3 text-sm text-white/70">
                    <div className="flex justify-between gap-3">
                      <dt className="text-white/50">Type</dt>
                      <dd className="font-medium uppercase">
                        {(item as any).type || "N/A"}
                      </dd>
                    </div>
                    {(item as any).season && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-white/50">Season</dt>
                        <dd className="font-medium">{(item as any).season}</dd>
                      </div>
                    )}
                    {(item as any).location && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-white/50">Location</dt>
                        <dd className="font-medium">
                          {(item as any).location}
                        </dd>
                      </div>
                    )}
                    {(item as any).duration && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-white/50">Duration</dt>
                        <dd className="font-medium">
                          {(item as any).duration} mins
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 backdrop-blur-xl p-5">
                  <h2 className="text-sm font-semibold text-amber-300 uppercase tracking-[0.18em] mb-3">
                    Media & Press
                  </h2>
                  <p className="text-sm text-amber-100/80 mb-3">
                    {isVideo
                      ? "This video is available for media use. Contact us for licensing."
                      : "High-resolution version available for press and media use."}
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-amber-400 text-slate-950 text-sm font-semibold hover:bg-amber-300 transition-all transform hover:scale-105"
                  >
                    Request Media Access
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Media */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-black text-white">
                  Related{" "}
                  <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                    Content
                  </span>
                </h2>
                <Link
                  href="/media"
                  className="group inline-flex items-center text-brand-gold hover:text-yellow-400 transition-colors font-semibold"
                >
                  View All
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

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {related.map((m: any) => {
                  const thumb =
                    m.type === "video" ? m.posterUrl || m.url : m.url;
                  const isRelatedVideo = m.type === "video";

                  return (
                    <Link
                      key={m.id}
                      href={`/media/${m.id}`}
                      className="group block transform hover:scale-105 transition-all duration-500"
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-brand-gold/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-brand-gold/20">
                        <Image
                          src={thumb}
                          alt={m.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {isRelatedVideo && (
                          <div className="absolute inset-0 grid place-items-center">
                            <div className="w-10 h-10 rounded-full bg-brand-gold/90 grid place-items-center transform group-hover:scale-110 transition-transform">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="ml-1"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="bg-black/80 rounded-lg p-2 backdrop-blur-sm">
                            <h3 className="font-semibold text-white text-xs line-clamp-2 mb-1">
                              {m.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-brand-gold">
                                {m.category}
                              </span>
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isRelatedVideo ? "bg-red-500" : "bg-blue-500"
                                }`}
                              ></span>
                            </div>
                          </div>
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
