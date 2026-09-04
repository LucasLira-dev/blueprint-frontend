"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, router, user]);

  if (isPending || !user) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative flex flex-col items-center gap-8 fade-up">
          <div className="relative flex items-center justify-center">
            <div className="loader-ring absolute inset-0 h-24 w-24 rounded-full" />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-(--shadow-elegant)"/>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-display text-2xl tracking-tight text-foreground">
              Blueprint
            </h1>
            <p className="text-sm text-muted-foreground">Preparando o seu painel...</p>
          </div>
        </div>
      </div>
    );
  }

  const userInitials = user.name
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userInitials={userInitials}
        userName={user.name}
        userRole={user.role ?? "user"}
        userId={user.id}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold">Blueprint</span>
        </header>
        <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
