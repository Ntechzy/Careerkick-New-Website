"use client";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo, useState } from "react";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "../constants/variants";
import { SectionWrapper } from "../shared/SectionWrapper";

interface StoryHighlightWithMedia {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageCaption?: string;
}

interface BrandStoryContentWithMedia {
  title: string;
  highlights: StoryHighlightWithMedia[];
}

const BRAND_STORY_CONTENT: BrandStoryContentWithMedia = {
  title: "Our Story: Transforming Admissions Into Confident Journeys",
  highlights: [
    {
      id: "founded",
      title: "Founded In 2017",
      description:
        "Started as a focused JEE counseling initiative and quickly scaled nationwide, guided by core principles of transparency and student-first advice.",
      imageUrl: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784094060/founded_fayfhr.png",
    },
    {
      id: "largest",
      title: "India's Largest Counseling Network",
      description:
        "Operational reach across digital and offline touchpoints with expert teams. We leverage data analytics from years of admission cycles.",
      imageUrl: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784094054/counseling_tjrwlp.png",
    },
    {
      id: "trust",
      title: "Trusted By Families",
      description:
        "Long-term guidance model from exam prep stage to final admission decisions. We hold your hand through the entire high-stakes process.",
      imageUrl: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784094054/trust_zhqjxc.png",
    },
  ],
};

function BrandStoryComponent() {
  // Initialize with the first highlight active by default
  const [activeTabId, setActiveTabId] = useState<string>(
    BRAND_STORY_CONTENT.highlights[0].id,
  );

  const activeContent = useMemo(() => {
    return BRAND_STORY_CONTENT.highlights.find(
      (item) => item.id === activeTabId,
    );
  }, [activeTabId]);

  return (
    <SectionWrapper
      id="brand-story"
      className="relative overflow-hidden bg-base px-6 py-24 text-white sm:px-8 lg:px-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(81,167,10,0.16),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(109,204,18,0.12),transparent_24%),linear-gradient(180deg,rgba(6,18,4,0.94)_0%,rgba(5,7,4,1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.12]" />

      {/* 1. Centered Header Area */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainerVariants}
        className="relative z-10 mx-auto mb-16 max-w-3xl space-y-6 text-center"
      >
        <motion.div
          variants={fadeUpVariants}
          className="inline-flex items-center justify-center rounded-full border border-[#51A70A]/35 bg-[#51A70A]/12 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]"
        >
          Brand story
        </motion.div>
        <motion.h2
          variants={fadeUpVariants}
          className="font-display text-4xl font-bold tracking-normal text-white sm:text-5xl"
        >
          {BRAND_STORY_CONTENT.title}
        </motion.h2>
        <motion.p
          variants={fadeUpVariants}
          className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-white"
        >
          A focused, student-first journey built on trust, scale, and clarity at every step.
        </motion.p>
      </motion.div>

      {/* 2. Main Content Grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Left Side: Media Viewer (Spans 7 columns on desktop) */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            {" "}
            {/* Makes it stick while scrolling if right column gets long */}
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={`media-${activeContent.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-6"
                >
                  {/* Image Container */}
                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                    {activeContent.imageUrl ? (
                      <img
                        src={activeContent.imageUrl}
                        alt={activeContent.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/40">
                        No Image Available
                      </div>
                    )}
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/45 to-transparent" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Interactive Vertical Tabs (Spans 5 columns on desktop) */}
        <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-8">
          {BRAND_STORY_CONTENT.highlights.map((highlight) => {
            const isActive = activeTabId === highlight.id;

            return (
              <button
                key={highlight.id}
                type="button"
                onClick={() => setActiveTabId(highlight.id)}
                className={`relative overflow-hidden w-full cursor-pointer rounded-2xl p-6 text-left transition-all duration-300 ${
                  isActive
                    ? "border border-[#51A70A]/25 bg-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.25)] scale-[1.02]"
                    : "border border-white/8 bg-white/[0.03] hover:border-[#51A70A]/18 hover:bg-white/[0.05] hover:scale-[1.01]"
                }`}
              >
                {/* Animated active border indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#51A70A]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div
                  className={`pl-4 transition-colors duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}
                >
                  <h4
                    className={`font-display text-lg font-bold ${isActive ? "text-white" : "text-white/82"}`}
                  >
                    {highlight.title}
                  </h4>
                  {/* We truncate the description slightly on the right cards to keep them looking like clean tabs */}
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/66">
                    {highlight.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default memo(BrandStoryComponent);
