export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error(
      "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local.",
    );
  }

  const normalizedUrl = url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

  if (
    !normalizedUrl.startsWith("https://") ||
    !normalizedUrl.includes(".supabase.co")
  ) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL inválida. Use o formato https://<project-ref>.supabase.co",
    );
  }

  return { url: normalizedUrl, anonKey };
}
