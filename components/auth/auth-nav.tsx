"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthNavProps = {
  compact?: boolean;
};

export function AuthNav({ compact = false }: AuthNavProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return <div className={compact ? "h-9 w-20" : "h-10 w-24"} aria-hidden />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className={
          compact
            ? "text-sm font-medium text-stone-600 transition hover:text-rose-500"
            : "rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:bg-rose-50 sm:px-5 sm:py-2.5 sm:text-base"
        }
      >
        Entrar
      </Link>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/meus-convites"
          className="text-sm font-medium text-stone-600 transition hover:text-rose-500"
        >
          Meus convites
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm font-medium text-stone-600 transition hover:text-rose-500"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/meus-convites"
        className="rounded-full border border-rose-100 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:bg-rose-50 sm:px-4"
      >
        Meus convites
      </Link>
      <Link
        href="/criar"
        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-rose-200 transition hover:bg-rose-600 sm:px-5 sm:py-2.5 sm:text-base"
      >
        Criar Convite
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-rose-100 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:bg-rose-50 sm:px-4"
      >
        Sair
      </button>
    </div>
  );
}
