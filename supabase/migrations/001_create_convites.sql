-- Estrutura real da tabela `convites` no Supabase

create table if not exists public.convites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome_convidado text not null,
  titulo text not null,
  mensagem text not null,
  data_evento date not null,
  horario time not null,
  local text not null,
  foto_url text,
  created_at timestamptz not null default now()
);

create index if not exists convites_slug_idx on public.convites (slug);

alter table public.convites enable row level security;

create policy "Convites são públicos para leitura"
  on public.convites for select
  using (true);

create policy "Qualquer um pode criar convite"
  on public.convites for insert
  with check (true);
