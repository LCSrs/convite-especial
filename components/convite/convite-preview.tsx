import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import type { ConvitePreviewData } from "@/types/convite";

type ConvitePreviewProps = {
  data: ConvitePreviewData;
};

export function ConvitePreview({ data }: ConvitePreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-lg shadow-rose-100/50">
      {data.photoUrl && (
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={data.photoUrl}
            alt={data.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="space-y-5 p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-rose-400">
            Convite especial para
          </p>
          <p className="font-display text-xl font-semibold text-rose-500 sm:text-2xl">
            {data.guestName}
          </p>
        </div>

        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
            {data.title}
          </h2>
          <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-stone-600">
            {data.message}
          </p>
        </div>

        <div className="space-y-3 rounded-xl bg-rose-50/80 p-4">
          <div className="flex items-start gap-3 text-stone-700">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
            <span className="capitalize">{formatDate(data.date)}</span>
          </div>
          <div className="flex items-start gap-3 text-stone-700">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
            <span>{data.time}</span>
          </div>
          <div className="flex items-start gap-3 text-stone-700">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
            <span>{data.location}</span>
          </div>
        </div>

        {data.mapsLink && (
          <a
            href={data.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm font-medium text-rose-500 underline-offset-2 hover:underline"
          >
            Ver no Google Maps
          </a>
        )}
      </div>
    </div>
  );
}
