"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo = "/criar" }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSignIn() {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível entrar.";
      setError(message);
      setIsLoading(false);
    }
  }

  async function handleSignUp() {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (data.session) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      setSuccess(
        "Conta criada! Verifique seu e-mail para confirmar o cadastro, se necessário.",
      );
      setIsLoading(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível criar a conta.";
      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <FormField label="E-mail" htmlFor="email" required>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>

      <FormField label="Senha" htmlFor="password" required>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          fullWidth
          disabled={isLoading || !email || !password}
          onClick={handleSignIn}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          disabled={isLoading || !email || !password}
          onClick={handleSignUp}
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
      </div>

      {success && (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700"
          role="status"
        >
          {success}
        </p>
      )}

      {error && (
        <p
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm text-rose-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
