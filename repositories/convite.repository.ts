import type { ConvitePublic } from "@/types/convite";

export interface ConviteRepository {
  create(convite: ConvitePublic): Promise<ConvitePublic>;
  findBySlug(slug: string): Promise<ConvitePublic | null>;
}
