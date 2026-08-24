import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { CareerkickChatBot } from "@/components/CareerkickChatBot";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import StoreProvider from "./StoreProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
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
    icon: [{ url: "/favicon-c.png", type: "image/png" }],
    shortcut: ["/favicon-c.png"],
    apple: [{ url: "/favicon-c.png", type: "image/png" }],
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
    <html lang="en" className={cn(jakarta.variable)}>
      <body>
        <StoreProvider>
          <SmoothScrollProvider>
            <CursorGlow />
            <Navbar />
            <main className="overflow-x-hidden">{children}</main>
            <WhatsAppFloatingButton />
            <CareerkickChatBot />
            <Footer />
          </SmoothScrollProvider>
        </StoreProvider>

        <Script
          type="module"
          src="https://ntechzy.in/api/v1/student-form/form.js"
          path='["/", "/dynamicForm/index.html", "/apply-now", "/e-books/form", "/contact"]'
          divid="formsID7375"
          courses='["Select Course","BAMS","BHMS","BUMS","MBBS","BDS"]'
          styles="basic"
          logo={`${siteConfig.url}/logo.png`}
          contact="+91-7393062116"
        />
      </body>
    </html>
  );
}
