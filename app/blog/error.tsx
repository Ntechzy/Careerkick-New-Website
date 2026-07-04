"use client";

export default function BlogError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-base px-4 pt-24">
      <div className="max-w-xl rounded-lg border border-white/10 bg-gradient-card p-8 text-center shadow-card">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-glow">
          Blog unavailable
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">
          We could not load the blog feed.
        </h1>
        <p className="mt-4 text-text-muted">
          Please try again. If WordPress is slow for a moment, CareerKick will recover gracefully.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white shadow-card"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
