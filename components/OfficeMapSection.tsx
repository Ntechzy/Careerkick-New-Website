"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { GradientText } from "@/components/ui/GradientText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

type NetworkOffice = {
  id: string;
  city: string;
  state: string;
  coordinates: [number, number];
  image: string;
  address: string;
  link: string;
  contacts: string[];
  labelOffset: {
    x: number;
    y: number;
  };
};

type ProjectedPoint = {
  x: number;
  y: number;
};

const INDIA_GEO_URL = "/india-states.geojson";

const INDIA_CENTER: [number, number] = [82.8, 22.6];
const INDIA_SCALE = 1050;
const INDIA_TRANSLATE: [number, number] = [400, 300];

const officeNetwork: NetworkOffice[] = [
  {
    id: "kanpur",
    city: "Kanpur",
    state: "Uttar Pradesh",
    coordinates: [80.292698, 26.480127],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162422/kanpur_fzmknv.png",
    address:
      "117 N 65, Rani Ganj, Ambedkar Nagar, Navin Nagar Kakadeo, Kanpur, Uttar Pradesh 208025",
    link: "https://www.google.com/maps?ll=26.480127,80.292698&z=15&t=m&hl=en-GB&gl=US&mapclient=embed&cid=9720261514956615116",
    contacts: ["+91 8127942568"],
    labelOffset: { x: -72, y: 22 },
  },
  {
    id: "greater-noida",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    coordinates: [77.505382, 28.453756],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162431/greater-noida_igf980.png",
    address:
      "2nd floor, AA-007, Block A, Ansal Golf Link-1, Greater Noida, Uttar Pradesh 201315",
    link: "https://www.google.com/maps?ll=28.453756,77.505382&z=15&t=m&hl=en-GB&gl=US&mapclient=embed&cid=1290190296594937614",
    contacts: ["+91 9198350980", "+91 91983 50985"],
    labelOffset: { x: -86, y: -4 },
  },
  {
    id: "gorakhpur",
    city: "Gorakhpur",
    state: "Uttar Pradesh",
    coordinates: [83.3550462, 26.8064944],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162422/gorakhpur_nwyilm.png",
    address:
      "2nd floor, 401, LIG 1st St, Vikas Nagar, Gorakhpur, Uttar Pradesh 273007, India",
    link: "https://www.google.com/maps/place/2nd+floor,+401,+LIG+1st+St,+Vikas+Nagar,+Gorakhpur,+Uttar+Pradesh+273007,+India/@26.806494,83.355046,15z/data=!4m5!3m4!1s0x399145ea7d3c0473:0x5ed276420ba33477!8m2!3d26.8064944!4d83.3550462?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
    contacts: [],
    labelOffset: { x: 28, y: 8 },
  },
  {
    id: "indore",
    city: "Indore",
    state: "Madhya Pradesh",
    coordinates: [75.884559, 22.717817],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162423/indore_ebiutj.png",
    address:
      "402 Apollo Trade Center, Geeta Bhawan Square, Indore, Madhya Pradesh",
    link: "https://www.google.com/maps?ll=22.717817,75.884559&z=15&t=m&hl=en-GB&gl=US&mapclient=embed&cid=17580593814664500296",
    contacts: ["+91 9198350983", "+91 9198350987"],
    labelOffset: { x: -54, y: -26 },
  },
];

const routeOrder = [
  "greater-noida",
  "kanpur",
  "gorakhpur",
  "indore",
] as const;

