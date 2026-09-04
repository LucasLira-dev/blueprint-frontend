"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";

interface LoginFormProps {
  disabled?: boolean;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (error: string) => void;
}

export function LoginForm({ disabled = false, onLoadingChange, onError }: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const callbackURL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      onLoadingChange?.(true);
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe,
      });

      if (error) {
        const msg = "E-mail ou senha inválidos";
        setServerError(msg);
        onError?.(msg);
        return;
      }

      router.push(callbackURL);
    } catch (err) {
      const msg = "Erro ao entrar. Tente novamente.";
      setServerError(msg);
      onError?.(msg);
      console.error(err);
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="voce@email.com"
          disabled={isDisabled}
          className="w-full px-4 py-3 rounded-sm border border-border bg-surface text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="••••••••"
            disabled={isDisabled}
            className="w-full px-4 py-3 pr-11 rounded-sm border border-border bg-surface text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isDisabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-red-400">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
          />
          <span className="text-sm text-muted-foreground">Lembrar de mim</span>
        </label>
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Esqueceu a senha?
        </button>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full btn-primary rounded-sm px-4 py-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Entrar
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
