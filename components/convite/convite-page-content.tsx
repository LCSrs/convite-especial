"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ConvitePublicView } from "@/components/convite/convite-public-view";
import { getConviteBySlugClient } from "@/services/convite.service";
import type { ConvitePublic } from "@/types/convite";

type ConvitePageContentProps = {
  slug: string;
  serverConvite: ConvitePublic | null;
};

export function ConvitePageContent({
  slug,
  serverConvite,
}: ConvitePageContentProps) {
  const searchParams = useSearchParams();
  const justPublished = searchParams.get("publicado") === "1";
  const [convite, setConvite] = useState<ConvitePublic | null>(serverConvite);
  const [loading, setLoading] = useState(!serverConvite);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (serverConvite) {
      setConvite(serverConvite);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const found = await getConviteBySlugClient(slug);
        if (!cancelled) {
          setConvite(found);
          setLoadError(null);
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            "Não foi possível carregar o convite. Verifique sua conexão e tente novamente.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, serverConvite]);

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-200 border-t-rose-500" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-stone-900">
          Erro ao carregar
        </h1>
        <p className="mt-2 text-stone-600" role="alert">
          {loadError}
        </p>
      </div>
    );
  }

  if (!convite) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-stone-900">
          Convite não encontrado
        </h1>
        <p className="mt-2 text-stone-600">
          Este convite não existe ou o link pode estar incorreto.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {justPublished && (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700"
          role="status"
        >
          Convite publicado com sucesso!
        </p>
      )}
      <ConvitePublicView convite={convite} />
    </div>
  );
}
