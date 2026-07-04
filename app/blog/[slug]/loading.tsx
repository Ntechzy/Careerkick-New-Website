export default function SingleBlogLoading() {
  return (
    <main className="bg-base px-4 pb-section-mobile pt-32 md:px-8 md:pb-section md:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="h-5 w-64 animate-pulse rounded bg-white/[0.06]" />
        <div className="mt-8 h-24 max-w-4xl animate-pulse rounded-lg bg-white/[0.06] md:h-36" />
        <div className="mt-10 aspect-[16/9] animate-pulse rounded-lg border border-white/10 bg-white/[0.06]" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="h-5 animate-pulse rounded bg-white/[0.05]" />
            ))}
          </div>
          <div className="hidden space-y-5 lg:block">
            <div className="h-48 animate-pulse rounded-lg bg-white/[0.05]" />
            <div className="h-64 animate-pulse rounded-lg bg-white/[0.05]" />
          </div>
        </div>
      </div>
    </main>
  );
}
