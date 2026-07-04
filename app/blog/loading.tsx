export default function BlogLoading() {
  return (
    <main className="bg-base px-4 pb-section-mobile pt-32 md:px-8 md:pb-section md:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="h-8 w-44 animate-pulse rounded-full bg-violet/10" />
        <div className="mt-6 h-16 max-w-3xl animate-pulse rounded-lg bg-white/[0.06] md:h-24" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-white/10 bg-gradient-card shadow-card">
              <div className="aspect-[16/11] animate-pulse bg-white/[0.06]" />
              <div className="space-y-4 p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-violet/10" />
                <div className="h-7 animate-pulse rounded bg-white/[0.06]" />
                <div className="h-16 animate-pulse rounded bg-white/[0.04]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
