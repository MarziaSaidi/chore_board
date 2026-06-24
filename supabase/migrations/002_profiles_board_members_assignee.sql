-- Migration 002: profiles, board_members, assignee_id
-- Run in Supabase SQL Editor. Safe to run multiple times.

-- =========================================================
-- profiles (mirrors auth.users, auto-populated via trigger)
-- =========================================================

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_members" on public.profiles;
create policy "profiles_select_members" on public.profiles
  for select using (true);  -- any authenticated user can read profiles

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Trigger: insert a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill profiles for existing users
insert into public.profiles (id, email, full_name)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1))
from auth.users
on conflict (id) do nothing;

-- =========================================================
-- board_members (many-to-many: boards <-> profiles)
-- =========================================================

create table if not exists public.board_members (
  id         uuid primary key default gen_random_uuid(),
  board_id   uuid not null references public.boards (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (board_id, user_id)
);

create index if not exists board_members_board_id_idx on public.board_members (board_id);
create index if not exists board_members_user_id_idx  on public.board_members (user_id);

alter table public.board_members enable row level security;

-- Board owner can read/manage members
drop policy if exists "board_members_select" on public.board_members;
create policy "board_members_select" on public.board_members
  for select using (
    exists (
      select 1 from public.boards
      where id = board_id and user_id = auth.uid()
    )
    or user_id = auth.uid()
  );

drop policy if exists "board_members_insert" on public.board_members;
create policy "board_members_insert" on public.board_members
  for insert with check (
    exists (
      select 1 from public.boards
      where id = board_id and user_id = auth.uid()
    )
  );

drop policy if exists "board_members_delete" on public.board_members;
create policy "board_members_delete" on public.board_members
  for delete using (
    exists (
      select 1 from public.boards
      where id = board_id and user_id = auth.uid()
    )
  );

-- Auto-add board creator as a member when a board is created
create or replace function public.handle_new_board()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.board_members (board_id, user_id)
  values (new.id, new.user_id)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_board_created on public.boards;
create trigger on_board_created
  after insert on public.boards
  for each row execute procedure public.handle_new_board();

-- Backfill board_members for existing boards
insert into public.board_members (board_id, user_id)
select id, user_id from public.boards
on conflict do nothing;

-- =========================================================
-- tasks: add assignee_id
-- =========================================================

alter table public.tasks
  add column if not exists assignee_id uuid references public.profiles (id) on delete set null;

create index if not exists tasks_assignee_id_idx on public.tasks (assignee_id);

-- Update tasks RLS: board members can see all tasks on their boards
drop policy if exists "tasks_select_own" on public.tasks;
create policy "tasks_select_own" on public.tasks
  for select using (
    exists (
      select 1 from public.board_members
      where board_id = tasks.board_id and user_id = auth.uid()
    )
  );
