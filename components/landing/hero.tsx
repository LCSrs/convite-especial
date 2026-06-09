import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-32 h-80 w-80 rounded-full bg-pink-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-violet-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-1.5 text-sm text-rose-600 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Convites digitais com carinho</span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Transforme um simples convite em um{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              momento inesquecível
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg sm:leading-relaxed">
            Crie convites digitais personalizados para datas especiais, festas e
            encontros. Adicione fotos, escreva sua mensagem e compartilhe um link
            único — tudo em poucos minutos, direto do celular.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/criar"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-rose-200/60 transition hover:from-rose-600 hover:to-pink-600 hover:shadow-xl hover:shadow-rose-200/70 sm:w-auto"
            >
              Criar Convite
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex w-full items-center justify-center rounded-full border border-rose-100 bg-white/80 px-8 py-4 text-base font-medium text-stone-700 backdrop-blur-sm transition hover:border-rose-200 hover:bg-white sm:w-auto"
            >
              Como funciona
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-lg sm:max-w-xl lg:max-w-2xl">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rose-100/80 via-pink-50/50 to-violet-100/60 blur-sm" />
          <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-6 shadow-2xl shadow-rose-100/50 backdrop-blur-sm sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-300" />
              <div className="h-3 w-3 rounded-full bg-pink-200" />
              <div className="h-3 w-3 rounded-full bg-violet-200" />
            </div>
            <div className="space-y-4">
              <div className="h-40 rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 sm:h-48" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded-full bg-rose-100" />
                <div className="h-3 w-full rounded-full bg-stone-100" />
                <div className="h-3 w-5/6 rounded-full bg-stone-100" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-9 flex-1 rounded-full bg-rose-500/90" />
                <div className="h-9 w-20 rounded-full border border-rose-100 bg-rose-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
