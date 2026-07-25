"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BarChart3, ShoppingCart, Users } from "lucide-react";
import { useRef } from "react";

type Service = {
  id: number;
  title: string;
  points: string[];
  position: "top-left" | "bottom-center" | "top-right";
  icon: typeof BarChart3;
};

const roadPath =
  "M 0 100 H 222 C 282 100 332 146 332 208 V 302 C 332 360 372 392 428 392 H 550 C 610 392 654 434 654 494 V 538 C 654 618 714 680 794 680 H 848 C 926 680 986 620 986 542 V 450 C 986 392 1028 358 1088 358 H 1440";

const services: Service[] = [
  {
    id: 1,
    title: "Branding & Reputation Management",
    points: [
      "Strategic rebranding to improve visibility.",
      "Organizing student-centric events and activities.",
    ],
    position: "top-left",
    icon: BarChart3,
  },
  {
    id: 2,
    title: "Admission Team Training",
    points: ["Equipping college staff with the best practices"],
    position: "bottom-center",
    icon: Users,
  },
  {
    id: 3,
    title: "Ongoing Support",
    points: ["Dedicated teams for continuous assistance."],
    position: "top-right",
    icon: ShoppingCart,
  },
];

const pinPositions: Record<string, { left: string; top: string }> = {
  "top-left": { left: "18%", top: "12.5%" },
  "bottom-center": { left: "55.5%", top: "85%" },
  "top-right": { left: "75.5%", top: "45%" },
};

function ServicePin({
  service,
  index,
  pathLength,
}: {
  service: Service;
  index: number;
  pathLength: any;
}) {
  const Icon = service.icon;
  const start = index * 0.3;
  const end = start + 0.15;

  const opacity = useTransform(pathLength, [start, end], [0, 1]);
  const scale = useTransform(pathLength, [start, end], [0.9, 1]);
  const floatEffect = useTransform(pathLength, [start, end], [15, 0]);

  const layoutClass =
    service.id === 1
      ? "flex-row-reverse items-start pr-10"
      : service.id === 3
        ? "flex-row items-center pl-10"
        : "flex-col items-center";

  const spacing =
    service.id === 1
      ? "right-full mr-6 top-4"
      : service.id === 3
        ? "left-full ml-6"
        : "bottom-[140px]";

  return (
    <motion.div
      style={{
        opacity,
        scale,
        left: pinPositions[service.position].left,
        top: pinPositions[service.position].top,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative flex group ${layoutClass}`}>
        <motion.div
          style={{
            x: service.id === 1 || service.id === 3 ? floatEffect : 0,
            y: service.id === 2 ? floatEffect : 0,
          }}
          className={`absolute z-50 w-[280px] rounded-2xl border border-white/10 bg-background/70 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 group-hover:border-primary/35 ${spacing}`}
        >
          <h3 className="mb-2 text-base font-extrabold uppercase tracking-wide text-foreground">
            {service.title}
          </h3>
          <ul className="space-y-2">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-[13px] font-medium leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>

          <div
            className={`absolute h-4 w-4 rotate-45 border-white/10 bg-background/70 
            ${service.id === 1 ? "left-full top-6 -ml-2 border-r border-t" : ""}
            ${service.id === 3 ? "right-full top-1/2 -mr-2 -translate-y-1/2 border-b border-l" : ""}
            ${service.id === 2 ? "left-1/2 top-full -mt-2 -translate-x-1/2 border-b border-r" : ""}`}
          />
        </motion.div>

        <div className="relative flex h-[76px] w-[56px] flex-col items-center justify-start rounded-b-2xl rounded-t-full border border-primary/35 bg-primary/14 p-1.5 backdrop-blur-sm transition-colors group-hover:bg-primary/25">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/70 text-primary">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ValueAddedServices(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 45, damping: 25 });

  return (
    <div ref={scrollRef} className="relative h-auto md:h-[400vh] section-shell">
      <section className="relative md:sticky top-0 flex h-auto md:h-screen w-full flex-col overflow-hidden pt-12 md:pt-12">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="container relative z-20 mx-auto px-4 flex flex-col h-full">
          <div className="relative z-30 mx-auto mb-8 md:mb-12 max-w-4xl text-center shrink-0">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/80 mb-2 md:mb-3 block"
            >
              The Journey of Support
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-5xl font-extrabold uppercase tracking-tight leading-tight"
            >
              Value-Added{" "}
              <span className="text-primary text-glow">Services</span>
            </motion.h2>
          </div>

          <div className="relative z-10 mx-auto hidden md:block w-screen -ml-[calc((100vw-100%)/2)] grow overflow-visible">
            <div className="relative h-full w-full max-w-[1280px] mx-auto overflow-visible">
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 1440 800"
                preserveAspectRatio="none"
              >
                <path
                  d={roadPath}
                  fill="none"
                  stroke="hsl(var(--surface-2))"
                  strokeWidth="54"
                  strokeLinecap="round"
                />
                <motion.path
                  d={roadPath}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="50"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
                <motion.path
                  d={roadPath}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeDasharray="16 24"
                  style={{ pathLength }}
                />
              </svg>

              {services.map((service, index) => (
                <ServicePin
                  key={service.id}
                  service={service}
                  index={index}
                  pathLength={pathLength}
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="mt-2 grid grid-cols-1 gap-4 md:hidden pb-20">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-white/10 bg-background/40 p-5 shadow-lg flex flex-col glass"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <service.icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-black text-foreground uppercase text-sm tracking-wide leading-tight">
                    {service.title}
                  </h3>
                </div>
                <div className="space-y-2 pl-1">
                  {service.points.map((p) => (
                    <div key={p} className="flex items-start gap-3">
                      <span className="h-1 w-1 rounded-full bg-primary mt-1.5" />
                      <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed">
                        {p}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
