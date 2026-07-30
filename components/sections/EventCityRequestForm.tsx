"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function EventCityRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    role: "Student",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleCityRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/event-city-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "We could not submit your request right now.");
      }

      setStatus("success");
      setMessage("Thank you. Our team has noted your city request.");
      setFormData({
        name: "",
        phone: "",
        city: "",
        role: "Student",
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not submit your request right now.");
    }
  }

  return (
    <form
      onSubmit={handleCityRequestSubmit}
      className="relative overflow-hidden rounded-[1.5rem] border border-[#51A70A]/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025)),linear-gradient(135deg,rgba(7,19,5,0.96),rgba(18,26,16,0.82))] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.42),0_0_64px_rgba(81,167,10,0.08)] backdrop-blur-xl sm:p-5 lg:p-6"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8cef32]/70 to-transparent" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#51A70A]/12 blur-[100px]" />
      <div className="pointer-events-none absolute -right-12 top-0 h-52 w-52 rounded-full bg-[#8cef32]/10 blur-[95px]" />

      <div className="relative rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.2)] sm:p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Name
            </span>
            <input
              required
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
              className="min-h-11 rounded-xl border border-white/10 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#071305] placeholder:text-[#071305]/55 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-shadow focus-visible:shadow-[0_0_0_2px_#51A70A,0_10px_24px_rgba(0,0,0,0.14)]"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Phone
            </span>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
              placeholder="Phone number"
              className="min-h-11 rounded-xl border border-white/10 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#071305] placeholder:text-[#071305]/55 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-shadow focus-visible:shadow-[0_0_0_2px_#51A70A,0_10px_24px_rgba(0,0,0,0.14)]"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Preferred City
            </span>
            <input
              required
              value={formData.city}
              onChange={(event) => setFormData((current) => ({ ...current, city: event.target.value }))}
              placeholder="City to cover next"
              className="min-h-11 rounded-xl border border-white/10 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#071305] placeholder:text-[#071305]/55 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-shadow focus-visible:shadow-[0_0_0_2px_#51A70A,0_10px_24px_rgba(0,0,0,0.14)]"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              I am a
            </span>
            <select
              value={formData.role}
              onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}
              className="min-h-11 rounded-xl border border-white/10 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#071305] shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-shadow focus-visible:shadow-[0_0_0_2px_#51A70A,0_10px_24px_rgba(0,0,0,0.14)]"
            >
              <option>Student</option>
              <option>Parent</option>
              <option>Guardian</option>
            </select>
          </label>
        </div>

        {message ? (
          <p
            className={cn(
              "mt-3 rounded-xl border px-3.5 py-2.5 text-sm font-semibold",
              status === "success"
                ? "border-[#51A70A]/30 bg-[#51A70A]/10 text-[#8cef32]"
                : "border-[#fbbf24]/30 bg-[#fbbf24]/10 text-[#fbbf24]"
            )}
          >
            {status === "success" ? <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" /> : null}
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-bold text-base shadow-[0_16px_38px_rgba(81,167,10,0.24)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow-violet disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {status === "submitting" ? "Submitting..." : "Submit City Request"}
        </button>
      </div>
    </form>
  );
}
