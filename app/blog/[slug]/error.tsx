"use client";

import Link from "next/link";

export default function SingleBlogError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-base px-4 pt-24">
      <div className="max-w-xl rounded-lg border border-white/10 bg-gradient-card p-8 text-center shadow-card">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-glow">
          Article unavailable
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">
          This article could not be loaded.
        </h1>
        <p className="mt-4 text-text-muted">
          Try again or return to the CareerKick blog index.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white shadow-card"
          >
            Try again
          </button>
          <Link
            href="/blog"
            className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-white"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
