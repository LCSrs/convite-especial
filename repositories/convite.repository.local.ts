import { fromConviteRecord, toConviteRecord } from "@/lib/convites/mappers";
import type { ConvitePublic } from "@/types/convite";
import type { ConviteRepository } from "./convite.repository";

const STORAGE_KEY = "convite-especial:convites";

function readStore(): Record<string, ConvitePublic> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, ConvitePublic>;
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, ConvitePublic>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export const localConviteRepository: ConviteRepository = {
  async create(convite) {
    const store = readStore();
    store[convite.slug] = convite;
    writeStore(store);
    return convite;
  },

  async findBySlug(slug) {
    const store = readStore();
    return store[slug] ?? null;
  },
};

/** Persiste no formato Supabase para facilitar migração futura. */
export function saveConviteRecordLocally(convite: ConvitePublic) {
  const record = toConviteRecord(convite);
  const recordsKey = `${STORAGE_KEY}:records`;
  const records = JSON.parse(
    localStorage.getItem(recordsKey) ?? "{}",
  ) as Record<string, typeof record>;
  records[convite.slug] = record;
  localStorage.setItem(recordsKey, JSON.stringify(records));
}

export function getConviteRecordLocally(slug: string) {
  const recordsKey = `${STORAGE_KEY}:records`;
  const records = JSON.parse(
    localStorage.getItem(recordsKey) ?? "{}",
  ) as Record<string, ReturnType<typeof toConviteRecord>>;

  const record = records[slug];
  return record ? fromConviteRecord(record) : null;
}
