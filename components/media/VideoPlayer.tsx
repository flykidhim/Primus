'use client';

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;          // MP4 or HLS (.m3u8)
  poster?: string;      // optional poster image
  autoPlay?: boolean;
  muted?: boolean;
};

export default function VideoPlayer({ src, poster, autoPlay=false, muted=false }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [isHls, setIsHls] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const isHlsSrc = src.endsWith(".m3u8") || src.includes(".m3u8");
    setIsHls(isHlsSrc);

    // If browser can play HLS natively (Safari), just set src
    if (isHlsSrc && video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    // Try hls.js for other browsers; gracefully fall back if not installed
    if (isHlsSrc) {
      (async () => {
        try {
          const Hls = (await import("hls.js")).default;
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
          } else {
            // Fallback (won't play on some browsers without Hls)
            video.src = src;
          }
        } catch {
          // hls.js not installed – fall back to native (may not work on Chrome/Firefox)
          video.src = src;
        }
      })();
    } else {
      video.src = src;
    }
  }, [src]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10">
      <video
        ref={ref}
        poster={poster}
        controls
        playsInline
        autoPlay={autoPlay}
        muted={muted}
        className="w-full h-auto aspect-video bg-black"
      />
      {isHls && (
        <div className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs">HLS</div>
      )}
    </div>
  );
}
