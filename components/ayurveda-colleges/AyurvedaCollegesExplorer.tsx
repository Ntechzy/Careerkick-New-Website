"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ListFilter, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type AnyRecord = Record<string, string | number | null | undefined>;

type Dataset = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  tableClassName?: string;
  rows: AnyRecord[];
  columns: Array<{
    key: string;
    label: string;
    className?: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
};

type AyurvedaCollegesExplorerProps = {
  datasets: Dataset[];
};

function valueToText(value: AnyRecord[string]) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function isNumericColumn(key: string) {
  return (
    key === "serialNumber" ||
    key.toLowerCase().includes("seats") ||
    key.toLowerCase().includes("number")
  );
}

function isLongTextColumn(key: string) {
  return key === "collegeName" || key.toLowerCase().includes("permission");
}

export function AyurvedaCollegesExplorer({ datasets }: AyurvedaCollegesExplorerProps) {
  const [activeId, setActiveId] = useState(datasets[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const activeDataset = datasets.find((dataset) => dataset.id === activeId) ?? datasets[0];

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return activeDataset.rows;

    return activeDataset.rows.filter((row) =>
      activeDataset.columns.some((column) =>
        valueToText(row[column.key]).toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [activeDataset, query]);

  return (
    <section className="relative mx-auto w-full max-w-[1800px] px-3 pb-20 md:px-4 md:pb-28">
      <div className="rounded-lg border border-[#dce9d4] bg-white shadow-[0_12px_34px_rgba(31,61,21,0.08)]">
        <div className="border-b border-[#dce9d4] p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid gap-2 sm:flex sm:flex-wrap">
              {datasets.map((dataset) => {
                const active = dataset.id === activeDataset.id;
                return (
                  <button
                    key={dataset.id}
                    type="button"
                    onClick={() => {
                      setActiveId(dataset.id);
                      setQuery("");
                    }}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
                      active
                        ? "border-[#51A70A]/45 bg-[#edf7e7] text-violet shadow-sm"
                        : "border-[#dce9d4] bg-white text-[#52644b] hover:border-[#51A70A]/35 hover:text-violet",
                    )}
                  >
                    {dataset.id === "denied" ? (
                      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    {dataset.label}
                  </button>
                );
              })}
            </div>

            <label className="relative block w-full lg:max-w-md">
              <span className="sr-only">Search colleges</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by college, district, state, ID..."
                className="h-12 w-full rounded-md border border-[#dce9d4] bg-[#fbfdf9] pl-10 pr-4 text-sm font-medium text-[#182413] shadow-inner outline-none placeholder:text-[#7b8d72] focus:border-[#51A70A]/55"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4 border-b border-[#dce9d4] p-4 md:grid-cols-[1.2fr_1fr] md:p-5">
          <div>
            <p className="text-xs font-bold uppercase text-violet">
              {activeDataset.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#13220f] md:text-3xl">
              {activeDataset.label}
            </h2>
            <p
              className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#52644b] md:text-base"
            >
              {activeDataset.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {activeDataset.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-[#dce9d4] bg-[#fbfdf9] p-3"
              >
                <p className="text-xs font-semibold uppercase text-[#728067]">
                  {stat.label}
                </p>
                <p className="mt-2 text-xl font-bold text-[#13220f]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b border-[#dce9d4] px-4 py-3 text-sm font-semibold text-[#52644b] sm:flex-row sm:items-center sm:justify-between md:px-5">
          <span className="inline-flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-violet" aria-hidden="true" />
            Showing {filteredRows.length} of {activeDataset.rows.length} records
          </span>
          {query ? <span>Filtered by: {query}</span> : null}
        </div>

        <div className="border-b border-[#dce9d4] bg-[#fbfdf9] px-4 py-2 text-xs font-semibold text-[#728067] md:hidden">
          Swipe horizontally to view all columns.
        </div>

        <div className="max-h-[72vh] overflow-auto overscroll-contain" data-lenis-prevent>
          <table
            className={cn(
              "w-full table-fixed border-separate border-spacing-0 text-left text-sm",
              activeDataset.tableClassName ?? "min-w-[1100px]",
            )}
          >
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#edf7e7] text-xs uppercase text-[#5a704f] shadow-[0_1px_0_rgba(220,233,212,1)]">
                {activeDataset.columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "border-r border-[#dce9d4] px-4 py-3.5 font-bold leading-5 last:border-r-0",
                      isNumericColumn(column.key) && "text-right tabular-nums",
                      column.key === "serialNumber" && "text-center",
                      column.className,
                    )}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr
                  key={`${activeDataset.id}-${row.serialNumber}-${index}`}
                  className="transition-colors odd:bg-[#fbfdf9] hover:bg-[#edf7e7]"
                >
                  {activeDataset.columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "border-b border-r border-[#dce9d4] px-4 py-3.5 align-top font-medium leading-6 text-[#52644b] last:border-r-0",
                        isLongTextColumn(column.key)
                          ? "whitespace-normal break-words"
                          : "whitespace-nowrap",
                        isNumericColumn(column.key) && "text-right tabular-nums text-[#26351f]",
                        column.key === "serialNumber" && "text-center font-bold text-[#13220f]",
                        column.key === "collegeName" && "text-[#13220f]",
                        column.className,
                      )}
                    >
                      {valueToText(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!filteredRows.length ? (
          <div className="px-5 py-12 text-center">
            <p className="text-lg font-bold text-[#13220f]">No records found</p>
            <p className="mt-2 text-sm font-medium text-[#52644b]">
              Try another college name, district, state, or college ID.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
