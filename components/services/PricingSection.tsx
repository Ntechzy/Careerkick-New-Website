"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { fetchPlans } from "@/lib/features/plansSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  COUNSELLING_PAYMENT_NOTES,
  formatIndianCurrency,
  isGstInclusivePlanAmount,
} from "@/lib/counsellingPackages";

export default function PricingSection() {
  const dispatch = useAppDispatch();
  const { items: plans, status, error } = useAppSelector((state) => state.plans);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchPlans({ page: 1, limit: 20 }));
    }
  }, [dispatch, status]);

  return (
    <section id="pricing" className="relative scroll-mt-28 overflow-hidden bg-[#fafaf6] px-4 py-16 text-slate-900 sm:py-20 md:px-8 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[78%] -translate-x-1/2 rounded-full bg-[#56b016]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#56b016]/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.4em] text-[#56b016] sm:text-sm">
            Paid Counselling
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-950 sm:text-4xl md:text-5xl">
            Designed for Medical & Allied Courses
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Choose the support that matches your course, budget, and admission
            goals with a clean and practical counselling plan.
          </p>
        </div>

        {status === "loading" ? (
          <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin text-[#56b016]" />
            Loading plans...
          </div>
        ) : null}
        {status === "failed" ? (
          <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            {error ?? "Unable to load live plans."}
          </div>
        ) : null}
        {status === "succeeded" && plans.length === 0 ? (
          <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-slate-200 bg-white px-4 py-6 text-center text-sm font-semibold text-slate-600">
            No active counselling plans are available right now.
          </div>
        ) : null}

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:mt-12 md:grid-cols-3 lg:gap-6">
          {plans.map((item) => (
              <article
                key={item._id}
                className="group relative flex min-h-[35rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 shrink-0 overflow-hidden sm:h-60">
                  <Image
                    src="/logo.png"
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full object-contain object-center p-10 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(86,176,22,0.04),rgba(86,176,22,0.14))]" />
                </div>

                <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
                  <h3 className="mx-auto max-w-[19rem] font-display text-xl font-semibold leading-tight text-slate-950 sm:text-2xl md:text-xl lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[20rem] text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="font-display text-3xl font-bold text-[#56b016]">
                      {formatIndianCurrency(item.totalAmount)}
                    </div>
                    <span className="mt-1 block min-h-4 text-xs font-semibold text-slate-500">
                      {isGstInclusivePlanAmount(item.totalAmount) ? "18% GST inclusive" : ""}
                    </span>
                  </div>

                  <Link
                    href={`/checkout?package=${item._id}`}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#56b016]/25 bg-[#56b016]/8 px-4 py-3 text-sm font-semibold text-[#56b016] transition hover:bg-[#56b016]/14"
                  >
                    Select Plan
                  </Link>
                </div>
              </article>
          ))}
        </div>
        <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-left shadow-[0_16px_36px_rgba(220,38,38,0.08)] sm:px-5">
          <ul className="space-y-2 text-sm font-semibold leading-relaxed text-red-700 sm:text-base">
            {COUNSELLING_PAYMENT_NOTES.map((note) => (
              <li key={note} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
