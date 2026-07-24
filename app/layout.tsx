import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { IntroAnimation } from "@/components/IntroAnimation";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Education",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(jakarta.variable, jetbrains.variable)}>
      <body>
        <SmoothScrollProvider>
          <IntroAnimation />
          <CursorGlow />
          <Navbar />
          <main className="overflow-x-hidden">{children}</main>
          <WhatsAppFloatingButton />
          <Footer />
        </SmoothScrollProvider>
        <Script
          id="student-form-loader"
          type="module"
          src="https://ntechzy.in/api/v1/student-form/form.js"
          data-path='["/", "/dynamicForm/index.html", "/apply-now", "/e-books/form", "/contact"]'
          data-divid="formsID7375"
          data-courses='["Select Course","BAMS","BHMS","BUMS","MBBS","BDS"]'
          data-styles="basic"
          data-logo={`${siteConfig.url}/logo.png`}
          data-contact="+91-7524085485"
        ></Script>
      </body>
    </html>
  );
}
