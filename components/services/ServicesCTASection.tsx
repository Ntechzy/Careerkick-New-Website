"use client";
import { Play, Phone } from "lucide-react";
import { useRef } from "react";

export default function ServicesCTASection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#FAFAFA] text-slate-900 overflow-hidden py-12 lg:py-0">
      {/* ===== Background Decorative Elements ===== */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-[#56b016]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 bg-[#56b016]/5 blur-[100px] rounded-full" />
      </div>

      {/* ===== Subtle Grid Overlay (Optional for Texture) ===== */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[rgba(0,0,0,0.1)_1px] mask-[radial-gradient(ellipse_at_center,white,transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* ================= LEFT CONTENT (7 Cols) ================= */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
          <div className="mb-6 lg:mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#56b016] sm:text-sm">
              Premium Medical Guidance
            </p>
          </div>

          <h1 className="px-2 text-3xl font-extrabold tracking-tight text-black sm:px-0 sm:text-5xl">
            Climb Your Way <br className="hidden sm:block" />
            to a <span className="text-[#56b016]">Top Medical</span> College
          </h1>

          <p className="mt-3 max-w-2xl px-4 text-base text-slate-600 sm:mt-4 sm:px-0 sm:text-lg">
            Get personalized guidance, proven strategies, and a clear path to
            crack <span className="font-semibold text-slate-900">NEET</span>{" "}
            with the confidence of a topper.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto px-4 sm:px-0">
            <a
              href="tel:7396062116"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#56b016] text-white font-bold shadow-[0_10px_20px_-10px_rgba(86,176,22,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(86,176,22,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Journey
              <Phone size={18} />
            </a>

            <a
              href="https://youtu.be/b-0_cI32OvA?si=IzN8PwOP04n0BIt1"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-[#56b016]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center rounded-full bg-[#56b016]/10 text-[#56b016]">
                <Play size={16} fill="currentColor" />
              </div>
              Watch Video
            </a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 mt-12 lg:mt-16 border-t border-slate-200 pt-8 sm:pt-10 w-full text-center lg:text-left sm:divide-x sm:divide-slate-100">
            {/* Stat 1 */}
            <div className="flex flex-col items-center lg:items-start sm:pr-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tabular-nums tracking-tight">
                10 Lakhs+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400 mt-2 leading-tight">
                Students Guided across{" "}
                <br className="hidden sm:block lg:hidden" /> India
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center lg:items-start sm:pl-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tabular-nums tracking-tight">
                1 Lakh+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400 mt-2 leading-tight">
                Students allotted to top{" "}
                <br className="hidden sm:block lg:hidden" /> medical colleges
              </span>
            </div>

            {/* Stat 3 - Center with borders */}
            <div className="flex flex-col items-center lg:items-start sm:px-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tabular-nums tracking-tight">
                9+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400 mt-2 leading-tight">
                Years of counselling experience
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT (5 Cols) ================= */}
        <div className="lg:col-span-5 relative group order-1 lg:order-2 px-4 sm:px-0">
          {/* Decorative Ring */}
          <div className="absolute -inset-4 border border-[#56b016]/10 rounded-4xl scale-95 group-hover:scale-100 transition-transform duration-700" />

          {/* Main Video Wrapper */}
          <div className="relative bg-white p-2 rounded-[1.8rem] shadow-2xl shadow-black/5 border border-white max-w-100 mx-auto lg:max-w-none">
            <div className="relative rounded-[1.4rem] overflow-hidden aspect-4/5 lg:aspect-3/4 bg-slate-100 shadow-inner">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/dhlqc0ymy/video/upload/v1775547730/cta_eoxwuj.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />

              {/* High-end Overlay effect */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating Element */}
          <div className="absolute -bottom-6 -right-2 h-16 w-16 md:h-24 md:w-24 bg-[#56b016] rounded-2xl flex items-center justify-center shadow-xl rotate-12 sm:flex">
            <span className="text-white font-black text-lg md:text-2xl tracking-tighter">
              NEET
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
