-- Task Manager schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- Safe to run multiple times.

-- =========================================================
-- Tables
-- =========================================================

create table if not exists public.boards (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  title      text not null check (char_length(title) between 1 and 120),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id          uuid primary key default gen_random_uuid(),
  board_id    uuid not null references public.boards (id) on delete cascade,
  user_id     uuid not null references auth.users (id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 200),
  description text,
  status      text not null default 'todo'
              check (status in ('todo', 'in_progress', 'done')),
  position    double precision not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists boards_user_id_idx on public.boards (user_id);
create index if not exists tasks_board_id_idx on public.tasks (board_id);
create index if not exists tasks_user_id_idx  on public.tasks (user_id);

-- =========================================================
-- Row Level Security
-- =========================================================

alter table public.boards enable row level security;
alter table public.tasks  enable row level security;

-- Boards: a user may only access their own rows.
drop policy if exists "boards_select_own" on public.boards;
create policy "boards_select_own" on public.boards
  for select using (auth.uid() = user_id);

drop policy if exists "boards_insert_own" on public.boards;
create policy "boards_insert_own" on public.boards
  for insert with check (auth.uid() = user_id);

drop policy if exists "boards_update_own" on public.boards;
create policy "boards_update_own" on public.boards
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "boards_delete_own" on public.boards;
create policy "boards_delete_own" on public.boards
  for delete using (auth.uid() = user_id);

-- Tasks: a user may only access their own rows.
drop policy if exists "tasks_select_own" on public.tasks;
create policy "tasks_select_own" on public.tasks
  for select using (auth.uid() = user_id);

drop policy if exists "tasks_insert_own" on public.tasks;
create policy "tasks_insert_own" on public.tasks
  for insert with check (auth.uid() = user_id);

drop policy if exists "tasks_update_own" on public.tasks;
create policy "tasks_update_own" on public.tasks
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "tasks_delete_own" on public.tasks;
create policy "tasks_delete_own" on public.tasks
  for delete using (auth.uid() = user_id);
