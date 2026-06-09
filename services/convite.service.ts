import { inviteToPublic } from "@/lib/convites/mappers";
import { createInvite, getInviteBySlug } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";
import type { ConvitePublic, CreateConviteInput } from "@/types/convite";

export async function publishConvite(
  input: CreateConviteInput,
): Promise<ConvitePublic> {
  const slug = await createInvite(input);
  const supabase = createClient();
  const invite = await getInviteBySlug(slug, supabase);

  if (!invite) {
    throw new Error("Convite criado, mas não foi possível carregá-lo.");
  }

  return inviteToPublic(invite);
}

export async function getConviteBySlugClient(
  slug: string,
): Promise<ConvitePublic | null> {
  const supabase = createClient();
  const invite = await getInviteBySlug(slug, supabase);
  return invite ? inviteToPublic(invite) : null;
}
