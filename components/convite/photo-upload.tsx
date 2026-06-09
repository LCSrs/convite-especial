"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

type PhotoUploadProps = {
  photoUrl: string | null;
  onPhotoChange: (file: File | null, url: string | null) => void;
};

export function PhotoUpload({ photoUrl, onPhotoChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const url = URL.createObjectURL(file);
    onPhotoChange(file, url);
  }

  function handleRemove() {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    onPhotoChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-stone-700">
        Foto <span className="font-normal text-stone-400">(opcional)</span>
      </p>

      {photoUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-rose-100">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={photoUrl}
              alt="Pré-visualização da foto"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-sm transition hover:bg-white hover:text-rose-500"
            aria-label="Remover foto"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/50 px-4 py-8 text-stone-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
        >
          <ImagePlus className="h-8 w-8" />
          <span className="text-sm font-medium">Toque para adicionar uma foto</span>
          <span className="text-xs text-stone-400">JPG, PNG ou WEBP</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
