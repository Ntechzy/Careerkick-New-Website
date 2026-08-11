"use client";
import { motion } from "framer-motion";
import { Clock3, MapPin } from "lucide-react";
import { memo, useMemo } from "react";
import Map from "../shared/Map";

interface OfficeCardItem {
  id: string;
  name: string;
  branch: string;
  city: string;
  address: string;
  hours: string;
  href: string;
  center: [number, number];
}

const OFFICE_CARDS: OfficeCardItem[] = [
  {
    id: "kanpur",
    name: "Careerkick Services",
    branch: "Kanpur Branch",
    city: "Kanpur",
    address: "117/H, Pandu Nagar near JK, 1/606, Temple Kanpur, Kanpur Nagar, Uttar Pradesh, India, 208005",
    hours: "10 AM - 6 PM",
    href: "https://maps.app.goo.gl/C7fjCr7jsH5zcAPE8",
    center: [80.2894, 26.4783],
  },
  {
    id: "greater-noida",
    name: "Careerkick Services",
    branch: "Greater Noida Branch",
    city: "Greater Noida",
    address:
      "2nd floor, AA -007, Block A, Ansal Golf Link -1, Greater Noida, Uttar Pradesh 201315",
    hours: "10 AM - 6 PM",
    href: "https://maps.app.goo.gl/j23DFmnco28ps6T29",
    center: [77.4995, 28.4744],
  },
  {
    id: "gorakhpur",
    name: "Careerkick Services",
    branch: "Gorakhpur Branch",
    city: "Gorakhpur",
    address:
      "2nd floor, 401, LIG 1st St, near Bargadwa, Vikas Nagar, Gorakhpur, Uttar Pradesh 273007",
    hours: "10 AM - 6 PM",
    href: "https://maps.app.goo.gl/QzgpEZ2osVwjUfQK9",
    center: [83.3732, 26.7606],
  },
  {
    id: "indore",
    name: "Careerkick Services",
    branch: "Indore Branch",
    city: "Indore",
    address:
      "Apollo Trade center, 402, Geeta Bhawan, Indore, Madhya Pradesh 452001",
    hours: "10 AM - 6 PM",
    href: "https://maps.app.goo.gl/DqN6i7ZoypTeLGCT7",
    center: [75.8869, 22.7148],
  },
];

function OfficeLocationsComponent() {
  const officeNodes = useMemo(() => {
    return OFFICE_CARDS.map((office, index) => (
      <motion.article
        key={office.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          delay: index * 0.12,
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        whileHover={{ y: -6 }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-5"
      >
        <Map
          center={office.center}
          zoom={15}
          title={`${office.name} · ${office.branch}`}
          address={office.address}
          locationUrl={office.href}
          className="h-52"
        />

        <div className="mt-5">
          <h3 className="font-display text-xl font-semibold text-white">
            {office.city}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8cef32]">
            {office.branch}
          </p>

          <div className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-white/72">
            <MapPin className="mt-0.5 shrink-0 text-[#8cef32]" size={18} />
            <span>{office.address}</span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-white/72">
            <Clock3 size={16} className="text-[#8cef32]" />
            {office.hours}
          </div>
        </div>
      </motion.article>
    ));
  }, []);

  return (
    <section
      id="office-locations"
      className="relative w-full overflow-hidden bg-base px-6 py-28 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(81,167,10,0.16),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(142,236,50,0.12),transparent_24%),linear-gradient(180deg,rgba(6,18,4,0.96)_0%,rgba(5,7,4,1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/12 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]">
            Our locations
          </div>
          <h2 className="font-display text-4xl font-bold tracking-normal text-white sm:text-5xl">
            Our Office Presence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/72">
            Visit our branches and connect with counselors directly for
            personalized admission support.
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#51A70A] to-[#8cef32]" />
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-4">{officeNodes}</div>
      </div>
    </section>
  );
}

export default memo(OfficeLocationsComponent);
