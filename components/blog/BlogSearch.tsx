"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type BlogSearchProps = {
  defaultValue?: string;
};

export function BlogSearch({ defaultValue = "" }: BlogSearchProps) {
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 450);

    return () => window.clearTimeout(timer);
  }, [pathname, router, searchParams, value]);

  return (
    <div className="relative">
      <label htmlFor="blog-search" className="sr-only">
        Search blog posts
      </label>
      <input
        id="blog-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search guides, cut-offs, counselling..."
        className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] px-5 pr-12 text-sm text-white placeholder:text-text-faint shadow-card backdrop-blur-xl transition-colors focus:border-violet/50"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-violet-glow">
        {isPending ? "..." : "Search"}
      </span>
    </div>
  );
}
