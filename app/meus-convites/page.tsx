import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthNav } from "@/components/auth/auth-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { MeusConvitesList } from "@/components/convite/meus-convites-list";
import { getMeusConvitesServer } from "@/services/convite.service.server";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Meus Convites — Convite Especial",
  description: "Gerencie os convites que você criou.",
};

export default async function MeusConvitesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/meus-convites");
  }

  const convites = await getMeusConvitesServer();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/80 via-white to-white">
      <header className="border-b border-rose-100/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
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

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
              Meus convites
            </h1>
            <p className="mt-2 text-sm text-stone-600 sm:text-base">
              Acompanhe seus convites e as respostas dos convidados.
            </p>
          </div>
          <SignOutButton />
        </div>

        <MeusConvitesList convites={convites} />
      </main>
    </div>
  );
}
