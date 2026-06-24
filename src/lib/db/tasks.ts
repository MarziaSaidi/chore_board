import { cacheTag, cacheLife, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Task, TaskStatus } from "@/lib/supabase/types";

// ── Cache tag helpers ─────────────────────────────────────────────

export const tasksCacheTag = (boardId: string) => `board:${boardId}:tasks`;

// ── Queries ───────────────────────────────────────────────────────

export async function getBoardTasks(boardId: string): Promise<Task[]> {
  "use cache";
  cacheLife("seconds");
  cacheTag(tasksCacheTag(boardId));

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, board_id, user_id, title, description, status, position, created_at")
    .eq("board_id", boardId)
    .order("position", { ascending: true })
    .returns<Task[]>();

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getNextPosition(boardId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tasks")
    .select("position")
    .eq("board_id", boardId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (data?.position ?? 0) + 1;
}

// ── Mutations ─────────────────────────────────────────────────────

export type InsertTaskPayload = {
  boardId: string;
  userId: string;
  title: string;
  status: TaskStatus;
  position: number;
};

export async function insertTask(payload: InsertTaskPayload): Promise<Task> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      board_id: payload.boardId,
      user_id: payload.userId,
      title: payload.title,
      status: payload.status,
      position: payload.position,
    })
    .select("id, board_id, user_id, title, description, status, position, created_at")
    .single<Task>();

  if (error) throw new Error(error.message);
  return data;
}

export type UpdateTaskPayload = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export async function patchTask(taskId: string, update: UpdateTaskPayload): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").update(update).eq("id", taskId);
  if (error) throw new Error(error.message);
}

export async function removeTask(taskId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw new Error(error.message);
}

// ── Cache invalidation helper ─────────────────────────────────────

export function invalidateBoardTasks(boardId: string) {
  revalidateTag(tasksCacheTag(boardId), "default");
}
