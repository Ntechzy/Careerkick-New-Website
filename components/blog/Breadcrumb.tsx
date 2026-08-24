import Link from "next/link";

type BreadcrumbProps = {
  current: string;
};

export function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--blog-faint)]">
      <Link href="/" className="transition-colors hover:text-[var(--blog-text)]">
        Home
      </Link>
      <span className="text-violet">/</span>
      <Link href="/blog" className="transition-colors hover:text-[var(--blog-text)]">
        Blog
      </Link>
      <span className="text-violet">/</span>
      <span className="line-clamp-1 text-violet">{current}</span>
    </nav>
  );
}
