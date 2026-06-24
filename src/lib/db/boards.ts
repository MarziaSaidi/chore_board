import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Board } from "@/lib/supabase/types";

// ── Queries ───────────────────────────────────────────────────────

export async function getUserBoards(userId: string): Promise<Board[]> {
  const supabase = await createClient();

  // Fetch board IDs the user is a member of (includes boards they were invited to)
  const { data: memberships, error: memberError } = await supabase
    .from("board_members")
    .select("board_id")
    .eq("user_id", userId);

  if (memberError) throw new Error(memberError.message);
  if (!memberships || memberships.length === 0) return [];

  const boardIds = memberships.map((m) => m.board_id);

  const { data, error } = await supabase
    .from("boards")
    .select("id, user_id, title, created_at")
    .in("id", boardIds)
    .order("created_at", { ascending: false })
    .returns<Board[]>();

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBoardById(boardId: string): Promise<Board | null> {
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

export function invalidateUserBoards(_userId: string) {
  revalidatePath("/dashboard");
}

export function invalidateBoard(boardId: string) {
  revalidatePath(`/boards/${boardId}`);
}
