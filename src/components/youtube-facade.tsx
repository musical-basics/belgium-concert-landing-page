"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { track } from "@vercel/analytics";

export default function YouTubeFacade({
  videoId,
  title,
  playLabel,
}: {
  videoId: string;
  title: string;
  playLabel: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (loaded) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        track("video_play", { videoId });
        setLoaded(true);
      }}
      aria-label={playLabel}
      className="group absolute inset-0 h-full w-full overflow-hidden bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/95 text-[#121622] shadow-2xl shadow-black/40 transition-transform group-hover:scale-110">
          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
        </div>
      </div>
    </button>
  );
}