export default function OfficeMapSection() {
  const [activeOfficeId, setActiveOfficeId] = useState<string>(
    officeNetwork[0].id
  );

  const detailCardRef = useRef<HTMLDivElement | null>(null);

  const activeOffice =
    officeNetwork.find((office) => office.id === activeOfficeId) ??
    officeNetwork[0];

  const routePoints = routeOrder
    .map((officeId) => officeNetwork.find((office) => office.id === officeId))
    .filter((office): office is NetworkOffice => Boolean(office))
    .map((office) => projectCoordinates(office.coordinates));

  const routePath = buildRoutePath(routePoints);

  const handleOfficeSelect = (
    officeId: string,
    options?: { scrollToCard?: boolean }
  ) => {
    setActiveOfficeId(officeId);

    if (
      options?.scrollToCard &&
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      window.setTimeout(() => {
        detailCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 140);
    }
  };

  return (
    <section
      id="offices"
      className="relative overflow-hidden bg-base px-4 py-section-mobile md:px-8 md:py-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(81,167,10,0.22),transparent_24%),radial-gradient(circle_at_88%_76%,rgba(109,204,18,0.16),transparent_28%),linear-gradient(180deg,#050704_0%,#081007_46%,#050704_100%)]" />
      <div className="grid-overlay absolute inset-0 opacity-[0.14]" />
      <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-violet/20 blur-[110px]" />
      <div className="absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-violet-glow/16 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Our Offices</SectionLabel>
          </div>

          <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-6xl">
            Meet CareerKick <GradientText>where guidance begins.</GradientText>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-text-muted md:text-lg">
            Visit our CareerKick offices across India and connect with our
            counselling team for personalised admission guidance, college
            planning, and complete support.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {officeNetwork.map((office) => {
              const isActive = office.id === activeOffice.id;

              return (
                <button
                  key={office.id}
                  type="button"
                  onClick={() =>
                    handleOfficeSelect(office.id, { scrollToCard: true })
                  }
                  onFocus={() => handleOfficeSelect(office.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "border-violet/60 bg-gradient-brand text-[#050704] shadow-[0_18px_40px_rgba(81,167,10,0.28)]"
                      : "border-white/10 bg-white/[0.04] text-white/72 hover:-translate-y-0.5 hover:border-violet/35 hover:bg-white/[0.08] hover:text-white"
                  )}
                >
                  {office.city}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-sm text-text-muted/80">
            Hover or tap a city to view office details.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <ScrollReveal className="order-2 mx-auto w-full max-w-xl scroll-mt-24 xl:max-w-[560px] lg:order-1">
            <div
              ref={detailCardRef}
              className="rounded-[28px] border border-white/10 bg-white/[0.05] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl"
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeOffice.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden rounded-[24px] border border-white/10 bg-[#081107]"
                >
                  <div className="flex flex-col">
                    <div className="relative bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.30),transparent_34%),linear-gradient(180deg,#eff7e8_0%,#dbe9cf_100%)] p-3">
                      <div className="absolute inset-x-5 top-5 h-14 rounded-full bg-violet/20 blur-3xl" />

                      <div className="relative aspect-[16/8.4] overflow-hidden rounded-[20px] border border-white/70 bg-white/85 shadow-[0_18px_48px_rgba(6,16,7,0.14)]">
                        <OfficePreview office={activeOffice} />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(5,7,4,0.10)_100%)]" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-5 p-5 sm:p-6">
                      <div className="space-y-3.5">
                        <div>
                          <span className="inline-flex rounded-full border border-violet/20 bg-violet/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-violet-glow">
                            Office Network
                          </span>

                          <h3 className="mt-3 font-display text-[1.9rem] font-semibold leading-none text-white sm:text-[2.15rem]">
                            {activeOffice.city}
                          </h3>

                          <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/46 sm:text-sm">
                            {activeOffice.state}
                          </p>

                        </div>

                        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-3.5">
                          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-violet-glow">
                            Address
                          </p>

                          <p className="mt-2.5 text-sm leading-6 text-white/78">
                            {activeOffice.address}
                          </p>
                        </div>

                        {activeOffice.contacts.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {activeOffice.contacts.map((contact) => (
                              <a
                                key={contact}
                                href={`tel:${contact.replace(/\s+/g, "")}`}
                                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/72 transition-colors hover:border-violet/30 hover:text-white sm:text-sm"
                              >
                                {contact}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <a
                        href={activeOffice.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-bold text-[#050704] shadow-[0_18px_44px_rgba(81,167,10,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(81,167,10,0.34)] sm:px-6"
                      >
                        View Office Location
                        <ArrowIcon />
                      </a>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-1 lg:order-2 lg:pl-4">
            <ThreeDOfficeMap
              activeOffice={activeOffice}
              routePath={routePath}
              onOfficeSelect={handleOfficeSelect}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ThreeDOfficeMap({
  activeOffice,
  routePath,
  onOfficeSelect,
}: {
  activeOffice: NetworkOffice;
  routePath: string;
  onOfficeSelect: (
    officeId: string,
    options?: {
      scrollToCard?: boolean;
    }
  ) => void;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_50%_45%,rgba(109,204,18,0.20),transparent_52%)] blur-2xl" />

      <div className="relative mx-auto aspect-[611.86/695.70178] w-full max-w-[640px] perspective-[1200px] lg:max-w-none">
        <div className="absolute inset-[14%] rounded-full bg-violet/20 blur-[90px]" />

        <motion.div
          initial={{ opacity: 0, rotateX: 18, rotateZ: -5, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, rotateZ: 0, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-[6%] rounded-[38px] bg-black/45 blur-2xl"
            style={{
              transform: "translate3d(0, 46px, -80px) scale(0.92)",
            }}
          />

          <div
            className="absolute inset-[3%] rounded-[34px] border border-violet/20 bg-[#0a1208] shadow-[0_44px_110px_rgba(0,0,0,0.60)]"
            style={{
              transform: "translate3d(0, 28px, -56px)",
            }}
          />

          <div
            className="absolute inset-[1.5%] rounded-[34px] border border-violet/25 bg-[linear-gradient(180deg,#152b11_0%,#0a1508_100%)]"
            style={{
              transform: "translate3d(0, 16px, -32px)",
            }}
          />

          <div
            className="absolute inset-0 overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.20)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_34px_90px_rgba(0,0,0,0.45)]"
            style={{
              transform: "translate3d(0, 0, 0)",
            }}
          >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(109,204,18,0.12)_0%,transparent_32%,rgba(81,167,10,0.08)_65%,transparent_100%)]" />
              <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />

              <div
                className="absolute inset-0"
                style={{
                  transform: "translate3d(0, 0, 18px)",
                }}
              >
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ center: [82.8, 22.6], scale: 1050 }}
                  width={800}
                  height={600}
                  className="relative z-[1] h-full w-full drop-shadow-[0_22px_20px_rgba(0,0,0,0.42)]"
                >
                  <Geographies geography={INDIA_GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: "#10230d",
                              stroke: "rgba(109,204,18,0.46)",
                              strokeWidth: 0.75,
                              outline: "none",
                              filter:
                                "drop-shadow(0px 9px 0px rgba(38, 90, 17, 0.32)) drop-shadow(0px 18px 18px rgba(0,0,0,0.35))",
                            },
                            hover: {
                              fill: "#1c3514",
                              stroke: "rgba(166,255,74,0.72)",
                              strokeWidth: 0.95,
                              outline: "none",
                              filter:
                                "drop-shadow(0px 10px 0px rgba(58, 132, 23, 0.42)) drop-shadow(0px 20px 20px rgba(0,0,0,0.38))",
                            },
                            pressed: {
                              fill: "#1c3514",
                              stroke: "rgba(166,255,74,0.72)",
                              strokeWidth: 0.95,
                              outline: "none",
                            },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ComposableMap>

                <motion.svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 z-[4] h-full w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.45 }}
                >
                  <motion.path
                    d={routePath}
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: { pathLength: 1, opacity: 0.42 },
                    }}
                    transition={{
                      duration: 1.6,
                      ease: "easeInOut",
                      delay: 0.18,
                    }}
                    fill="none"
                    stroke="rgba(109, 204, 18, 0.45)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="1.8 2.8"
                    style={{ filter: "blur(6px)" }}
                  />

                  <motion.path
                    d={routePath}
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: { pathLength: 1, opacity: 1 },
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: 0.24,
                    }}
                    fill="none"
                    stroke="#8cff22"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="1.3 2.2"
                    style={{
                      filter:
                        "drop-shadow(0 0 10px rgba(140,255,34,0.8)) drop-shadow(0 0 22px rgba(109,204,18,0.45))",
                    }}
                  />
                </motion.svg>

                {officeNetwork.map((office) => {
                  const point = projectCoordinates(office.coordinates);
                  const isActive = office.id === activeOffice.id;

                  return (
                    <OfficePin3D
                      key={office.id}
                      office={office}
                      point={point}
                      isActive={isActive}
                      onOfficeSelect={onOfficeSelect}
                    />
                  );
                })}
              </div>

            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[linear-gradient(120deg,rgba(255,255,255,0.16)_0%,transparent_22%,transparent_70%,rgba(109,204,18,0.10)_100%)]" />
            <div className="pointer-events-none absolute inset-x-10 top-8 h-28 rounded-full bg-white/10 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function OfficePin3D({
  office,
  point,
  isActive,
  onOfficeSelect,
}: {
  office: NetworkOffice;
  point: ProjectedPoint;
  isActive: boolean;
  onOfficeSelect: (
    officeId: string,
    options?: {
      scrollToCard?: boolean;
    }
  ) => void;
}) {
  return (
    <div
      className="absolute z-[8]"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        transform: "translate3d(0, 0, 46px)",
      }}
    >
      <button
        type="button"
        onMouseEnter={() => onOfficeSelect(office.id)}
        onFocus={() => onOfficeSelect(office.id)}
        onClick={() => onOfficeSelect(office.id, { scrollToCard: true })}
        aria-label={`View ${office.city} office details`}
        className="group relative -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute left-1/2 top-[calc(100%+10px)] h-3 w-12 -translate-x-1/2 rounded-full bg-black/55 blur-md transition-all duration-300 group-hover:w-16" />

        <span
          className={cn(
            "absolute left-1/2 top-1/2 rounded-full bg-violet/25 blur-xl transition-all duration-300",
            isActive
              ? "h-18 w-18 -translate-x-1/2 -translate-y-1/2 opacity-100"
              : "h-12 w-12 -translate-x-1/2 -translate-y-1/2 opacity-70 group-hover:opacity-100"
          )}
        />

        <span
          className={cn(
            "absolute left-1/2 top-1/2 rounded-full border border-violet/40 bg-violet/15 transition-all duration-300",
            isActive
              ? "h-11 w-11 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft"
              : "h-8 w-8 -translate-x-1/2 -translate-y-1/2 opacity-75 group-hover:opacity-100"
          )}
        />

        <span
          className={cn(
            "relative grid place-items-center overflow-hidden rounded-full border border-white/70 bg-white shadow-[0_0_24px_rgba(109,204,18,0.55),0_12px_22px_rgba(0,0,0,0.36)] transition-all duration-300",
            isActive
              ? "h-10 w-10 scale-110"
              : "h-9 w-9 group-hover:scale-110"
          )}
        >
          <Image
            src="/logo_circle3.png"
            alt=""
            fill
            sizes="50px"
            className="relative z-[1] object-contain scale-125"
            aria-hidden="true"
          />
        </span>

        <span className="absolute left-1/2 top-full h-8 w-[2px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(140,255,34,0.8),transparent)]" />
      </button>

      <div
        className="pointer-events-none absolute left-0 top-0 z-[9]"
        style={{
          transform: `translate(clamp(-120px, ${office.labelOffset.x}px, 120px), clamp(-56px, ${office.labelOffset.y}px, 56px))`,
        }}
      >
        <div
          className={cn(
            "whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-semibold shadow-[0_18px_45px_rgba(0,0,0,0.40)] backdrop-blur-md transition-all duration-300 sm:text-[11px]",
            isActive
              ? "border-violet/40 bg-[#071006]/95 text-white"
              : "border-white/10 bg-[#071006]/82 text-white/70"
          )}
        >
          {office.city}
        </div>
      </div>
    </div>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.05] px-3 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white/72 sm:text-[11px]">
      {label}
    </div>
  );
}

