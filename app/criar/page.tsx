import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthNav } from "@/components/auth/auth-nav";
import { ConviteForm } from "@/components/convite/convite-form";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Criar Convite — Convite Especial",
  description: "Crie um convite digital personalizado em poucos minutos.",
};

export default async function CriarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/criar");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/80 via-white to-white">
      <header className="border-b border-rose-100/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-4 sm:max-w-2xl">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-stone-600 transition hover:text-rose-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="font-display text-base font-semibold text-stone-800">
              Convite Especial
            </span>
          </Link>

          <AuthNav compact />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8 sm:max-w-2xl sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
            Criar convite
          </h1>
          <p className="mt-2 text-sm text-stone-600 sm:text-base">
            Preencha os detalhes abaixo e visualize como ficará o seu convite.
          </p>
        </div>

        <div className="rounded-2xl border border-rose-100/80 bg-white p-5 shadow-xl shadow-rose-100/40 sm:p-8">
          <ConviteForm />
        </div>
      </main>
    </div>
  );
}
