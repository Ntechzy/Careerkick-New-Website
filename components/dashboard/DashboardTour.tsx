"use client";

import { Joyride, STATUS, type EventData, type Step } from "react-joyride";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export const DASHBOARD_TOUR_EVENT = "careerkick-dashboard-start-tour";

const DASHBOARD_TOUR_COMPLETED_KEY = "careerkick-dashboard-tour-completed";

const tourSteps: Step[] = [
  {
    target: '[data-tour="dashboard-header"]',
    title: "Control Center",
    content: "This header keeps you oriented inside the secure dashboard. On mobile, the theme toggle is available here.",
    placement: "bottom",
  },
  {
    target: '[data-tour="dashboard-navigation"]',
    title: "Dashboard Navigation",
    content: "Use the sidebar on desktop or the bottom navigation on mobile to switch between Dashboard, Plans, Coupon Codes, and Transactions.",
    placement: "auto",
  },
  {
    target: '[data-tour="stat-active-plans"]',
    title: "Active Plans",
    content: "This card shows how many counselling plans are currently active. Select it to open the Plans page.",
    placement: "bottom",
  },
  {
    target: '[data-tour="stat-students"]',
    title: "Students",
    content: "This card shows the number of students with payment records. Select it to review student transactions.",
    placement: "bottom",
  },
  {
    target: '[data-tour="stat-revenue"]',
    title: "Revenue",
    content: "This card shows the exact amount collected. It also opens the Transactions page.",
    placement: "bottom",
  },
  {
    target: '[data-tour="dashboard-overview"]',
    title: "Dashboard Overview",
    content: "Use this section as a quick operating guide for the dashboard. You can restart this tour from here anytime.",
    placement: "top",
  },
  {
    target: '[data-tour="dashboard-tour-button"]',
    title: "Restart The Tour",
    content: "Select this button whenever you want to see the guided dashboard walkthrough again.",
    placement: "bottom",
  },
  {
    target: '[data-tour="nav-plans"]',
    title: "Plans",
    content: "Open Plans to create, view, update, and delete counselling plans, including pricing and partial payment amounts.",
    placement: "auto",
  },
  {
    target: '[data-tour="nav-coupons"]',
    title: "Coupon Codes",
    content: "Open Coupon Codes to pick a plan, create coupons, validate codes, edit coupon values, and remove old coupons.",
    placement: "auto",
  },
  {
    target: '[data-tour="nav-transactions"]',
    title: "Transactions",
    content: "Open Transactions to review student payment records, view details, update annotations, and delete records when required.",
    placement: "auto",
  },
];

const studentTourSteps: Step[] = [
  {
    target: '[data-tour="dashboard-header"]',
    title: "Control Center",
    content: "This header keeps you oriented inside your dashboard. On mobile, the theme toggle is available here.",
    placement: "bottom",
  },
  {
    target: '[data-tour="dashboard-navigation"]',
    title: "Dashboard Navigation",
    content: "Use the sidebar on desktop or the bottom navigation on mobile to switch between Dashboard and My Transactions.",
    placement: "auto",
  },
  {
    target: '[data-tour="stat-my-transactions"]',
    title: "My Transactions",
    content: "This card shows how many payment records are available in your account.",
    placement: "bottom",
  },
  {
    target: '[data-tour="stat-amount-paid"]',
    title: "Amount Paid",
    content: "This card shows the total paid amount from your transaction records.",
    placement: "bottom",
  },
  {
    target: '[data-tour="dashboard-overview"]',
    title: "Dashboard Overview",
    content: "Use this section as a quick operating guide for your dashboard. You can restart this tour from here anytime.",
    placement: "top",
  },
  {
    target: '[data-tour="dashboard-tour-button"]',
    title: "Restart The Tour",
    content: "Select this button whenever you want to see the guided dashboard walkthrough again.",
    placement: "bottom",
  },
  {
    target: '[data-tour="nav-my-transactions"]',
    title: "My Transactions",
    content: "Open My Transactions to review payment status, transaction references, and payment dates.",
    placement: "auto",
  },
];

export function DashboardTour({ role }: { role: "admin" | "student" }) {
  const pathname = usePathname();
  const [run, setRun] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const steps = useMemo<Step[]>(
    () => [
      ...(role === "student" ? studentTourSteps : tourSteps),
      {
        target: isDesktop ? '[data-tour="dashboard-account-actions"]' : '[data-tour="dashboard-mobile-theme"]',
        title: isDesktop ? "Theme And Logout" : "Theme Control",
        content: isDesktop
          ? "Use the controls at the bottom of the sidebar to switch light or dark mode and logout when work is complete."
          : "Use this header button to switch light or dark mode on mobile.",
        placement: "auto",
      },
    ],
    [isDesktop, role],
  );

  useEffect(() => {
    function updateViewport() {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    }

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    function startTour() {
      if (pathname !== "/dashboard") {
        window.location.assign("/dashboard?tour=start");
        return;
      }

      setRun(false);
      window.setTimeout(() => setRun(true), 120);
    }

    window.addEventListener(DASHBOARD_TOUR_EVENT, startTour);

    return () => {
      window.removeEventListener(DASHBOARD_TOUR_EVENT, startTour);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/dashboard") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const requestedTour = params.get("tour") === "start";
    const tourCompleted = window.localStorage.getItem(DASHBOARD_TOUR_COMPLETED_KEY) === "true";

    if (requestedTour || !tourCompleted) {
      window.setTimeout(() => setRun(true), 500);
    }
  }, [pathname]);

  function handleEvent(data: EventData) {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      setRun(false);
      window.localStorage.setItem(DASHBOARD_TOUR_COMPLETED_KEY, "true");
    }
  }

  return (
    <Joyride
      continuous
      onEvent={handleEvent}
      options={{
        arrowColor: "var(--dash-surface)",
        backgroundColor: "var(--dash-surface)",
        beaconSize: 36,
        buttons: ["back", "close", "primary", "skip"],
        overlayClickAction: false,
        overlayColor: "rgba(2, 6, 23, 0.58)",
        primaryColor: "#16a34a",
        scrollOffset: 96,
        showProgress: true,
        textColor: "var(--dash-text)",
        width: 380,
        zIndex: 10000,
      }}
      run={run}
      steps={steps}
      styles={{
        tooltip: {
          border: "1px solid var(--dash-border)",
          borderRadius: 12,
          boxShadow: "var(--dash-shadow)",
          maxWidth: "calc(100vw - 32px)",
        },
        tooltipTitle: {
          color: "var(--dash-text)",
          fontSize: 18,
          fontWeight: 900,
        },
        tooltipContent: {
          color: "var(--dash-muted)",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1.6,
          padding: "12px 0",
        },
        buttonPrimary: {
          borderRadius: 8,
          fontWeight: 800,
        },
        buttonBack: {
          color: "var(--dash-muted)",
          fontWeight: 800,
        },
        buttonSkip: {
          color: "var(--dash-muted)",
          fontWeight: 800,
        },
      }}
    />
  );
}
