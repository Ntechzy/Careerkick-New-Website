import { Inter } from "next/font/google";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { cookies } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dashboard",
  display: "swap",
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const role = cookies().get("careerkick-dashboard-role")?.value;

  return (
    <DashboardShell
      fontClassName={`${inter.variable} [font-family:var(--font-dashboard),Inter,sans-serif]`}
      initialRole={role === "student" ? "student" : "admin"}
    >
      {children}
    </DashboardShell>
  );
}
