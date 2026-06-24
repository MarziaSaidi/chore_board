-- Enable Supabase Realtime for the tasks table.
-- Run this in the Supabase SQL Editor. Safe to run multiple times.
--
-- Realtime broadcasts row changes over the `supabase_realtime` publication.
-- RLS still applies: a client only receives change events for rows its
-- policies allow it to SELECT (so users only see their own tasks live).

-- 1. Add the tasks table to the realtime publication (idempotent).
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'tasks'
  ) then
    execute 'alter publication supabase_realtime add table public.tasks';
  end if;
end $$;

-- 2. Emit the full row on UPDATE/DELETE events (not just the primary key),
--    so change payloads include the data your handlers need.
alter table public.tasks replica identity full;
