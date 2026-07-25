"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const positioningTabs = [
  {
    label: "NEET Funnel Marketing",
    image: "/desktop.png",
    heading: "Demand Engine for Ayurveda Admissions",
    description:
      "Performance-led campaign architecture that captures, nurtures, and converts qualified NEET aspirants at scale.",
  },
  {
    label: "College Branding",
    image: "/college-branding.webp",
    heading: "Brand Storytelling That Builds Trust",
    description:
      "High-impact brand positioning across creative, communication, and digital touchpoints to improve preference and recall.",
  },
  {
    label: "Admission Strategy",
    image: "/admission-strategy.webp",
    heading: "Precision Counseling and Conversion Flow",
    description:
      "Counseling-first frameworks with decision-stage messaging to lift seat occupancy and reduce funnel drop-offs.",
  },
  {
    label: "Institutional Growth",
    image: "/institutional-growth.webp",
    heading: "Scalable Growth Built with Leadership Teams",
    description:
      "Institution-first planning and execution models that align marketing outcomes with long-term campus growth goals.",
  },
  {
    label: "Student Counseling",
    image: "/student-counseling.webp",
    heading: "Human-Centered Guidance Journeys",
    description:
      "Structured counseling pathways that answer parent and student concerns with clarity, confidence, and speed.",
  },
  {
    label: "Digital Outreach",
    image: "/digital-outreach.webp",
    heading: "Always-On Multi-Channel Outreach",
    description:
      "Social, content, and paid channel orchestration engineered to keep your institution visible through the full admission cycle.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 72 : -72,
    scale: 0.985,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -56 : 56,
    scale: 1.01,
    filter: "blur(3px)",
  }),
};

const panelTransition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1] as const,
};

const revenueBars = [
  {
    label: "Leads",
    caption: "Students show interest",
    revenue: 96,
    fill: "#97B80A",
  },
  {
    label: "Counsel",
    caption: "Guidance and counselling",
    revenue: 84,
    fill: "#C4FF3B",
  },
  {
    label: "Apply",
    caption: "Application submitted",
    revenue: 72,
    fill: "#7DD3FC",
  },
  {
    label: "Confirm",
    caption: "BAMS seat confirmed",
    revenue: 61,
    fill: "#34D399",
  },
];

const milestones = [
  { label: "Seats filled", value: "61%" },
  { label: "Admission timeline", value: "45 days" },
  { label: "Lead to admission", value: "61%" },
];

