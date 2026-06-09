import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rose-100 bg-stone-900 text-stone-400">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 text-white">
                <Heart className="h-4 w-4 fill-current" />
              </span>
              <span className="font-display text-lg font-semibold text-white">
                Convite Especial
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Convites digitais com elegância e carinho para os momentos que
              merecem ser lembrados.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-sm sm:items-end">
            <Link
              href="#como-funciona"
              className="transition hover:text-rose-300"
            >
              Como funciona
            </Link>
            <Link href="/criar" className="transition hover:text-rose-300">
              Criar Convite
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-stone-800 pt-8 text-center text-sm sm:flex-row sm:justify-between">
          <p>&copy; {year} Convite Especial. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-stone-500">
            Feito com <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" /> para momentos especiais
          </p>
        </div>
      </div>
    </footer>
  );
}
