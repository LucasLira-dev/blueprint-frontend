"use client";

export function ChatSkeleton() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 justify-center overflow-y-auto overflow-x-hidden px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex w-full max-w-2xl min-w-0 flex-col gap-4 sm:gap-6">
          <SkeletonMessage role="user" widths={["w-1/3", "w-1/4"]} />
          <SkeletonMessage role="assistant" widths={["w-full", "w-5/6", "w-3/4"]} />
          <SkeletonMessage role="user" widths={["w-2/5"]} />
          <SkeletonMessage role="assistant" widths={["w-full", "w-2/3", "w-1/2", "w-3/5"]} />
          <SkeletonMessage role="user" widths={["w-1/3", "w-1/5"]} />
          <SkeletonMessage role="assistant" widths={["w-full", "w-4/5", "w-1/2"]} />
        </div>
      </div>

      <div className="flex justify-center bg-background px-4 py-4 sm:px-6">
        <div className="flex w-full max-w-2xl flex-col items-center gap-4">
          <div className="flex w-full gap-2 overflow-hidden">
            <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-9 w-32 animate-pulse rounded-full bg-muted" />
            <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-border bg-muted/50 px-4">
            <div className="h-5 w-5 animate-pulse rounded bg-muted-foreground/20" />
            <div className="h-4 w-48 animate-pulse rounded bg-muted-foreground/20" />
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
        className={`rounded-lg p-4 text-sm ${
          isUser ? "bg-muted" : "bg-secondary"
        }`}
      >
        <div className="flex flex-col gap-2">
          {widths.map((width, i) => (
            <div
              key={i}
              className={`h-3 animate-pulse rounded bg-foreground/5 ${width}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
