"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PlatformKey = "instagram" | "facebook" | "youtube";
type EmbedType = "iframe";

type PlatformConfig = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  text: string;
  surface: string;
  border: string;
  glow: string;
  containerMinHeight: string;
  iframeHeightClass: string;
  items: {
    label: string;
    title: string;
    embedType: EmbedType;
    embedUrl: string;
    fallback: string;
  }[];
};

const getEmbedLabel = (platform: PlatformKey) => {
  if (platform === "youtube") {
    return "YouTube embed URL";
  }

  if (platform === "instagram") {
    return "Instagram post or reel embed URL";
  }

  return "Facebook post embed URL";
};

const platformConfig: Record<PlatformKey, PlatformConfig> = {
  instagram: {
    label: "Instagram",
    eyebrow: "Visual Momentum",
    title: "Instagram Presence",
    description: "Show the everyday visual identity of the brand through reels, student highlights, campaign creatives, and campus moments.",
    accent: "#51A70A",
    accentSoft: "rgba(81,167,10,0.08)",
    accentStrong: "rgba(81,167,10,0.18)",
    text: "#0f172a",
    surface: "linear-gradient(180deg, #f7faf4 0%, #ffffff 100%)",
    border: "rgba(81,167,10,0.18)",
    glow: "radial-gradient(circle at 18% 18%, rgba(81,167,10,0.08) 0%, transparent 30%), radial-gradient(circle at 82% 22%, rgba(109,204,18,0.06) 0%, transparent 28%), radial-gradient(circle at 50% 100%, rgba(81,167,10,0.06) 0%, transparent 34%)",
    containerMinHeight: "400px",
    iframeHeightClass: "aspect-[9/16] h-full min-h-[420px] sm:min-h-[500px]",
    items: [
      {
        label: "Post 01",
        title: "Instagram Content Block",
        embedType: "iframe",
        embedUrl: "https://www.instagram.com/reel/DV0H5Qwk8uT/embed",
        fallback: "Add your first Instagram post or reel embed here.",
      },
      {
        label: "Post 02",
        title: "Instagram Content Block",
        embedType: "iframe",
        embedUrl: "https://www.instagram.com/reel/DVnIAjsk80p/embed",
        fallback: "Add your second Instagram post or reel embed here.",
      },
      {
        label: "Post 03",
        title: "Instagram Content Block",
        embedType: "iframe",
        embedUrl: "https://www.instagram.com/reel/DVOOee7kyEn/embed",
        fallback: "Add your third Instagram post or reel embed here.",
      },
      {
        label: "Post 04",
        title: "Instagram Content Block",
        embedType: "iframe",
        embedUrl: "https://www.instagram.com/reel/DU5QLiRk21v/embed",
        fallback: "Add your fourth Instagram post or reel embed here.",
      },
    ],
  },
  facebook: {
    label: "Facebook",
    eyebrow: "Community Reach",
    title: "Facebook Presence",
    description: "Highlight the platform where community trust grows through announcements, events, proof points, and detailed updates.",
    accent: "#51A70A",
    accentSoft: "rgba(81,167,10,0.08)",
    accentStrong: "rgba(81,167,10,0.18)",
    text: "#0f172a",
    surface: "linear-gradient(180deg, #f7faf4 0%, #ffffff 100%)",
    border: "rgba(81,167,10,0.18)",
    glow: "radial-gradient(circle at 18% 18%, rgba(81,167,10,0.08) 0%, transparent 32%), radial-gradient(circle at 84% 24%, rgba(109,204,18,0.06) 0%, transparent 28%), radial-gradient(circle at 54% 100%, rgba(81,167,10,0.06) 0%, transparent 34%)",
    containerMinHeight: "350px",
    iframeHeightClass: "aspect-[9/16] h-full min-h-[420px] sm:min-h-[100px]",
    items: [
      {
        label: "Post 01",
        title: "Facebook Content Block",
        embedType: "iframe",
        embedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1446657120191240%2F&show_text=false&width=267&t=0",
        fallback: "Add your first Facebook post embed here.",
      },
      {
        label: "Post 02",
        title: "Facebook Content Block",
        embedType: "iframe",
        embedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1572481320315354%2F&show_text=false&width=267&t=0",
        fallback: "Add your second Facebook post embed here.",
      },
      {
        label: "Post 03",
        title: "Facebook Content Block",
        embedType: "iframe",
        embedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4416286168604320%2F&show_text=false&width=267&t=0",
        fallback: "Add your third Facebook post embed here.",
      },
      {
        label: "Post 04",
        title: "Facebook Content Block",
        embedType: "iframe",
        embedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F835177892900025%2F&show_text=false&width=267&t=0",
        fallback: "Add your fourth Facebook post embed here.",
      },
    ],
  },
  youtube: {
    label: "YouTube",
    eyebrow: "Video Authority",
    title: "YouTube Presence",
    description: "Present long-form authority through interviews, explainers, success stories, and educational video content.",
    accent: "#51A70A",
    accentSoft: "rgba(81,167,10,0.08)",
    accentStrong: "rgba(81,167,10,0.18)",
    text: "#0f172a",
    surface: "linear-gradient(180deg, #f7faf4 0%, #ffffff 100%)",
    border: "rgba(81,167,10,0.18)",
    glow: "radial-gradient(circle at 16% 16%, rgba(81,167,10,0.08) 0%, transparent 32%), radial-gradient(circle at 82% 20%, rgba(109,204,18,0.06) 0%, transparent 24%), radial-gradient(circle at 50% 100%, rgba(81,167,10,0.06) 0%, transparent 34%)",
    containerMinHeight: "260px",
    iframeHeightClass: "aspect-video h-full min-h-[220px] sm:min-h-[260px]",
    items: [
      {
        label: "Video 01",
        title: "YouTube Video Block",
        embedType: "iframe",
        embedUrl: "https://www.youtube.com/embed/3t2QwVpYduI?si=AdLrl7APziKyQ_Tm",
        fallback: "Add your first YouTube embed URL here.",
      },
      {
        label: "Video 02",
        title: "YouTube Video Block",
        embedType: "iframe",
        embedUrl: "https://www.youtube.com/embed/N8lM-1nSWNI?si=SktjNaRUIb4hlRNl",
        fallback: "Add your second YouTube embed URL here.",
      },
      {
        label: "Video 03",
        title: "YouTube Video Block",
        embedType: "iframe",
        embedUrl: "https://www.youtube.com/embed/QndDqArpefE?si=dGI8DV7sBytgUa8t",
        fallback: "Add your third YouTube embed URL here.",
      },
      {
        label: "Video 04",
        title: "YouTube Video Block",
        embedType: "iframe",
        embedUrl: "https://www.youtube.com/embed/P8l8AwtQIAs?si=QRJAuAm9Rh1YxtY6",
        fallback: "Add your fourth YouTube embed URL here.",
      },
    ],
  },
};

