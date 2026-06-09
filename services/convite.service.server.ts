import "server-only";

import { inviteToPublic } from "@/lib/convites/mappers";
import { getInviteBySlug, getInvitesByUserId } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";
import type { ConvitePublic } from "@/types/convite";
import type { Invite } from "@/lib/supabase/types";

export async function getConviteBySlugServer(
  slug: string,
): Promise<ConvitePublic | null> {
  const supabase = await createClient();
  const invite = await getInviteBySlug(slug, supabase);
  return invite ? inviteToPublic(invite) : null;
}

export async function getMeusConvitesServer(): Promise<Invite[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  return getInvitesByUserId(user.id, supabase);
}