const PositioningSection = () => {
  const ref = useRef(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const tabsScrollRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const chartInView = useInView(chartRef, {
    amount: 0.35,
    margin: "-60px 0px -60px 0px",
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [chartRun, setChartRun] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const activeTab = positioningTabs[activeIndex];

  const scrollTabsForIndex = (index: number, movingForward: boolean) => {
    if (!isMobile) return;

    const container = tabsScrollRef.current;
    const previousButton = tabButtonRefs.current[activeIndex];
    const targetButton = tabButtonRefs.current[index];
    if (!container || !previousButton || !targetButton) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    const computedStyle = window.getComputedStyle(container);
    const gap =
      Number.parseFloat(computedStyle.columnGap || computedStyle.gap || "0") ||
      0;

    const step = movingForward
      ? previousButton.offsetWidth + gap
      : targetButton.offsetWidth + gap;
    const nextScrollLeft =
      container.scrollLeft + (movingForward ? step : -step);

    container.scrollTo({
      left: Math.max(0, Math.min(nextScrollLeft, maxScroll)),
      behavior: "smooth",
    });
  };

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    const movingForward = index > activeIndex;
    setDirection(movingForward ? 1 : -1);
    setActiveIndex(index);
    scrollTabsForIndex(index, movingForward);
  };

  useEffect(() => {
    if (activeIndex === 0 && chartInView) {
      setChartRun((current) => current + 1);
    }
  }, [activeIndex, chartInView]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const container = tabsScrollRef.current;
    if (!container) return;
    if (activeIndex !== 0) return;

    container.scrollTo({ left: 0, behavior: "auto" });
  }, [activeIndex, isMobile]);

  return (
    <section ref={ref} id="about" className="section-shell overflow-hidden">
      <div className="gradient-mesh absolute inset-0 opacity-90" />
      <div className="noise-overlay absolute inset-0 opacity-100" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      <div className="relative z-10 container mx-auto px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl space-y-6 text-center sm:space-y-8"
        >
          <span className="section-kicker">Who We Are</span>
          <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
            An established organization
            <br />
            <span className="font-light text-white/70">
              specializing in{" "}
              <span className="text-[#8cef32] text-glow">BAMS admissions</span>
            </span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl">
            Complete{" "}
            <span className="text-[#8cef32] text-glow">Branding & Marketing</span>{" "}
            Solution Tailor-Made to Achieve{" "}
            <span className="text-[#8cef32] text-glow">100% </span>
            Seat Occupancy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 sm:mt-16"
        >
          <div className="-mx-3 px-3 sm:mx-0 sm:px-0">
            <div
              ref={tabsScrollRef}
              className="overflow-x-auto overflow-y-visible py-2 sm:py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="mx-auto flex w-max min-w-full snap-x snap-mandatory justify-start gap-2 pr-3 sm:w-auto sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-4 sm:pr-0">
                {positioningTabs.map((tab, i) => (
                  <motion.button
                    key={tab.label}
                    type="button"
                    ref={(element) => {
                      tabButtonRefs.current[i] = element;
                    }}
                    onClick={() => handleTabClick(i)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative snap-start shrink-0 overflow-hidden whitespace-nowrap rounded-full px-3 py-2 text-center text-[11px] transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm ${
                      activeIndex === i
                        ? "text-white"
                        : "text-white/68 hover:text-white"
                    } glass glass-hover`}
                  >
                    {activeIndex === i && (
                      <motion.span
                        layoutId="active-positioning-tab"
                        className="absolute inset-0 -z-10 rounded-full bg-[#51A70A]/18"
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 24,
                        }}
                      />
                    )}
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative mx-auto mt-8 max-w-6xl sm:mt-12">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -top-10 h-20 bg-[#51A70A]/20 blur-3xl"
            animate={{ opacity: [0.3, 0.65, 0.3], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="glass relative overflow-hidden rounded-2xl p-1 shadow-[0_25px_80px_rgba(0,0,0,0.6)] sm:rounded-3xl sm:p-2">
            <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[1rem] sm:min-h-[360px] sm:rounded-[1.35rem]">
              <motion.div
                aria-hidden="true"
                className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-[#51A70A]/25 blur-3xl sm:-left-20 sm:h-64 sm:w-64"
                animate={{ x: [0, 80, 0], y: [0, 20, 0] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute -bottom-12 right-0 h-44 w-44 rounded-full bg-[#6DCC12]/18 blur-3xl sm:-bottom-16 sm:h-72 sm:w-72"
                animate={{ x: [0, -60, 0], y: [0, -24, 0] }}
                transition={{
                  duration: 13,
                  delay: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab.label}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={panelTransition}
                  className="relative flex w-full items-center justify-center"
                >
                  {activeIndex === 0 ? (
                    <motion.div
                      ref={chartRef}
                      className="relative mx-auto flex w-full items-center justify-center p-3 sm:p-5"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={
                          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }
                        }
                        transition={{ duration: 0.75, delay: 0.15 }}
                        className="glass flex w-full flex-col justify-center overflow-hidden rounded-[2rem] p-5 sm:p-6 lg:p-7"
                      >
                        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
                          <div>
                            <h3 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">
                              A simple{" "}
                              <span className="text-[#8cef32] text-glow">
                                BAMS admission funnel
                              </span>
                            </h3>
                            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-white/70 sm:text-base lg:text-white">
                              This graph shows the usual student journey in a
                              BAMS college: more students start as leads, fewer
                              reach counselling, fewer apply, and the final
                              group confirms admission.
                            </p>
                          </div>

                          <div className="hidden shrink-0 rounded-2xl border border-[#51A70A]/25 bg-[#51A70A]/12 px-4 py-3 text-right sm:block">
                            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8cef32]">
                              Final admissions
                            </p>
                            <p className="counter-glow mt-1 text-2xl font-bold text-[#8cef32]">
                              61%
                            </p>
                          </div>
                        </div>

                        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 px-3 py-6 sm:px-5 sm:py-7">
                          <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[#51A70A]/12 blur-3xl" />

                          <ChartContainer
                            key={chartRun}
                            config={{
                              revenue: {
                                label: "Students remaining",
                                color: "#8CEF32",
                              },
                            }}
                            className="relative h-[250px] w-full sm:h-[320px]"
                          >
                            <BarChart
                              data={revenueBars}
                              margin={{
                                top: 16,
                                right: 8,
                                left: -12,
                                bottom: 0,
                              }}
                              barCategoryGap="20%"
                            >
                              <CartesianGrid
                                vertical={false}
                                stroke="rgba(255,255,255,0.08)"
                              />
                              <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                                className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]"
                              />
                              <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                domain={[0, 110]}
                                ticks={[0, 25, 50, 75, 100]}
                                className="text-xs"
                              />
                              <ChartTooltip
                                cursor={{ fill: "rgba(196,255,59,0.08)" }}
                                content={
                                  <ChartTooltipContent
                                    indicator="dot"
                                    formatter={(value, _, item) => (
                                      <div className="flex min-w-[8rem] items-center justify-between gap-4 sm:min-w-[10rem]">
                                        <span className="text-white/70">
                                          {item.payload.caption}
                                        </span>
                                        <span className="font-mono font-semibold text-white">
                                          {value}% of leads
                                        </span>
                                      </div>
                                    )}
                                  />
                                }
                              />
                              <Bar
                                dataKey="revenue"
                                radius={[18, 18, 6, 6]}
                                animationDuration={950}
                                animationEasing="ease-out"
                              >
                                <LabelList
                                  dataKey="revenue"
                                  position="top"
                                  offset={12}
                                  className="fill-white text-[10px] font-semibold sm:text-[11px]"
                                  formatter={(value) => `${value}%`}
                                />
                                {revenueBars.map((bar) => (
                                  <Cell key={bar.label} fill={bar.fill} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ChartContainer>

                          <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                            {revenueBars.map((bar) => (
                              <div
                                key={bar.label}
                                className="glass flex flex-col justify-center rounded-2xl px-2 py-3 text-center sm:px-3"
                              >
                                <p className="font-display text-sm font-semibold text-white">
                                  {bar.label}
                                </p>
                                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 sm:text-[11px] sm:tracking-[0.2em]">
                                  {bar.caption}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                          {milestones.map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, y: 18 }}
                              animate={
                                inView
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 18 }
                              }
                            transition={{
                              duration: 0.45,
                              delay: 0.45 + index * 0.08,
                            }}
                            className="glass rounded-2xl px-4 py-3 sm:py-4"
                          >
                              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8cef32] sm:text-xs sm:tracking-[0.22em]">
                                {item.label}
                              </p>
                              <p className="counter-glow mt-1.5 text-xl font-semibold text-[#8cef32] sm:mt-2 sm:text-2xl">
                                {item.value}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div className="flex w-full items-center justify-center p-4">
                      <motion.img
                        src={activeTab.image}
                        alt={activeTab.heading}
                        className="block h-auto w-full max-w-lg bg-black/20 object-contain sm:max-w-xl lg:max-w-2xl"
                        onError={(event) => {
                          event.currentTarget.src = "/logo-bg.png";
                          event.currentTarget.className = "block h-auto w-full max-w-lg rounded-2xl bg-black/20 object-contain p-8 sm:max-w-xl lg:max-w-2xl";
                        }}
                        initial={{ scale: 1.06 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.95,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;
