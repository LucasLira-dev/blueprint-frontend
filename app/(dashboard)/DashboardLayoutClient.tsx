"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import { Loading } from "@/components/Loading";

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
      <Loading />
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