function OfficePreview({ office }: { office: NetworkOffice }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [office.id]);

  if (!office.image || hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#ffffff_0%,#eef7e8_34%,#dcebd4_100%)]">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-violet/20 bg-white shadow-[0_20px_60px_rgba(81,167,10,0.16)]">
          <span className="font-display text-4xl font-bold text-violet">
            {office.city.charAt(0)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={office.image}
      alt={`${office.city} office`}
      fill
      sizes="(max-width: 1024px) 100vw, 40vw"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}

function projectCoordinates([
  longitude,
  latitude,
]: [number, number]): ProjectedPoint {
  const [x, y] = mercatorProject([longitude, latitude]);

  return {
    x: (x / 800) * 100,
    y: (y / 600) * 100,
  };
}

function mercatorProject([longitude, latitude]: [number, number]): [number, number] {
  const [centerLongitude, centerLatitude] = INDIA_CENTER;
  const [translateX, translateY] = INDIA_TRANSLATE;

  const clampLat = (value: number) => Math.max(Math.min(value, 89.5), -89.5);
  const lambda = ((longitude - centerLongitude) * Math.PI) / 180;
  const phi = (clampLat(latitude) * Math.PI) / 180;
  const centerPhi = (clampLat(centerLatitude) * Math.PI) / 180;
  const centerY = Math.log(Math.tan(Math.PI / 4 + centerPhi / 2));

  const x = translateX + INDIA_SCALE * lambda;
  const y = translateY - INDIA_SCALE * (Math.log(Math.tan(Math.PI / 4 + phi / 2)) - centerY);

  return [x, y];
}

function buildRoutePath(points: ProjectedPoint[]) {
  if (points.length === 0) {
    return "";
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];

    const controlX =
      (previous.x + current.x) / 2 + (index % 2 === 0 ? -3.5 : 3.5);

    const controlY = Math.min(
      Math.max((previous.y + current.y) / 2 - 6 + index * 1.4, 8),
      88
    );

    path += ` Q ${controlX} ${controlY} ${current.x} ${current.y}`;
  }

  return path;
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
