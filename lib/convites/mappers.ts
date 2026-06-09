import type { Invite } from "@/lib/supabase/types";
import type { ConvitePublic, ConviteRecord } from "@/types/convite";

export function inviteToPublic(invite: Invite): ConvitePublic {
  return {
    slug: invite.slug,
    guestName: invite.nome_convidado,
    title: invite.titulo,
    message: invite.mensagem,
    date: invite.data_evento,
    time: invite.horario,
    location: invite.local,
    mapsLink: "",
    photoUrl: invite.foto_url,
    resposta: invite.resposta,
    respondidoEm: invite.respondido_em,
  };
}

export function toConviteRecord(convite: ConvitePublic): ConviteRecord {
  return {
    id: convite.slug,
    slug: convite.slug,
    user_id: null,
    nome_convidado: convite.guestName,
    titulo: convite.title,
    mensagem: convite.message,
    data_evento: convite.date,
    horario: convite.time,
    local: convite.location,
    foto_url: convite.photoUrl,
    resposta: convite.resposta ?? null,
    respondido_em: convite.respondidoEm ?? null,
    created_at: new Date().toISOString(),
  };
}

export function fromConviteRecord(record: ConviteRecord): ConvitePublic {
  return inviteToPublic(record);
}
