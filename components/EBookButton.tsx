export function EBookButton() {
  return (
    <a
      href="https://careerkick.in/e-books-preview-page/"
      aria-label="Open E-Book"
      className="fixed right-0 top-1/2 z-[90] flex h-32 w-12 -translate-y-1/2 items-center justify-center rounded-l-xl border border-r-0 border-[#51A70A]/35 bg-gradient-brand font-display text-xs font-semibold text-base shadow-card transition-transform duration-300 hover:scale-[1.03] hover:shadow-glow-violet focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_5px_#050704] sm:h-36 sm:w-14 sm:text-sm"
    >
      <span className="inline-flex rotate-180 items-center gap-2 [writing-mode:vertical-rl]">
        <svg
          aria-hidden="true"
          className="h-4 w-4 rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
        E-Book
      </span>
    </a>
  );
}

