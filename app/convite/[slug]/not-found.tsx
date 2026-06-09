import { Heart } from "lucide-react";
import Link from "next/link";

export default function ConviteNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50/80 to-white px-4 text-center">
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/50">
        <Heart className="h-6 w-6 fill-current" />
      </span>
      <h1 className="font-display text-2xl font-semibold text-stone-900">
        Convite não encontrado
      </h1>
      <p className="mt-2 max-w-sm text-stone-600">
        Este convite não existe ou o link pode estar incorreto.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200/50 transition hover:bg-rose-600"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
