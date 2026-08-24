"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { StudentFormLoader } from "@/components/StudentFormLoader";
import { cn } from "@/lib/utils";

const popupFormId = "globalLeadPopupForm";

export function GlobalLeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const formPaths = useMemo(() => [pathname || "/"], [pathname]);

  useEffect(() => {
    setOpen(true);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/58 px-3 py-5 backdrop-blur-sm sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="global-lead-popup-title"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close enquiry popup"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={cn(
              "relative max-h-[calc(100vh-2.5rem)] w-full max-w-[420px] overflow-hidden rounded-lg border border-[#51A70A]/25 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.34)]",
              "sm:max-h-[calc(100vh-4rem)]",
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-[#f7faf4] px-4 py-3 sm:px-5">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#51A70A]">
                  Free Counselling
                </p>
                <h2 id="global-lead-popup-title" className="mt-1 font-display text-lg font-bold leading-tight text-slate-950 sm:text-xl">
                  Get admission guidance
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#51A70A]/40 hover:text-[#51A70A]"
                aria-label="Close popup"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="global-lead-popup-form max-h-[calc(100vh-9.5rem)] overflow-y-auto px-3 py-3 sm:max-h-[calc(100vh-11rem)] sm:px-4">
              <div id={popupFormId} />
              <StudentFormLoader
                formContainerId={popupFormId}
                paths={formPaths}
                contact="+91-7393062116"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
