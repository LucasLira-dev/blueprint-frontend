"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Sparkles,
  LayoutGrid,
  Plus,
  Settings,
  LogOut,
  X,
  AlertCircleIcon,
  Compass,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Planos", href: "/plans", icon: LayoutGrid },
  { label: "Planos públicos", href: "/explore", icon: Compass },
  { label: "Novo plano", href: "/plans/new", icon: Plus },
] as const;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  userInitials?: string;
  userName?: string;
}

export function Sidebar({ open, onClose, userInitials, userName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [alert, setAlert] = useState<{ type: 'success' | 'destructive'; message: string } | null>(null);

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
        setAlert({ type: 'destructive', message: `Erro ao sair da conta. tente novamente.` });
      }
    } catch (error) {
      console.error(error)
      setAlert({ type: 'destructive', message: `Erro ao sair da conta. tente novamente.` });
    }
  };

  return (
    <>
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-auto max-w-sm sm:left-auto sm:w-full">
          <Alert variant={alert.type === 'destructive' ? 'destructive' : 'default'}>
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{alert.type === 'destructive' ? 'Erro' : 'Sucesso'}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
            <button
              onClick={() => setAlert(null)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50"
              aria-label="Fechar alerta"
            >
              <X className="h-3 w-3" />
            </button>
          </Alert>
        </div>
      )}
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
        

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/plans"
                ? pathname === "/plans"
                : pathname.startsWith(item.href);

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
