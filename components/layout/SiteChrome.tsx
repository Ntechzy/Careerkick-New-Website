"use client";

import { usePathname } from "next/navigation";
import { CareerkickChatBot } from "@/components/CareerkickChatBot";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <SmoothScrollProvider>
      <CursorGlow />
      <Navbar />
      <main className="overflow-x-hidden">{children}</main>
      <WhatsAppFloatingButton />
      <CareerkickChatBot />
      <Footer />
    </SmoothScrollProvider>
  );
}
