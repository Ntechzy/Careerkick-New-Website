"use client";

import { useEffect, useState } from "react";

type Achievement = {
  id: number;
  label: string;
  title: string;
  points: string[];
  video: string;
  stats: { label: string; value: number }[];
};

const data: Achievement[] = [
  {
    id: 1,
    label: "Students Guided",
    title: "Students Positively Guided",
    points: [
      "Guided 10 Lakh+ students across India",
      "Trusted by students and parents",
      "Clear career direction after BAMS",
      "Support at every step",
    ],
    video:
      "https://res.cloudinary.com/dhlqc0ymy/video/upload/v1775900897/students_guided_sihtnx.mp4",
    stats: [{ label: "Students Guided", value: 1000000 }],
  },
  {
    id: 2,
    label: "Counselling Experience",
    title: "Our Counselling Experience",
    points: [
      "Our high experience makes us the best choice",
      "Talk directly with experts",
      "Get answers to all your doubts",
      "Step-by-step career planning",
    ],
    video:
      "https://res.cloudinary.com/dhlqc0ymy/video/upload/v1775555657/experience_upjmm7.mp4",
    stats: [{ label: "Years of experience", value: 8 }],
  },
  {
    id: 3,
    label: "Personal Guidance",
    title: "1-to-1 Counselling",
    points: [
      "One-to-one counselling sessions",
      "Talk directly with experts",
      "Get answers to all your doubts",
      "Step-by-step career planning",
    ],
    video:
      "https://res.cloudinary.com/dhlqc0ymy/video/upload/v1775547551/counselling_uddtho.mp4",
    stats: [{ label: "Counselling one to one", value: 10000 }],
  },
];

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / value), 20);

    const timer = setInterval(() => {
      start += Math.ceil(value / 40);
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export default function AchievementsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(81,167,10,0.12),transparent_40%),linear-gradient(180deg,#071007_0%,#0b130a_55%,#050805_100%)] py-16 text-white sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[78%] -translate-x-1/2 rounded-full bg-[#56b016]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/6 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.4em] text-[#8cef32] sm:text-sm">
            Achievements
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:mt-4 sm:text-5xl">
            Proven Results & <span className="text-[#8cef32]">Real Impact</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/68 sm:text-base lg:text-white">
            A few of the outcomes that show how we support students with more
            confidence, better planning, and clearer decisions.
          </p>
        </div>

        <div className="mb-8 flex w-full flex-col gap-2 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03)),rgba(8,12,7,0.9)] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:mb-10 sm:w-fit sm:flex-row sm:gap-3 sm:rounded-full sm:px-3 sm:py-3">
          {data.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              className={`w-full rounded-full px-4 py-3 text-center text-sm font-medium transition sm:w-auto sm:px-5 sm:py-2.5 ${
                active === i
                  ? "bg-[#56b016] text-white shadow-[0_10px_24px_rgba(86,176,22,0.25)]"
                  : "text-white/65 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-8 lg:hidden">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <video
              key={data[active].video}
              src={data[active].video}
              autoPlay
              muted
              loop
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,5,0.05),rgba(4,8,5,0.55))]" />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(9,14,8,0.94),rgba(16,24,14,0.86))] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6 lg:p-8">
            <h3 className="mb-4 text-center font-display text-xl font-semibold text-[#8cef32] sm:mb-6 sm:text-left">
              {data[active].title}
            </h3>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {data[active].points.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-left text-sm leading-6 text-white/78"
                >
                  <span className="mt-0.5 shrink-0 text-[#8cef32]">✦</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {data[active].stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-4 text-center sm:text-left"
                >
                  <div className="font-display text-2xl font-bold text-[#8cef32]">
                    <Counter value={stat.value} />+
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 shadow-[0_22px_70px_rgba(0,0,0,0.38)] lg:block">
            <video
              key={data[active].video}
              src={data[active].video}
              autoPlay
              muted
              loop
              className="h-[34rem] w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,5,0.05),rgba(4,8,5,0.45))]" />
          </div>
        </div>
      </div>
    </section>
  );
}
