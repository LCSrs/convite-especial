-- Colunas de autenticação e resposta do convidado

alter table public.convites
  add column if not exists user_id uuid references auth.users (id),
  add column if not exists resposta text,
  add column if not exists respondido_em timestamptz;

create index if not exists convites_user_id_idx on public.convites (user_id);

-- Atualiza políticas de RLS
drop policy if exists "Convites são públicos para leitura" on public.convites;
drop policy if exists "Qualquer um pode criar convite" on public.convites;

create policy "Leitura pública de convites"
  on public.convites for select
  using (true);

create policy "Usuários autenticados criam convites"
  on public.convites for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Criadores veem seus convites"
  on public.convites for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Convidados confirmam presença"
  on public.convites for update
  using (resposta is null)
  with check (resposta is not null and respondido_em is not null);
