export function EBookButton() {
  return (
    <a
      href="https://careerkick.in/e-books-preview-page/"
      aria-label="Open E-Book"
      className="fixed right-0 top-1/2 z-[90] flex h-32 w-12 -translate-y-1/2 items-center justify-center rounded-l-xl border border-r-0 border-[#C4F017]/35 bg-gradient-brand font-display text-xs font-semibold text-base shadow-card transition-transform duration-300 hover:scale-[1.03] hover:shadow-glow-violet focus-visible:shadow-[0_0_0_2px_#C4F017,0_0_0_5px_#050704] sm:h-36 sm:w-14 sm:text-sm"
    >
      <span className="rotate-180 [writing-mode:vertical-rl]">E-Book</span>
    </a>
  );
}
