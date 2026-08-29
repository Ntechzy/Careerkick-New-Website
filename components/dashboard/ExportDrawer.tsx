"use client";

import { ChevronDown, Download, FileSpreadsheet, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ExportColumn<T> = {
  header: string;
  value: (row: T) => string | number | null | undefined;
};

type ExportDrawerProps<T> = {
  fileName: string;
  title: string;
  rows: T[];
  columns: ExportColumn<T>[];
  disabled?: boolean;
  className?: string;
};

function toCellValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildSafeFileName(fileName: string, extension: string) {
  const cleaned = fileName.trim().replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "");
  return `${cleaned || "dashboard-export"}.${extension}`;
}

export function ExportDrawer<T>({
  fileName,
  title,
  rows,
  columns,
  disabled = false,
  className,
}: ExportDrawerProps<T>) {
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState<"pdf" | "excel" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDisabled = disabled || rows.length === 0 || columns.length === 0;

  useEffect(() => {
    if (!open) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function exportExcel() {
    setIsExporting("excel");

    try {
      const createdAt = new Date().toLocaleString("en-IN");
      const headerCells = columns.map((column) => `<th>${escapeHtml(column.header)}</th>`).join("");
      const bodyRows = rows
        .map((row) => {
          const cells = columns
            .map((column) => `<td>${escapeHtml(toCellValue(column.value(row)))}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      const workbook = `
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              table { border-collapse: collapse; font-family: Arial, sans-serif; }
              th { background: #16a34a; color: #ffffff; font-weight: 700; }
              th, td { border: 1px solid #d9ead3; padding: 8px; mso-number-format: "\\@"; }
              caption { margin-bottom: 12px; font-size: 18px; font-weight: 700; text-align: left; }
            </style>
          </head>
          <body>
            <table>
              <caption>${escapeHtml(title)} - ${escapeHtml(createdAt)}</caption>
              <thead><tr>${headerCells}</tr></thead>
              <tbody>${bodyRows}</tbody>
            </table>
          </body>
        </html>
      `;

      downloadBlob(new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" }), buildSafeFileName(fileName, "xls"));
      setOpen(false);
    } finally {
      setIsExporting(null);
    }
  }

  async function exportPdf() {
    setIsExporting("pdf");

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 28;
      const usableWidth = pageWidth - margin * 2;
      const columnWidth = usableWidth / columns.length;
      let y = margin;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Exported ${new Date().toLocaleString("en-IN")}`, margin, y + 14);
      y += 34;

      const drawHeader = () => {
        doc.setFillColor(22, 163, 74);
        doc.rect(margin, y, usableWidth, 24, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(columns.length > 10 ? 6 : 7);

        columns.forEach((column, index) => {
          const x = margin + index * columnWidth + 4;
          doc.text(doc.splitTextToSize(column.header, columnWidth - 8), x, y + 10);
        });

        y += 24;
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "normal");
      };

      drawHeader();

      rows.forEach((row, rowIndex) => {
        const cellLines = columns.map((column) =>
          doc.splitTextToSize(toCellValue(column.value(row)), columnWidth - 8).slice(0, 4),
        );
        const rowHeight = Math.max(26, ...cellLines.map((lines) => lines.length * 9 + 12));

        if (y + rowHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
          drawHeader();
        }

        if (rowIndex % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, y, usableWidth, rowHeight, "F");
        }

        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, y, usableWidth, rowHeight);
        doc.setFontSize(columns.length > 10 ? 6 : 7);

        cellLines.forEach((lines, index) => {
          const x = margin + index * columnWidth + 4;
          doc.text(lines, x, y + 12);
        });

        y += rowHeight;
      });

      doc.save(buildSafeFileName(fileName, "pdf"));
      setOpen(false);
    } finally {
      setIsExporting(null);
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full sm:w-auto", className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        disabled={isDisabled}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] px-4 text-sm font-black text-[var(--dash-text)] transition hover:border-[var(--dash-primary)] hover:text-[var(--dash-primary)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        aria-expanded={open}
      >
        <Download className="h-4 w-4" />
        Export
        <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.6rem)] z-30 w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-2.5 shadow-[0_18px_44px_rgba(15,23,42,0.16)] sm:left-auto sm:right-0 sm:w-[22rem] sm:p-3 sm:shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <div className="rounded-md bg-[var(--dash-surface-strong)] px-3 py-2.5 sm:py-3">
            <p className="text-sm font-black text-[var(--dash-text)]">Download table data</p>
            <p className="mt-1 text-xs font-bold text-[var(--dash-muted)]">
              {rows.length.toLocaleString("en-IN")} rows ready to export.
            </p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={exportPdf}
              disabled={Boolean(isExporting)}
              className="flex min-h-16 items-center gap-3 rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)] p-3 text-left transition hover:border-[var(--dash-primary)] hover:bg-[var(--dash-surface-strong)] disabled:cursor-wait disabled:opacity-70 sm:min-h-20"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-red-600 text-white sm:h-10 sm:w-10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black">PDF</span>
                <span className="mt-1 block text-xs font-bold text-[var(--dash-muted)]">
                  {isExporting === "pdf" ? "Preparing..." : "PDF file"}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={exportExcel}
              disabled={Boolean(isExporting)}
              className="flex min-h-16 items-center gap-3 rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)] p-3 text-left transition hover:border-[var(--dash-primary)] hover:bg-[var(--dash-surface-strong)] disabled:cursor-wait disabled:opacity-70 sm:min-h-20"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--dash-primary)] text-white sm:h-10 sm:w-10">
                <FileSpreadsheet className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black">Excel</span>
                <span className="mt-1 block text-xs font-bold text-[var(--dash-muted)]">
                  {isExporting === "excel" ? "Preparing..." : "Spreadsheet file"}
                </span>
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
