import { Link2, Palette, PenLine } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "Crie seu convite",
    description:
      "Escolha o tipo de evento, defina data e horário e comece com um modelo elegante em segundos.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Personalize com fotos e mensagem",
    description:
      "Adicione uma foto especial, escreva do seu jeito e veja tudo mudar em tempo real.",
  },
  {
    number: "03",
    icon: Link2,
    title: "Compartilhe o link",
    description:
      "Envie por WhatsApp, Instagram ou qualquer app. Seus convidados recebem uma experiência única.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="border-t border-rose-50 bg-gradient-to-b from-white to-rose-50/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-rose-500">
            Como funciona
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Três passos para encantar
          </h2>
          <p className="mt-4 text-base text-stone-600 sm:text-lg">
            Simples, rápido e pensado para quem quer impressionar sem
            complicação.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group relative rounded-2xl border border-rose-100/80 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md hover:shadow-rose-100/50 sm:p-8"
            >
              <span className="font-display text-5xl font-bold text-rose-100 transition group-hover:text-rose-200">
                {step.number}
              </span>
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition group-hover:bg-rose-100">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-stone-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
