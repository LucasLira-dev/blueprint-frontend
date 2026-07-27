import { Sparkles } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-sm text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Gerador de blueprint
      </div>
    </div>
  );
}
