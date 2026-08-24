"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type BlogTheme = "light" | "dark";

type BlogThemeToggleProps = {
  defaultTheme?: BlogTheme;
  className?: string;
};

const storageKey = "careerkick-blog-theme";
const themeEventName = "careerkick-blog-theme-change";

export function BlogThemeToggle({ defaultTheme = "light", className }: BlogThemeToggleProps) {
  const [theme, setTheme] = useState<BlogTheme>(defaultTheme);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    const nextTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : defaultTheme;

    setTheme(nextTheme);
    document.documentElement.dataset.blogTheme = nextTheme;

    return () => {
      delete document.documentElement.dataset.blogTheme;
    };
  }, [defaultTheme]);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(nextTheme);
        window.localStorage.setItem(storageKey, nextTheme);
        document.documentElement.dataset.blogTheme = nextTheme;
        window.dispatchEvent(new CustomEvent(themeEventName, { detail: nextTheme }));
      }}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--blog-border)] bg-[var(--blog-panel)] px-4 py-2 text-sm font-bold text-[var(--blog-text)] shadow-sm transition-colors hover:border-violet/40 hover:text-violet",
        className,
      )}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
      {theme === "light" ? "Dark" : "Light"} mode
    </button>
  );
}
