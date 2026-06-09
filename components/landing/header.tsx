import { Heart } from "lucide-react";
import Link from "next/link";
import { AuthNav } from "@/components/auth/auth-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md shadow-rose-200/50 transition group-hover:shadow-lg group-hover:shadow-rose-200/60">
            <Heart className="h-4 w-4 fill-current" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-stone-800">
            Convite Especial
          </span>
        </Link>

        <AuthNav />
      </div>
    </header>
  );
}
