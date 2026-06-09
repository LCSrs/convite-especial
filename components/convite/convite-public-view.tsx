import { Calendar, Clock, Heart, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { formatDate, formatTime } from "@/lib/format-date";
import type { ConvitePublic } from "@/types/convite";
import { ConfirmPresenceButton } from "./confirm-presence-button";

type ConvitePublicViewProps = {
  convite: ConvitePublic;
};

export function ConvitePublicView({ convite }: ConvitePublicViewProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-rose-100/80 bg-white shadow-2xl shadow-rose-200/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-100/60 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-pink-100/50 blur-2xl"
      />

      {convite.photoUrl ? (
        <div className="relative">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <Image
              src={convite.photoUrl}
              alt={convite.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 448px) 100vw, 448px"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
      ) : (
        <div className="relative flex aspect-[16/7] items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
          <Sparkles className="h-10 w-10 text-rose-300" strokeWidth={1.5} />
        </div>
      )}

      <div className="relative space-y-6 px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-200" />
          <Heart className="h-4 w-4 fill-rose-300 text-rose-300" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-200" />
        </div>

        <header className="space-y-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400 sm:text-sm">
            Convite especial para
          </p>
          <h1 className="font-display text-2xl font-semibold text-rose-500 sm:text-3xl">
            {convite.guestName}
          </h1>
        </header>

        <div className="text-center">
          <h2 className="font-display text-xl font-semibold leading-snug text-stone-900 sm:text-2xl">
            {convite.title}
          </h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-stone-600 sm:text-base">
            {convite.message}
          </p>
        </div>

        <div className="space-y-3.5 rounded-2xl bg-gradient-to-br from-rose-50/90 to-pink-50/50 p-5 ring-1 ring-rose-100/80">
          <div className="flex items-start gap-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-rose-400 shadow-sm ring-1 ring-rose-100">
              <Calendar className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-rose-400">
                Data
              </p>
              <p className="mt-0.5 capitalize text-stone-700">
                {formatDate(convite.date)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-rose-400 shadow-sm ring-1 ring-rose-100">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-rose-400">
                Horário
              </p>
              <p className="mt-0.5 text-stone-700">{formatTime(convite.time)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-rose-400 shadow-sm ring-1 ring-rose-100">
              <MapPin className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-rose-400">
                Local
              </p>
              <p className="mt-0.5 text-stone-700">{convite.location}</p>
              {convite.mapsLink && (
                <a
                  href={convite.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block text-sm font-medium text-rose-500 underline-offset-2 hover:underline"
                >
                  Ver no Google Maps
                </a>
              )}
            </div>
          </div>
        </div>

        <ConfirmPresenceButton
          slug={convite.slug}
          initiallyConfirmed={Boolean(convite.resposta)}
        />
      </div>
    </article>
  );
}
