-- Migration 001: performance indexes + updated_at
-- Run in Supabase SQL Editor. Safe to run multiple times (all ops are idempotent).

-- ── updated_at column on tasks ────────────────────────────────────────────────
-- Tracks when a task was last modified. Useful for conflict detection,
-- "recently updated" sort, and change-feed consumers.

alter table public.tasks
  add column if not exists updated_at timestamptz not null default now();

-- Keep updated_at in sync automatically — no need to set it in application code.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

-- ── Composite index for Kanban query ─────────────────────────────────────────
-- The board page runs:  WHERE board_id = $1  ORDER BY position ASC
-- This covers the filter + sort in a single index scan (no heap sort needed).
create index if not exists tasks_board_position_idx
  on public.tasks (board_id, position asc);

-- ── Composite index for per-status column counts ─────────────────────────────
-- Efficient for future aggregation queries like:
--   SELECT status, count(*) FROM tasks WHERE board_id = $1 GROUP BY status
create index if not exists tasks_board_status_idx
  on public.tasks (board_id, status);

-- Drop the old single-column board_id index — superseded by the composite ones above.
-- (Postgres can use the leading column of a composite index for single-column lookups.)
drop index if exists public.tasks_board_id_idx;
