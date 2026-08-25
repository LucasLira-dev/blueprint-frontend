"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  LayoutGrid,
  Plus,
  Settings,
  LogOut,
  X,
  Compass,
  Shield,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useMyThreadsQuery } from "@/hooks/useConversations";

const NAV_ITEMS = [
  { label: "Planos", href: "/plans", icon: LayoutGrid },
  { label: "Planos públicos", href: "/explore", icon: Compass },
  { label: "Novo plano", href: "/plans/new", icon: Plus },
  { label: "Admin", href: "/admin", icon: Shield },
] as const;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  userInitials?: string;
  userName?: string;
  userRole: string;
  userId: string;
}

export function Sidebar({ open, onClose, userInitials, userName, userRole, userId }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: threads } = useMyThreadsQuery(userId);

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); // redirect to login page
          },
        }
      })
      if (error) {
        console.error(error)
        toast.error('Erro ao sair da conta. Tente novamente.');
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao sair da conta. Tente novamente.');
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Fechar menu"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 border-b border-border px-3 py-4">
          <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={1024}
            height={1024}
            className="h-9 w-9"
          />
          <span className="text-lg font-semibold">Blueprint</span>
        </Link>
        </div>
        

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/plans"
                ? pathname === "/plans"
                : pathname.startsWith(item.href);
            const isAdminOnly = item.label === "Admin" && userRole !== "admin";
            if (isAdminOnly) {
              return null;
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          {threads && threads.length > 0 && (
            <div className="mt-3 flex flex-col gap-1">
              <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground mt-4">
                Conversas
              </p>
              {threads.map((thread) => {
                const href = `/conversations/${thread.threadId}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={thread.threadId}
                    href={href}
                    onClick={onClose}
                    title={thread.topic}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <span className="truncate">{thread.topic}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        <div className="mt-auto border-t border-border px-3 py-3">
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>

          <div className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
              {userInitials}
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium">{userName}</span>
              <span className="truncate text-xs text-muted-foreground">
                Free plan
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
