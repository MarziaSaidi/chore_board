-- Migration 003: Fix RLS so invited members can access boards and tasks
-- Run in Supabase SQL Editor. Safe to run multiple times.

-- =========================================================
-- Boards: allow any board member to read the board
-- =========================================================

drop policy if exists "boards_select_own" on public.boards;
create policy "boards_select_own" on public.boards
  for select using (
    exists (
      select 1 from public.board_members
      where board_id = boards.id and user_id = auth.uid()
    )
  );

-- =========================================================
-- Tasks: allow any board member to insert/update/delete
-- =========================================================

drop policy if exists "tasks_insert_own" on public.tasks;
create policy "tasks_insert_own" on public.tasks
  for insert with check (
    exists (
      select 1 from public.board_members
      where board_id = tasks.board_id and user_id = auth.uid()
    )
  );

drop policy if exists "tasks_update_own" on public.tasks;
create policy "tasks_update_own" on public.tasks
  for update using (
    exists (
      select 1 from public.board_members
      where board_id = tasks.board_id and user_id = auth.uid()
    )
  );

drop policy if exists "tasks_delete_own" on public.tasks;
create policy "tasks_delete_own" on public.tasks
  for delete using (
    exists (
      select 1 from public.board_members
      where board_id = tasks.board_id and user_id = auth.uid()
    )
  );
