import {
  Eye,
  ImageIcon,
  LinkIcon,
  UserCheck,
} from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Foto opcional",
    description:
      "Destaque o casal, o aniversariante ou o momento com uma imagem que emociona.",
  },
  {
    icon: LinkIcon,
    title: "Link personalizado",
    description:
      "Um endereço exclusivo e fácil de compartilhar, pronto para qualquer rede social.",
  },
  {
    icon: UserCheck,
    title: "Confirmação de presença",
    description:
      "Saiba quem vem e organize tudo com confirmações simples dos seus convidados.",
  },
  {
    icon: Eye,
    title: "Pré-visualização em tempo real",
    description:
      "Veja exatamente como o convite ficará antes de enviar — sem surpresas.",
  },
];

export function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-rose-500">
            Recursos
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Tudo que você precisa
          </h2>
          <p className="mt-4 text-base text-stone-600 sm:text-lg">
            Ferramentas pensadas para criar convites bonitos, funcionais e
            memoráveis.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex gap-5 rounded-2xl border border-rose-100/80 bg-gradient-to-br from-white to-rose-50/30 p-6 transition hover:border-rose-200 hover:shadow-md hover:shadow-rose-100/40 sm:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm ring-1 ring-rose-100">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 sm:text-base">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
