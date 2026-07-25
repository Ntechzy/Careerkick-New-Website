"use client";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

type StoryItem = {
  college: string;
  image: string;
  problem: string;
  solution: string;
  result: string;
};

const stories: StoryItem[] = [
  {
    college: "MAHARANA GROUP OF INSTITUTIONS, KANPUR",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784109210/maharana_b7rmx6.webp",
    problem: "Low seat fill rate and lack of market presence.",
    solution: "Comprehensive branding, admission support, and counseling.",
    result:
      "Achieved 100% admissions within one cycle. Increased their fee from 2 Lakhs To 3 Lakhs",
  },
  {
    college: "MAJOR SD SINGH AYURVEDIC MEDICAL COLLEGE",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784109212/sd_zkxqvg.webp",
    problem: "Vacant seats due to low college presence and limited demand.",
    solution:
      "Transformed institutions into the best college of UP and the most demanding college of UP through continuous brand reputation management and strategic positioning.",
    result: " Increased fee from 2 Lakhs 60K To Rs. 3 lakhs per year.",
  },
  {
    college: "NAIMINATH AYURVEDIC MEDICAL COLLEGE",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784109210/naiminath_uys4at.jpg",
    problem: "Inefficient admission processes.",
    solution: "Process restructuring and targeted campaigns.",
    result:
      "Achieved 100% admissions with high-scoring students within a single cycle. Increased their fee from 2 lakhs to Rs.3 lakhs plus Rs.50K as development fees.",
  },
];

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SuccessStories(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStory = stories[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="success-stories"
      className="relative overflow-hidden bg-base px-4 py-16 text-white sm:py-20 md:px-8 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-16 h-52 w-[72%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-24 h-44 w-44 rounded-full bg-[#51A70A]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-70" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl space-y-4 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
            Success Stories
          </span>
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-normal text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Colleges That Saw Real{" "}
            <span className="text-[#8cef32] text-glow">Admission Growth</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-white/70 sm:text-base lg:text-white">
            See how different BAMS colleges improved visibility, strengthened
            counselling, and achieved better admission results with Careerkick.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.05fr_1.05fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-3 glass"
          >
            <div className="flex flex-col gap-3">
              {stories.map((story, index) => (
                <button
                  key={story.college}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative overflow-hidden rounded-[1.4rem] border px-4 py-4 text-left transition-all duration-300 sm:px-5 ${
                    activeIndex === index
                      ? "border-[#51A70A]/35 bg-[#51A70A]/10 shadow-[0_18px_40px_rgba(81,167,10,0.12)]"
                      : "border-white/10 bg-white/[0.04] hover:border-[#51A70A]/20 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${
                        activeIndex === index ? "bg-[#8cef32]" : "bg-white/30"
                      }`}
                    />
                    <p
                      className={`text-sm leading-relaxed sm:text-[15px] ${
                        activeIndex === index
                          ? "font-display font-semibold text-white"
                          : "font-medium text-white/70"
                      }`}
                    >
                      {story.college}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={`${activeStory.college}-image`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-3 glass"
          >
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-[1.5rem]">
              <img
                src={activeStory.image}
                alt={activeStory.college}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/logo-bg.png";
                  event.currentTarget.className = "h-full w-full bg-[#050704] object-contain p-8";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]/85">
                  Featured College
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold text-white sm:text-xl">
                  {activeStory.college}
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`${activeStory.college}-content`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 glass sm:p-6"
          >
            <div className="flex items-center gap-3 text-[#8cef32]">
              <Sparkles className="h-5 w-5" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]/80">
                Case Snapshot
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]/80">
                  Problem
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/70 sm:text-base lg:text-white">
                  {activeStory.problem}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]/80">
                  Solution
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/70 sm:text-base lg:text-white">
                  {activeStory.solution}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#51A70A]/20 bg-[#51A70A]/10 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8cef32]" />
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]/90">
                    Result
                  </p>
                </div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white sm:text-base lg:text-white">
                  {activeStory.result}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
