"use client";
import React from "react";
import { motion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/contactLinks";

const portfolioStoryUrl = "https://youtube.com/shorts/h7h0Qx22iWs?si=YQwXv2QFdAMj2th7";

const HeroPortfolio = () => {
  return (
    <section className="section-shell relative flex min-h-screen w-full items-center overflow-hidden px-4 py-12 sm:py-16 md:px-8 lg:py-20">
      <div className="gradient-mesh absolute inset-0 opacity-95" />
      <div className="noise-overlay absolute inset-0 opacity-100" />
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-primary/12 blur-[110px]" />
      <div className="absolute -right-28 top-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-glow opacity-50 blur-3xl" />
      <div className="grid-overlay absolute inset-0 opacity-80" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 xl:gap-20">
        {/* Left Content - Shifted up for better viewport visibility */}
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left -mt-8 lg:-mt-16">
          <div className="section-kicker">Portfolio showcase</div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-normal text-white sm:text-5xl md:text-6xl xl:text-7xl">
            We help BAMS colleges <br className="hidden sm:block" />
            <span className="relative inline-block mt-1 lg:mt-0">
              fill seats faster
            </span>{" "}
            <br className="block sm:hidden" />
            with Careerkick
          </h1>

          <p className="section-copy relative z-30 mt-5 max-w-2xl text-sm font-semibold text-white/90 sm:mt-7 sm:text-base md:text-lg lg:text-xl lg:text-white" style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)", mixBlendMode: "normal" }}>
            Strategy, NEET funnel marketing, and LMS automation built for
            Ayurveda colleges to convert enquiries into confirmed BAMS
            admissions.
          </p>

          <div className="relative z-30 mt-8 flex w-full flex-col items-center gap-4 sm:flex-row">
            <a
              href={getWhatsAppLink("Hello, I want to book a Careerkick demo.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-8 py-4 font-display text-base font-bold text-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow-violet sm:w-auto sm:text-lg"
            >
              Book a demo
            </a>
            <a
              href={portfolioStoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white sm:w-auto"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                Play
              </span>
              Watch Student Stories
            </a>
          </div>
        </div>

        {/* Right Side - Phone Mockup */}
        <div className="relative flex w-full items-center justify-center pt-8 lg:pt-0">
          {/* Responsive aspect ratio container scaled down to fit perfectly in one viewport */}
          <div className="relative w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] xl:max-w-[300px] aspect-[421/852]">
            {/* SVG Phone Frame */}
            <div
              className="absolute inset-0 z-20 h-full w-full pointer-events-none invert filter"
              style={{
                backgroundImage: `url("data:image/svg+xml;base64,PHN2ZwogICAgICB3aWR0aD0iNDIxIgogICAgICBoZWlnaHQ9Ijg1MiIKICAgICAgdmlld0JveD0iMCAwIDQyMSA4NTIiCiAgICAgIGZpbGw9Im5vbmUiCiAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgID4KICAgICAgPHBhdGgKICAgICAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik03MyAwSDM0OEMzODYuNjYgMCA0MTggMzEuMzQwMSA0MTggNzBWNzgyQzQxOCA4MjAuNjYgMzg2LjY2IDg1MiAzNDggODUySDczQzM0LjM0MDEgODUyIDMgODIwLjY2IDMgNzgyVjcwQzMgMzEuMzQwMSAzNC4zNDAxIDAgNzMgMFpNMzQ4IDZINzNDMzcuNjUzOCA2IDkgMzQuNjUzOCA5IDcwVjc4MkM5IDgxNy4zNDYgMzcuNjUzOCA4NDYgNzMgODQ2SDM0OEMzODMuMzQ2IDg0NiA0MTIgODE3LjM0NiA0MTIgNzgyVjcwQzQxMiAzNC42NTM4IDM4My4zNDYgNiAzNDggNloiCiAgICAgICAgZmlsbD0iYmxhY2siCiAgICAgIC8+CiAgICAgIDxyZWN0CiAgICAgICAgeD0iMzE4IgogICAgICAgIHdpZHRoPSIxMCIKICAgICAgICBoZWlnaHQ9IjYiCiAgICAgICAgZmlsbD0iYmxhY2siCiAgICAgICAgZmlsbC1vcGFjaXR5PSIwLjIiCiAgICAgIC8+CiAgICAgIDxyZWN0CiAgICAgICAgeD0iOTMiCiAgICAgICAgeT0iODQ2IgogICAgICAgIHdpZHRoPSIxMCIKICAgICAgICBoZWlnaHQ9IjYiCiAgICAgICAgZmlsbD0iYmxhY2siCiAgICAgICAgZmlsbC1vcGFjaXR5PSIwLjIiCiAgICAgIC8+CiAgICAgIDxyZWN0CiAgICAgICAgeD0iMyIKICAgICAgICB5PSI5MCIKICAgICAgICB3aWR0aD0iNiIKICAgICAgICBoZWlnaHQ9IjEwIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgIGZpbGwtb3BhY2l0eT0iMC4yIgogICAgICAvPgogICAgICA8cmVjdAogICAgICAgIHg9IjQxMiIKICAgICAgICB5PSI5MCIKICAgICAgICB3aWR0aD0iNiIKICAgICAgICBoZWlnaHQ9IjEwIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgIGZpbGwtb3BhY2l0eT0iMC4yIgogICAgICAvPgogICAgICA8cmVjdAogICAgICAgIHg9IjMiCiAgICAgICAgeT0iNzUyIgogICAgICAgIHdpZHRoPSI2IgogICAgICAgIGhlaWdodD0iMTAiCiAgICAgICAgZmlsbD0iYmxhY2siCiAgICAgICAgZmlsbC1vcGFjaXR5PSIwLjIiCiAgICAgIC8+CiAgICAgIDxyZWN0CiAgICAgICAgeD0iNDEyIgogICAgICAgIHk9Ijc1MiIKICAgICAgICB3aWR0aD0iNiIKICAgICAgICBoZWlnaHQ9IjEwIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgIGZpbGwtb3BhY2l0eT0iMC4yIgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIGZpbGwtcnVsZT0iZXZlbm9kZCIKICAgICAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgZD0iTTQxNy45NzEgMjY2SDQxOC45ODFDNDIwLjA5NiAyNjYgNDIxIDI2Ni44OTUgNDIxIDI2OFYzNjRDNDIxIDM2NS4xMDUgNDIwLjA5NiAzNjYgNDE4Ljk4MSAzNjZINDE3Ljk3MVYyNjZaIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIGZpbGwtcnVsZT0iZXZlbm9kZCIKICAgICAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgZD0iTTAgMzAyQzAgMzAwLjg5NSAwLjkwNDAyIDMwMCAyLjAxOTE4IDMwMEgzLjAyODc4VjM2M0gyLjAxOTE4QzAuOTA0MDIgMzYzIDAgMzYyLjEwNSAwIDM2MVYzMDJaIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIGZpbGwtcnVsZT0iZXZlbm9kZCIKICAgICAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgZD0iTTAgMjIzQzAgMjIxLjg5NSAwLjkwNDAyIDIyMSAyLjAxOTE4IDIyMUgzLjAyODc4VjI4NEcyLjAxOTE4QzAuOTA0MDIgMjg0IDAgMjgzLjEwNSAwIDI4MlYyMjNaIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIGZpbGwtcnVsZT0iZXZlbm9kZCIKICAgICAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgZD0iTTAgMTYyQzAgMTYwLjg5NSAwLjkwNDAyIDE2MCAyLjAxOTE4IDE2MEgzLjAyODc4VjE5M0gyLjAxOTE4QzAuOTA0MDIgMTkzIDAgMTkyLjEwNSAwIDE5MVYxNjJaIgogICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAvPgogICAgPC9zdmc+Cg==")`,
                backgroundSize: "100% 100%", // Fit container exactly
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {/* Screen Content (Single Image) properly aligned via percentages inside frame */}
            <div 
              className="glass neon-glow-strong absolute z-10 overflow-hidden rounded-[26px] sm:rounded-[28px] md:rounded-[30px] lg:rounded-[32px]"
              style={{
                left: "3.2%",
                top: "1.6%",
                width: "93.6%",
                height: "96.8%"
              }}
            >
              <img
                src="https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784095517/mobile_vi7psd.png"
                alt="App Preview"
                className="h-full w-full object-cover object-top"
                onError={(event) => {
                  event.currentTarget.src = "/logo-bg.png";
                  event.currentTarget.className = "h-full w-full bg-background object-contain p-8";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPortfolio;
