-- Migration 004: Fix infinite recursion in board_members RLS
-- The old policy checked boards.user_id = auth.uid(), but boards RLS
-- checks board_members, causing a circular reference.
-- Fix: members can simply see rows where they are the user.

drop policy if exists "board_members_select" on public.board_members;
create policy "board_members_select" on public.board_members
  for select using (user_id = auth.uid());
