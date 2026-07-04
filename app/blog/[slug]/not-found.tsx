import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-base px-4 pt-24">
      <div className="max-w-xl rounded-lg border border-white/10 bg-gradient-card p-8 text-center shadow-card">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-glow">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">
          Blog post not found.
        </h1>
        <p className="mt-4 text-text-muted">
          The article may have moved, or the WordPress slug may no longer exist.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-flex rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white shadow-card"
        >
          Back to Blogs
        </Link>
      </div>
    </main>
  );
}
