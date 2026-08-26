"use client";

export function ChatSkeleton() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden" aria-busy="true">
      <div className="flex min-h-0 flex-1 justify-center overflow-y-auto overflow-x-hidden px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex w-full max-w-2xl min-w-0 flex-col gap-4 sm:gap-6">
          <SkeletonMessage role="user" widths={["w-48", "w-32"]} />
          <SkeletonMessage role="assistant" widths={["w-full", "w-5/6", "w-3/4"]} />
          <SkeletonMessage role="user" widths={["w-56"]} />
          <SkeletonMessage role="assistant" widths={["w-full", "w-11/12", "w-2/3", "w-4/5"]} />
          <SkeletonMessage role="user" widths={["w-40", "w-24"]} />
          <SkeletonMessage role="assistant" widths={["w-full", "w-4/5", "w-1/2"]} />
        </div>
      </div>

      <div className="flex justify-center bg-background px-4 py-4 sm:px-6">
        <div className="flex w-full max-w-2xl flex-col items-center gap-4">
          <div className="w-full rounded-2xl border border-border bg-surface-elevated p-3 sm:p-4">
            <div className="h-10 w-full animate-pulse rounded bg-muted-foreground/10" />
            <div className="mt-3 flex justify-end">
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted-foreground/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonMessage({
  role,
  widths,
}: {
  role: "user" | "assistant";
  widths: string[];
}) {
  const isUser = role === "user";

  return (
    <div className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`rounded-lg p-4 ${
          isUser ? "w-fit max-w-[85%] bg-muted" : "w-full bg-secondary"
        }`}
      >
        <div className="flex flex-col gap-2">
          {widths.map((width, index) => (
            <div
              key={index}
              className={`h-3 animate-pulse rounded bg-foreground/10 ${width}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
