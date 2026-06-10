export type ConviteFormData = {
  guestName: string;
  title: string;
  message: string;
  date: string;
  time: string;
  location: string;
  mapsLink: string;
  customSlug?: string;
};

export type ConvitePreviewData = ConviteFormData & {
  photoUrl: string | null;
};

export type ConvitePublic = ConvitePreviewData & {
  slug: string;
  resposta?: string | null;
  respondidoEm?: string | null;
};

/** Formato da tabela `convites` no Supabase. */
export type ConviteRecord = {
  id: string;
  slug: string;
  user_id: string | null;
  nome_convidado: string;
  titulo: string;
  mensagem: string;
  data_evento: string;
  horario: string;
  local: string;
  foto_url: string | null;
  resposta: string | null;
  respondido_em: string | null;
  created_at: string;
};

export type CreateConviteInput = ConvitePreviewData;
