import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 px-6 py-14 text-center shadow-xl shadow-rose-200/50 sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          />

          <h2 className="font-display relative text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Pronto para criar algo especial?
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-base text-rose-50 sm:text-lg">
            Comece agora e surpreenda quem você ama com um convite único.
          </p>
          <Link
            href="/criar"
            className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-rose-600 shadow-lg transition hover:bg-rose-50"
          >
            Criar Convite
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
