-- Migration 005: Allow board members to see all other members on the same board
-- Uses a security definer function to avoid infinite RLS recursion.

create or replace function public.get_my_board_ids()
returns setof uuid language sql security definer stable as $$
  select board_id from public.board_members where user_id = auth.uid()
$$;

drop policy if exists "board_members_select" on public.board_members;
create policy "board_members_select" on public.board_members
  for select using (
    board_id in (select public.get_my_board_ids())
  );
