import { cacheTag, cacheLife, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Board } from "@/lib/supabase/types";

// ── Cache tag helpers ─────────────────────────────────────────────

export const boardsCacheTag = (userId: string) => `boards:user:${userId}`;
export const boardCacheTag = (boardId: string) => `board:${boardId}`;

// ── Queries ───────────────────────────────────────────────────────

export async function getUserBoards(userId: string): Promise<Board[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(boardsCacheTag(userId));

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("boards")
    .select("id, user_id, title, created_at")
    .order("created_at", { ascending: false })
    .returns<Board[]>();

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBoardById(boardId: string): Promise<Board | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(boardCacheTag(boardId));

  const supabase = await createClient();
  const { data } = await supabase
    .from("boards")
    .select("id, user_id, title, created_at")
    .eq("id", boardId)
    .maybeSingle<Board>();

  return data ?? null;
}

// ── Mutations ─────────────────────────────────────────────────────

export async function insertBoard(userId: string, title: string): Promise<Board> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("boards")
    .insert({ title, user_id: userId })
    .select("id, user_id, title, created_at")
    .single<Board>();

  if (error) throw new Error(error.message);
  return data;
}

export async function removeBoard(boardId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("boards").delete().eq("id", boardId);
  if (error) throw new Error(error.message);
}

// ── Cache invalidation helpers ────────────────────────────────────

export function invalidateUserBoards(userId: string) {
  revalidateTag(boardsCacheTag(userId), "default");
}

export function invalidateBoard(boardId: string) {
  revalidateTag(boardCacheTag(boardId), "default");
}
