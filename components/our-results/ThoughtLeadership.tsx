"use client";
import { useMemo } from "react";

type VideoCardProps = {
  youtubeUrl: string;
  title: string;
};

type VideoItem = {
  youtubeUrl: string;
  title: string;
};

const videos: VideoItem[] = [
  {
    youtubeUrl: "https://youtu.be/iK_aVbifdWI?si=jozOECzmjE8MmRVI",
    title: "BAMS College Growth Strategy",
  },
  {
    youtubeUrl: "https://youtu.be/tJx9GXogEKE?si=9zZveCOmwW8pr50S",
    title: "Admission Funnel Optimization",
  },
  {
    youtubeUrl: "https://youtu.be/1YioTHDU0UA?si=Genw3FHoU5DeoSbX",
    title: "BAMS Branding and Outreach",
  },
];

const extractYouTubeId = (url: string) => {
  const cleanUrl = url.trim();

  if (!cleanUrl) return null;

  if (cleanUrl.includes("youtu.be/")) {
    return cleanUrl.split("youtu.be/")[1]?.split(/[?&/]/)[0] ?? null;
  }

  try {
    const parsed = new URL(cleanUrl);
    const watchId = parsed.searchParams.get("v");
    if (watchId) return watchId;

    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.replace("/embed/", "").split("/")[0] || null;
    }
  } catch {
    return null;
  }

  return null;
};

const VideoCard = ({ youtubeUrl, title }: VideoCardProps) => {
  const videoId = useMemo(() => extractYouTubeId(youtubeUrl), [youtubeUrl]);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`
    : "";

  return (
    <div className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition-shadow hover:shadow-[0_22px_52px_rgba(0,0,0,0.28)] sm:rounded-2xl glass">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute left-0 top-0 h-full w-full"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center text-sm text-white/60">
            Add valid YouTube link
          </div>
        )}
      </div>
    </div>
  );
};

export default function ThoughtLeadership() {
  return (
    <section className="section-shell relative w-full overflow-hidden px-4 text-white sm:px-6 lg:px-8">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
      <div className="grid-overlay absolute inset-0 opacity-[0.18]" />

      <div className="relative mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.05] px-5 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] glass sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:py-20">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <span className="section-kicker">
            Thought Leadership
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-normal text-white sm:text-4xl lg:text-5xl">
            HOW WE MAKE COLLEGE A{" "}
            <span className="text-[#8cef32] text-glow">BRAND</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/70 sm:mt-6 sm:text-base lg:text-white">
            Expert video insights on admissions growth, counseling systems, and
            brand-building strategies for Ayurveda institutions across India.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <VideoCard
              key={`${video.youtubeUrl}-${index}`}
              youtubeUrl={video.youtubeUrl}
              title={video.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
