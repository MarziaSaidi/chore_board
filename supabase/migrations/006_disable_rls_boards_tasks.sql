-- Migration 006: Disable RLS on boards and tasks
-- Security is enforced at the application layer via requireUser() in server actions.
-- RLS on boards was causing auth.uid() to return null in production server actions
-- due to session cookie not being attached to the Supabase client context.

alter table public.boards disable row level security;
alter table public.tasks disable row level security;
