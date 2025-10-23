import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMediaById, getRelatedMedia } from "@/lib/repos";
import VideoPlayer from "@/components/media/VideoPlayer";

export default async function MediaDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
                  <div className="relative aspect-[16/9] lg:aspect-video">
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
                      <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-sm font-semibold">
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

                {/* Tags */}
                {(item as any).tags?.length ? (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
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

                {/* Share Section */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    Share this {isVideo ? "video" : "photo"}
                  </h3>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all transform hover:scale-105">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-gray-900 text-white text-sm transition-all transform hover:scale-105 border border-white/20">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Tweet
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata Sidebar */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-purple-900/20 border border-white/10">
                  <h3 className="font-semibold text-white mb-4">
                    Media Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-white/70">Type</div>
                      <div className="font-semibold text-white">
                        {isVideo ? "Video Content" : "Photograph"}
                      </div>
                    </div>
                    {(item as any).category && (
                      <div>
                        <div className="text-sm text-white/70">Category</div>
                        <div className="font-semibold text-white">
                          {(item as any).category}
                        </div>
                      </div>
                    )}
                    {(item as any).createdAt && (
                      <div>
                        <div className="text-sm text-white/70">
                          Date Published
                        </div>
                        <div className="font-semibold text-white">
                          {new Date((item as any).createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-4">Download</h3>
                  <p className="text-white/70 text-sm mb-4">
                    {isVideo
                      ? "This video is available for media use. Contact us for licensing."
                      : "High-resolution version available for press and media use."}
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-full bg-brand-gold text-black font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105"
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
