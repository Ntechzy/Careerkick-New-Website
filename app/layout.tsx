import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { IntroAnimation } from "@/components/IntroAnimation";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Careerkick | Best NEET Counseling Platform in India",
  description: "Get expert NEET counselling for MBBS in India with accurate college prediction, personalized guidance, and complete admission support for NEET 2026.",
  openGraph: {
    title: "Careerkick | Best NEET Counseling Platform in India",
    description: "Expert MBBS admission counselling, college predictor, and end-to-end NEET support for students and parents.",
    type: "website",
    url: "https://careerkick.in",
    siteName: "Careerkick"
  },
  twitter: {
    card: "summary_large_image",
    title: "Careerkick | Best NEET Counseling Platform in India",
    description: "NEET counselling simplified with expert guidance and full admission support."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(jakarta.variable, jetbrains.variable)}>
      <body>
        <IntroAnimation />
        <CursorGlow />
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
        <WhatsAppFloatingButton />
        <Footer />
      </body>
    </html>
  );
}

