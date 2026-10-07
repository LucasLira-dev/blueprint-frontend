export const DeepLearningSkeleton = () => {
  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-6 w-28 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-9 w-full max-w-md rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-full rounded bg-muted animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-surface/40 p-5 sm:p-6">
        <div className="h-4 w-44 rounded bg-muted animate-pulse" />
        <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-4 w-full rounded bg-muted animate-pulse" />
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-border" />

      <div className="flex flex-col gap-4">
        <div className="h-7 w-24 rounded-lg bg-muted animate-pulse" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/70 bg-surface/40 p-4 sm:p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 shrink-0 rounded-full bg-muted animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:pl-9">
              {Array.from({ length: 2 }).map((_, lineIndex) => (
                <div key={lineIndex} className="h-10 w-full rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};
