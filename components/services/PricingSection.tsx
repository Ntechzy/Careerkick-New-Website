"use client";

import { useState } from "react";

type Pricing = {
  title: string;
  description: string;
  price: string;
  image: string;
  highlight?: boolean;
};

const pricingData: Pricing[] = [
  {
    title: "Ayush Counselling",
    description: "Govt + Private Colleges",
    price: "₹25,000",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547635/ayush_lqnzhn.webp",
  },
  {
    title: "MBBS Counselling (Govt College)",
    description: "Complete admission support",
    price: "₹30,000",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547636/mbbs_govt_jfwmon.webp",
    highlight: true,
  },
  {
    title: "MBBS Counselling (Private College)",
    description: "Private college admission guidance",
    price: "₹50,000",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547637/mbbs_private_xlx12n.webp",
  },
  {
    title: "BDS / BSc Nursing / Veterinary / BPT",
    description: "All-inclusive counselling support",
    price: "₹25,000",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547636/bds_sldzxw.webp",
  },
];

const CONTACT_NUMBER = "917396062116";

export default function PricingSection() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleWhatsApp = (item: Pricing) => {
    const message = `Hello, I am interested in the ${item.title} plan priced at ${item.price}. Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${CONTACT_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );
    setOpenMenuIndex(null);
  };

  const handleCall = () => {
    window.location.href = `tel:+${CONTACT_NUMBER}`;
    setOpenMenuIndex(null);
  };

  return (
    <section id="pricing" className="relative scroll-mt-28 overflow-hidden bg-[#fafaf6] px-4 py-16 text-slate-900 sm:py-20 md:px-8 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[78%] -translate-x-1/2 rounded-full bg-[#56b016]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#56b016]/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.4em] text-[#56b016] sm:text-sm">
            Paid Counselling
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-950 sm:text-4xl md:text-5xl">
            Designed for Medical & Allied Courses
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Choose the support that matches your course, budget, and admission
            goals with a clean and practical counselling plan.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {pricingData.map((item, i) => (
            <article
              key={i}
              className={`group relative overflow-hidden rounded-[1.75rem] border bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 ${
                item.highlight
                  ? "border-[#56b016]/30 ring-1 ring-[#56b016]/20"
                  : "border-slate-200"
              }`}
            >
              <div className="relative h-56 overflow-hidden sm:h-60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.35))]" />
                {item.highlight && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#56b016] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(86,176,22,0.3)]">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="flex h-full flex-col p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold text-slate-950 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>

                <div className="mt-5">
                  <div className="font-display text-3xl font-bold text-[#56b016]">
                    {item.price}
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                    Starting price
                  </p>
                </div>

                <div className="relative mt-6">
                  {openMenuIndex === i && (
                    <div className="absolute bottom-full left-0 right-0 z-20 mb-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                      <button
                        onClick={handleCall}
                        className="flex w-full items-center justify-center gap-2 border-b border-slate-100 py-3 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        Call Now
                      </button>
                      <button
                        onClick={() => handleWhatsApp(item)}
                        className="flex w-full items-center justify-center gap-2 py-3 px-4 text-sm font-medium text-[#25D366] transition-colors hover:bg-slate-50"
                      >
                        WhatsApp
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setOpenMenuIndex(openMenuIndex === i ? null : i)
                    }
                    className={`w-full rounded-full border px-4 py-3 text-sm font-semibold transition ${
                      item.highlight
                        ? "border-[#56b016] bg-[#56b016] text-white hover:bg-[#4b9914]"
                        : "border-[#56b016]/25 bg-[#56b016]/8 text-[#56b016] hover:bg-[#56b016]/14"
                    }`}
                  >
                    Get Guidance
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
