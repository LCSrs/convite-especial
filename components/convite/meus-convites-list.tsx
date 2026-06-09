"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDate, formatTime } from "@/lib/format-date";
import type { Invite } from "@/lib/supabase/types";

type MeusConvitesListProps = {
  convites: Invite[];
};

function formatResposta(resposta: string | null, respondidoEm: string | null) {
  if (!resposta) return "Aguardando resposta";

  const quando = respondidoEm
    ? new Date(respondidoEm).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const label =
    resposta === "confirmado"
      ? "Presença confirmada"
      : resposta.charAt(0).toUpperCase() + resposta.slice(1);

  return quando ? `${label} em ${quando}` : label;
}

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/convite/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:bg-rose-50"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copiar link
        </>
      )}
    </button>
  );
}

export function MeusConvitesList({ convites }: MeusConvitesListProps) {
  if (convites.length === 0) {
    return (
      <div className="rounded-2xl border border-rose-100/80 bg-white p-8 text-center shadow-xl shadow-rose-100/40">
        <p className="text-stone-600">
          Você ainda não criou nenhum convite.
        </p>
        <Link
          href="/criar"
          className="mt-4 inline-block text-sm font-medium text-rose-500 hover:underline"
        >
          Criar primeiro convite
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {convites.map((convite) => {
        const inviteUrl = `/convite/${convite.slug}`;

        return (
          <article
            key={convite.id}
            className="rounded-2xl border border-rose-100/80 bg-white p-5 shadow-lg shadow-rose-100/30 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-stone-900">
                  {convite.titulo}
                </h2>
                <p className="text-sm text-stone-600">
                  Para: {convite.nome_convidado}
                </p>
                <div className="space-y-1 text-sm text-stone-600">
                  <p>
                    <span className="font-medium text-stone-700">Data:</span>{" "}
                    {formatDate(convite.data_evento)}
                  </p>
                  <p>
                    <span className="font-medium text-stone-700">Horário:</span>{" "}
                    {formatTime(convite.horario)}
                  </p>
                  <p>
                    <span className="font-medium text-stone-700">Local:</span>{" "}
                    {convite.local}
                  </p>
                  <p>
                    <span className="font-medium text-stone-700">Resposta:</span>{" "}
                    {formatResposta(convite.resposta, convite.respondido_em)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <CopyLinkButton slug={convite.slug} />
                <Link
                  href={inviteUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-600"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver convite
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
