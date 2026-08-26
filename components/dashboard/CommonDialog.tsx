"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type CommonDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function CommonDialog({
  open,
  title,
  description,
  children,
  onClose,
}: CommonDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="fixed inset-0 z-[10000] h-screen w-screen cursor-default bg-slate-950/55 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className="fixed inset-0 z-[10001] flex h-screen w-screen items-center justify-center overflow-y-auto px-4 py-6"
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="w-full max-w-xl overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold leading-tight">{title}</h2>
              {description ? (
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 transition hover:text-slate-950"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-5 py-5">{children}</div>
        </div>
      </div>
    </>,
    document.body,
  );
}
