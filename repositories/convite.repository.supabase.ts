import { inviteToPublic } from "@/lib/convites/mappers";
import { createInvite, getInviteBySlug } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";
import type { ConviteRepository } from "./convite.repository";

export const supabaseConviteRepository: ConviteRepository = {
  async create(convite) {
    const slug = await createInvite(convite);
    const supabase = createClient();
    const invite = await getInviteBySlug(slug, supabase);

    if (!invite) {
      throw new Error("Convite criado, mas não foi possível carregá-lo.");
    }

    return inviteToPublic(invite);
  },

  async findBySlug(slug) {
    const supabase = createClient();
    const invite = await getInviteBySlug(slug, supabase);
    return invite ? inviteToPublic(invite) : null;
  },
};