const platforms: PlatformKey[] = ["instagram", "facebook", "youtube"];

const SocialPresence = () => {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("instagram");
  const activeTheme = platformConfig[activePlatform];

  return (
    <section
      id="social-presence"
      className="section-shell relative overflow-hidden"
      style={{
        background: activeTheme.surface,
        color: activeTheme.text,
      }}
    >
      <div className="absolute inset-0 transition-all duration-500" style={{ background: activeTheme.glow }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/18 to-transparent" />

      <div className="container relative z-10 mx-auto px-3 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-flex items-center justify-center rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] sm:px-4 sm:text-xs sm:tracking-[0.32em]"
            style={{
              color: activeTheme.accent,
              backgroundColor: activeTheme.accentSoft,
              borderColor: activeTheme.border,
            }}
          >
            Social Presence
          </span>

          <h2 className="mt-4 font-display text-2xl font-bold leading-[1.05] tracking-normal text-slate-900 sm:mt-5 sm:text-4xl lg:text-5xl">
            A Social Presence That Builds Trust Before the First Conversation
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
            This section is designed to showcase how the brand appears across Instagram, Facebook, and YouTube with space for the strongest content from each channel.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-3">
          {platforms.map((platform) => {
            const config = platformConfig[platform];
            const isActive = activePlatform === platform;

            return (
              <button
                key={platform}
                type="button"
                onClick={() => setActivePlatform(platform)}
                className={cn(
                  "w-full rounded-full border px-4 py-2.5 font-display text-sm font-semibold capitalize transition-all duration-300 sm:px-5 sm:py-3",
                  "hover:-translate-y-0.5"
                )}
                style={{
                  color: isActive ? "#ffffff" : "#0f172a",
                  background:
                    isActive
                      ? "linear-gradient(135deg, #2F7804 0%, #51A70A 48%, #6DCC12 100%)"
                      : "#ffffff",
                  borderColor: isActive ? config.accent : config.border,
                  boxShadow: isActive ? `0 18px 40px ${config.accentStrong}` : "0 1px 2px rgba(15,23,42,0.04)",
                }}
              >
                {config.label}
              </button>
            );
          })}
        </div>

        <div
          className="mx-auto mt-6 max-w-6xl rounded-[1.5rem] border border-[#51A70A]/15 bg-white p-3 shadow-[0_20px_60px_rgba(16,24,40,0.08)] transition-all duration-500 sm:mt-10 sm:rounded-[2rem] sm:p-8 lg:p-10"
          style={{
            borderColor: activeTheme.border,
          }}
        >
          <div className="mb-5 flex flex-col items-center justify-between gap-3 text-center sm:mb-8 sm:gap-4 lg:flex-row lg:text-left">
            <div>
              <p
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-xs sm:tracking-[0.3em]"
                style={{ color: activeTheme.accent }}
              >
                {activeTheme.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900 sm:mt-3 sm:text-3xl">{activeTheme.title}</h3>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{activeTheme.description}</p>
          </div>

          <div className="grid gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {activeTheme.items.map((item, index) => (
              <div
                key={`${activePlatform}-${item.label}-${index}`}
                className="group relative mx-auto flex h-full w-full max-w-[24rem] flex-col overflow-hidden rounded-[1.2rem] border border-[#51A70A]/15 bg-white p-3 transition-transform duration-300 hover:-translate-y-1 sm:max-w-none sm:rounded-[1.5rem] sm:p-6"
                style={{
                  borderColor: activeTheme.border,
                  boxShadow: "0 10px 30px rgba(16,24,40,0.06)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${activeTheme.accent}, transparent)` }}
                />
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundColor: activeTheme.accentSoft,
                    opacity: 0.8,
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <span
                    className="inline-flex self-start rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px] sm:tracking-[0.24em]"
                    style={{
                      color: activeTheme.accent,
                      background: activeTheme.accentSoft,
                    }}
                  >
                    {item.label}
                  </span>

                  <div
                    className={cn(
                      "mt-3 overflow-hidden rounded-[1rem] border border-dashed sm:mt-5 sm:rounded-[1.25rem]",
                      "flex-1"
                    )}
                    style={{
                      borderColor: activeTheme.border,
                      backgroundColor: "#f8faf6",
                      minHeight: activeTheme.containerMinHeight,
                    }}
                  >
                    {item.embedUrl ? (
                      <iframe
                        src={item.embedUrl}
                        title={`${activeTheme.label} ${index + 1}`}
                        className={cn(
                          "block w-full bg-background",
                          activeTheme.iframeHeightClass
                        )}
                        loading="lazy"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex min-h-[220px] flex-col items-center justify-center px-4 py-6 text-center sm:min-h-[280px] sm:px-6 sm:py-8">
                        <p className="font-display text-base font-semibold text-slate-900 sm:text-lg">{item.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.fallback}</p>
                        <p
                          className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.22em]"
                          style={{ color: activeTheme.accent }}
                        >
                          {getEmbedLabel(activePlatform)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialPresence;
