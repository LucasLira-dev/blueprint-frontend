"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Menu } from "lucide-react";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  userInitials: string;
  userName: string;
  userRole: string;
  userId: string;
}

export function DashboardLayoutClient({
  children,
  userInitials,
  userName,
  userRole,
  userId,
}: DashboardLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userInitials={userInitials}
        userName={userName}
        userRole={userRole}
        userId={userId}
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
