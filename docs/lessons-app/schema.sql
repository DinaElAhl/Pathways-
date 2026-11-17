-- Roots | جذور — learning paths database.
-- Run this once in Supabase: SQL Editor → New query → paste → Run.

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  content jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  student_name text not null check (char_length(student_name) between 1 and 80),
  class_name text check (class_name is null or char_length(class_name) <= 80),
  data jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists results_lesson_idx on public.results(lesson_id, created_at desc);

alter table public.lessons enable row level security;
alter table public.results enable row level security;

-- Lessons: teachers manage their own.
drop policy if exists "teachers manage own lessons" on public.lessons;
create policy "teachers manage own lessons" on public.lessons
  for all to authenticated using (owner = auth.uid()) with check (owner = auth.uid());

-- Students never read the tables directly. They go through two functions that check
-- that the lesson is published and that the class code (if the lesson has one) is right.
drop policy if exists "anyone reads published lessons" on public.lessons;
drop policy if exists "students submit results" on public.results;

alter table public.lessons add column if not exists access_code text;

create or replace function public.get_lesson(p_id uuid, p_code text default null)
returns json language plpgsql stable security definer set search_path = public as $$
declare l public.lessons%rowtype;
begin
  select * into l from public.lessons where id = p_id;
  if not found then return json_build_object('status', 'missing'); end if;
  if l.owner = auth.uid() then
    return json_build_object('status', 'ok', 'title', l.title, 'content', l.content);
  end if;
  if not l.published then return json_build_object('status', 'missing'); end if;
  if coalesce(trim(l.access_code), '') <> ''
     and lower(trim(l.access_code)) <> lower(trim(coalesce(p_code, ''))) then
    return json_build_object('status', case when coalesce(trim(p_code), '') = '' then 'code' else 'wrong' end);
  end if;
  return json_build_object('status', 'ok', 'title', l.title, 'content', l.content);
end $$;

create or replace function public.submit_result(p_id uuid, p_code text, p_name text, p_class text, p_data jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare l public.lessons%rowtype;
begin
  select * into l from public.lessons where id = p_id and published;
  if not found then return false; end if;
  if coalesce(trim(l.access_code), '') <> ''
     and lower(trim(l.access_code)) <> lower(trim(coalesce(p_code, ''))) then return false; end if;
  if char_length(coalesce(trim(p_name), '')) not between 1 and 80 then return false; end if;
  if pg_column_size(p_data) > 200000 then return false; end if;
  insert into public.results (lesson_id, student_name, class_name, data)
  values (p_id, trim(p_name), nullif(left(trim(coalesce(p_class, '')), 80), ''), p_data);
  return true;
end $$;

revoke all on function public.get_lesson(uuid, text) from public;
revoke all on function public.submit_result(uuid, text, text, text, jsonb) from public;
grant execute on function public.get_lesson(uuid, text) to anon, authenticated;
grant execute on function public.submit_result(uuid, text, text, text, jsonb) to anon, authenticated;

-- Results: only the lesson's teacher can read or delete them.
drop policy if exists "teachers read own results" on public.results;
create policy "teachers read own results" on public.results
  for select to authenticated
  using (exists (select 1 from public.lessons l where l.id = lesson_id and l.owner = auth.uid()));

drop policy if exists "teachers delete own results" on public.results;
create policy "teachers delete own results" on public.results
  for delete to authenticated
  using (exists (select 1 from public.lessons l where l.id = lesson_id and l.owner = auth.uid()));
