import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { preparePhotoForStorage } from "@/lib/convites/photo";
import type { CreateConviteInput } from "@/types/convite";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, Invite, InviteInsert } from "@/lib/supabase/types";

export type { Database, Invite, InviteInsert } from "@/lib/supabase/types";

function generateUniqueSlug(): string {
  return crypto.randomUUID();
}

function logCreateInviteError(error: PostgrestError) {
  console.error("[createInvite] Erro ao salvar no Supabase");
  console.error("[createInvite] error.message:", error.message);
  console.error("[createInvite] error.details:", error.details);
  console.error("[createInvite] error.code:", error.code);
  console.error("[createInvite] Erro completo:", error);
}

/** Salva o convite na tabela `convites` e retorna o slug gerado. */
export async function createInvite(input: CreateConviteInput): Promise<string> {
  const supabase = createBrowserClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("Você precisa estar logado para criar um convite.");
  }

  const slug = generateUniqueSlug();
  const photoUrl = await preparePhotoForStorage(input.photoUrl);

  const payload: InviteInsert = {
    slug,
    user_id: user.id,
    nome_convidado: input.guestName,
    titulo: input.title,
    mensagem: input.message,
    data_evento: input.date,
    horario: input.time,
    local: input.location,
    foto_url: photoUrl,
  };

  console.info("[createInvite] Colunas enviadas:", Object.keys(payload));
  console.info("[createInvite] Salvando convite no Supabase", { slug, payload });

  const { error } = await supabase.from("convites").insert(payload);

  if (error) {
    logCreateInviteError(error);
    throw error;
  }

  console.info("[createInvite] Convite salvo com sucesso", { slug });
  return slug;
}

export async function getInviteBySlug(
  slug: string,
  supabase: SupabaseClient<Database>,
): Promise<Invite | null> {
  const { data, error } = await supabase
    .from("convites")
    .select()
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getInvitesByUserId(
  userId: string,
  supabase: SupabaseClient<Database>,
): Promise<Invite[]> {
  const { data, error } = await supabase
    .from("convites")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function confirmInviteResponse(slug: string): Promise<void> {
  const supabase = createBrowserClient();

  const { error } = await supabase
    .from("convites")
    .update({
      resposta: "confirmado",
      respondido_em: new Date().toISOString(),
    })
    .eq("slug", slug)
    .is("resposta", null);

  if (error) throw error;
}
