"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  text: string;
  name: string;
  role: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Careerkick has significantly improved our student outreach and admission process. Their structured counseling approach ensures that students joining us are well-informed and genuinely interested.",
    name: "Naiminath Ayurvedic Medical College",
    role: "Admission & Outreach Team",
    image: "/logos/naiminath-ayurvedic.png",
  },
  {
    id: 2,
    text: "Working with Careerkick has streamlined our admission pipeline. Their team consistently delivers quality student leads with proper guidance, making the entire process smooth and efficient.",
    name: "Major SD Singh Ayurvedic Medical College",
    role: "Admission Cell",
    image: "/logos/uni-sd.png",
  },
  {
    id: 3,
    text: "Careerkick brings professionalism and transparency to student counseling. Their digital approach and personalized guidance have helped us connect with the right candidates.",
    name: "Maharana Group of Institutions, Kanpur",
    role: "Academic Coordination Team",
    image: "/logos/maharana-pratap.png",
  },
  {
    id: 4,
    text: "The team at Careerkick understands the admission ecosystem deeply. Their support has helped us improve both student quality and overall enrollment efficiency.",
    name: "Sarvdev Ayurvedic Medical College",
    role: "Admissions Department",
    image: "/logos/sarvdev.png",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getPosition = (i: number) => {
    if (i === index) return "center";
    if (i === (index - 1 + testimonials.length) % testimonials.length)
      return "left";
    if (i === (index + 1) % testimonials.length) return "right";
    return "hidden";
  };

  return (
    <section className="section-shell relative overflow-hidden">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 rounded-full bg-[#6DCC12]/10 blur-[80px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
            Testimonials
          </span>
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-normal text-white sm:text-4xl md:text-5xl">
            SEE WHAT <span className="text-[#8cef32] text-glow">COLLEGES</span>{" "}
            SAY ABOUT US
          </h2>
        </div>

        {/* Controls - Fixed: added relative and z-30 to ensure clickability */}
        <div className="relative z-30 mt-8 sm:mt-12 flex items-center justify-center gap-4 sm:justify-end sm:px-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 backdrop-blur-xl transition-all hover:border-[#51A70A]/40 hover:bg-[#51A70A]/10 hover:text-[#8cef32] active:scale-95 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 backdrop-blur-xl transition-all hover:border-[#51A70A]/40 hover:bg-[#51A70A]/10 hover:text-[#8cef32] active:scale-95 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Slider Container */}
        <div className="relative -mt-8 sm:mt-12 flex min-h-[420px] sm:min-h-[350px] items-center justify-center overflow-visible">
          <AnimatePresence initial={false} mode="popLayout">
            {testimonials.map((item, i) => {
              const position = getPosition(i);
              if (position === "hidden") return null;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: position === "center" ? 1 : 0.25,
                    scale: position === "center" ? 1 : isMobile ? 0.7 : 0.8,
                    x:
                      position === "center"
                        ? 0
                        : position === "left"
                          ? isMobile
                            ? "-45%"
                            : -350
                          : isMobile
                            ? "45%"
                            : 350,
                    zIndex: position === "center" ? 20 : 10,
                    filter: position === "center" ? "blur(0px)" : "blur(4px)",
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                  }}
                  className="absolute w-[90%] max-w-[320px] sm:max-w-[420px] cursor-pointer"
                  onClick={() =>
                    position !== "center" &&
                    (position === "left" ? prev() : next())
                  }
                >
                  <div
                    className={`relative h-full rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-colors duration-500 sm:rounded-[2rem] sm:p-10 ${position === "center" ? "border-[#51A70A]/30 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_38px_rgba(81,167,10,0.18)]" : ""}`}
                  >
                    <span className="absolute right-6 top-2 select-none font-display text-4xl text-[#8cef32]/10 sm:right-8 sm:top-4 sm:text-6xl">
                      &rdquo;
                    </span>

                    <p className="relative z-10 mb-6 text-sm font-medium leading-relaxed text-white/88 sm:mb-8 sm:text-lg">
                      {item.text}
                    </p>

                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full rounded-full object-cover border-2 border-[#51A70A]/20"
                          onError={(event) => {
                            event.currentTarget.src = "/logo.png";
                            event.currentTarget.className = "h-full w-full rounded-full border-2 border-[#51A70A]/30 bg-white object-contain p-1";
                          }}
                        />
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="truncate font-display text-sm font-semibold text-white sm:text-base lg:text-white">
                          {item.name}
                        </p>
                        <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8cef32]/85 sm:text-xs">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
