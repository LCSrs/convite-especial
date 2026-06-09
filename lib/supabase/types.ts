/** Linha da tabela `convites` no Supabase. */
export type Invite = {
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

export type InviteInsert = Omit<
  Invite,
  "id" | "created_at" | "resposta" | "respondido_em"
> & {
  id?: string;
  created_at?: string;
  resposta?: string | null;
  respondido_em?: string | null;
};

export type Database = {
  public: {
    Tables: {
      convites: {
        Row: Invite;
        Insert: InviteInsert;
        Update: Partial<Invite>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
