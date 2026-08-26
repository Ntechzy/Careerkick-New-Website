import { Inter } from "next/font/google";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dashboard",
  display: "swap",
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell fontClassName={`${inter.variable} [font-family:var(--font-dashboard),Inter,sans-serif]`}>
      {children}
    </DashboardShell>
  );
}
