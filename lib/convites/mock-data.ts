import type { ConvitePublic } from "@/types/convite";

export const MOCK_CONVITES: Record<string, ConvitePublic> = {
  "jantar-maria": {
    slug: "jantar-maria",
    guestName: "Maria Silva",
    title: "Jantar especial à luz de velas",
    message:
      "Querida Maria,\n\nPreparei uma noite inesquecível só para nós dois. Será um momento para celebrar nosso amor, com boa comida, música suave e muitas risadas.\n\nEspero você com o coração cheio de alegria. ❤️",
    date: "2026-06-14",
    time: "20:00",
    location: "Restaurante Bella Vista — Rua das Flores, 123, São Paulo",
    mapsLink: "https://maps.google.com",
    photoUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  "aniversario-joao": {
    slug: "aniversario-joao",
    guestName: "João Pedro",
    title: "Celebração de aniversário",
    message:
      "João, você é uma pessoa incrível e merece ser celebrado!\n\nVenha comemorar mais um ano de vida com amigos, música e muita diversão. Vai ser uma festa inesquecível!",
    date: "2026-07-20",
    time: "19:30",
    location: "Espaço Jardim Encantado — Av. Paulista, 1000, São Paulo",
    mapsLink: "https://maps.google.com",
    photoUrl: null,
  },
};

export function getMockConviteBySlug(slug: string): ConvitePublic | null {
  return MOCK_CONVITES[slug] ?? null;
}
