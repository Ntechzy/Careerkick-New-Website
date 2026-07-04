import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#050704",
        surface: "#0B1009",
        "surface-2": "#121A10",
        border: "#26351F",
        violet: "#51A70A",
        "violet-glow": "#6DCC12",
        cyan: "#51A70A",
        magenta: "#8CA0FF",
        amber: "#FFD15C",
        "text-primary": "#FFFFFF",
        "text-muted": "#B5C8C0",
        "text-faint": "#667E9F"
      },
      fontFamily: {
        display: ["var(--font-clash)", "Plus Jakarta Sans", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"]
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.1" }],
        sm: ["0.875rem", { lineHeight: "1.4" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.25rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["1.875rem", { lineHeight: "1.2" }],
        "4xl": ["2.25rem", { lineHeight: "1.15" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "0.95" }],
        "9xl": ["8rem", { lineHeight: "0.9" }]
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "32px"
      },
      boxShadow: {
        "glow-violet": "0 0 60px #51A70A3D, 0 0 120px #6DCC1217",
        "glow-cyan": "0 0 60px #51A70A33, 0 0 120px #6DCC1211",
        card: "0 4px 24px #00000066, 0 1px 3px #0000004D",
        elevated: "0 20px 60px #00000099, 0 4px 12px #0000004D"
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #2F7804 0%, #51A70A 48%, #6DCC12 100%)",
        "gradient-hero": "radial-gradient(ellipse at 20% 50%, #51A70A2E 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #6DCC1224 0%, transparent 60%)",
        "gradient-glow": "radial-gradient(circle, #51A70A44 0%, transparent 70%)",
        "gradient-card": "linear-gradient(135deg, #0B1009 0%, #121A10 100%)"
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marqueeReverse var(--marquee-duration, 40s) linear infinite",
        float: "float 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 4s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "scroll-dot": "scrollDot 1.7s ease-in-out infinite"
      },
      spacing: {
        section: "120px",
        "section-mobile": "80px"
      }
    }
  },
  plugins: [
    typography,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".bg-gradient-brand": { backgroundImage: "linear-gradient(135deg, #2F7804 0%, #51A70A 48%, #6DCC12 100%)" },
        ".bg-gradient-hero": { backgroundImage: "radial-gradient(ellipse at 20% 50%, #51A70A2E 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #6DCC1224 0%, transparent 60%)" },
        ".bg-gradient-glow": { backgroundImage: "radial-gradient(circle, #51A70A44 0%, transparent 70%)" },
        ".bg-gradient-card": { backgroundImage: "linear-gradient(135deg, #0B1009 0%, #121A10 100%)" }
      });
    })
  ]
};

export default config;

