"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type College = {
  name: string;
  logo: string;
};

const colleges: College[] = [
  {
    name: "Naiminath Ayurvedic Medical College, Hospital and Research Centre",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100978/naiminath-ayurvedic_ialdyt.png",
  },
  { name: "Major SD Singh University, Farrukhabad", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100983/uni-sd_shzk3q.png" },
  {
    name: "Major S.D. Singh Ayurvedic Medical College",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100977/MajorSD_xhosne.png",
  },
  {
    name: "Krishna Ayurvedic Medical College & Hospital",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100974/Krishna_mjnjve.png",
  },
  {
    name: "Maharana Pratap College of Ayurveda and Medical, Bithoor & Mandhana",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100975/maharana-pratap_bru8im.png",
  },
  { name: "MD Ayurvedic College", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100977/MD_oeuksm.png" },
  { name: "Mangalayatan University", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100976/Managalayatan_xj8vur.png" },
  {
    name: "Bapu Ayurvedic Medical College and Hospital",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100966/bapu-ayurvedic_y5ao7h.png",
  },
  {
    name: "Sarvdev Ayurvedic Medical College, Azamgarh",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100981/sarvdev_m9imvz.png",
  },
  {
    name: "Dr. Shakuntala Ayurvedic Medical College",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100982/shakuntala_mojp1v.png",
  },
  {
    name: "SAS Ayurvedic Medical College and Hospital",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100981/sas_mcqm4m.png",
  },
  { name: "RK Ayurvedic Medical College & Hospital", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100980/RK_roziwe.png" },
  { name: "Naiminath Homeopathy Medical College", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100978/NHMC_q1lu4u.png" },
  {
    name: "Dr. Vijay Ayurvedic Medical College & Hospital",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100983/Vijay_l9fcxh.png",
  },
  { name: "Dental College, Azamgarh", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100972/Dental_qi5gsd.png" },
  {
    name: "Bharat Ayurved Medical College, Hospital & Research Centre, Muzaffarnagar",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100968/bharat-ayurvedic_cvaa5d.png",
  },
  { name: "Shree Om University", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100979/om_uiw0ny.png" },
  {
    name: "Baba Vishwanath Ayurvedic Medical College",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100967/baba-vishwanath_hjwked.png",
  },
  {
    name: "Shri Dhanvantari P.G. Ayurved Medical College",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100975/Dhanvantri_ktyfdk.png",
  },
  {
    name: "Vimla Group- Ayurvedic Medical College & Hospital",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100984/Vimla_oyj259.png",
  },
  {
    name: "Babu Yugraj Singh Ayurvedic Medical College & Hospital",
    logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100964/babu-yugraj_sbgouh.png",
  },
  { name: "ITM Ayurvedic Medical College & Hospital", logo: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784100973/itm_uoyvql.png" },
];

const rows = [colleges.slice(0, 12), colleges.slice(12, 24)];

const duplicatedRows = rows.map((row) => [...row, ...row]);

const cardClassName =
  "group relative mx-2 flex h-[170px] w-[156px] flex-shrink-0 cursor-default flex-col items-center justify-between rounded-2xl border border-white/10 px-4 py-4 text-center transition-all duration-500 glass glass-hover hover:neon-glow sm:mx-3 sm:h-[210px] sm:w-[190px] sm:px-5 sm:py-5";

const PartnerMarquee = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="clients"
      className="relative overflow-hidden bg-base py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="absolute right-0 top-8 h-96 w-96 rounded-full bg-[#6DCC12]/8 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative z-10 container mx-auto mb-10 px-4 sm:mb-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-3 text-center sm:space-y-4"
        >
          <span className="section-kicker">Trusted Network</span>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            COLLEGES WITH WHICH WE HAVE{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              PARTNERED
            </span>
          </h2>
        </motion.div>
      </div>

      <div className="relative z-10 [perspective:1400px]">
        <div className="absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-base to-transparent sm:w-20 lg:w-32" />
        <div className="absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-base to-transparent sm:w-20 lg:w-32" />
        <div className="absolute left-1/2 top-1/2 h-40 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51A70A]/12 blur-3xl" />

        <div className="space-y-4 sm:space-y-5">
          {duplicatedRows.map((row, rowIndex) => {
            const movesLeft = rowIndex === 0;

            return (
              <motion.div
                key={`row-${rowIndex}`}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.15 + rowIndex * 0.12 }}
                className="overflow-hidden"
              >
                <motion.div
                  className="flex w-max"
                  animate={{
                    x: movesLeft ? ["0%", "-50%"] : ["-50%", "0%"],
                  }}
                  transition={{
                    duration: movesLeft ? 24 : 26,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {row.map((college, index) => (
                    <motion.div
                      key={`${college.name}-${rowIndex}-${index}`}
                      whileHover={{
                        y: -6,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.03,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={cardClassName}
                      style={{
                        transformStyle: "preserve-3d",
                        rotateX: "12deg",
                        boxShadow:
                          "0 20px 45px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px rgba(81,167,10,0.10)",
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-[#51A70A]/12 opacity-80" />
                      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <div
                        className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_rgba(0,0,0,0.18)] sm:h-28 sm:w-28"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white/95 p-1.5">
                          <img
                            src={college.logo}
                            alt={`${college.name} logo`}
                            className="h-full w-full rounded-full object-cover object-center opacity-100"
                            onError={(event) => {
                              event.currentTarget.src = "/logo.png";
                              event.currentTarget.className = "h-full w-full rounded-full object-contain object-center p-2 opacity-100";
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className="relative block text-[11px] font-medium leading-snug text-white/70 sm:text-sm"
                        style={{ transform: "translateZ(24px)" }}
                      >
                        {college.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
