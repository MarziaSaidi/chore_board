"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import type { TaskStatus } from "@/lib/supabase/types";

export type TaskActionState = { error: string } | null;

const VALID_STATUSES = new Set<TaskStatus>(["todo", "in_progress", "done"]);

function assertValidStatus(value: string): TaskStatus {
  if (!VALID_STATUSES.has(value as TaskStatus)) {
    throw new Error(`Invalid task status: ${value}`);
  }
  return value as TaskStatus;
}

export async function createTask(
  _prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const boardId = String(formData.get("boardId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const rawStatus = String(formData.get("status") ?? "todo");

  if (!boardId) redirect("/dashboard");
  if (!title) return { error: "Task title is required." };

  const status = assertValidStatus(rawStatus);
  const { supabase, user } = await requireUser();

  // Use max(position)+1 so inserts are always ordered correctly even under load.
  const { data: last } = await supabase
    .from("tasks")
    .select("position")
    .eq("board_id", boardId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = (last?.position ?? 0) + 1;

  const { error } = await supabase.from("tasks").insert({
    board_id: boardId,
    user_id: user.id,
    title,
    status,
    position,
  });

  if (error) return { error: error.message };

  revalidatePath(`/boards/${boardId}`);
  return null;
}

export async function updateTask(
  _prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const id = String(formData.get("id") ?? "");
  const boardId = String(formData.get("boardId") ?? "");

  if (!id || !boardId) redirect(`/boards/${boardId || ""}`);

  type TaskUpdate = {
    title?: string;
    description?: string;
    status?: TaskStatus;
  };

  const update: TaskUpdate = {};

  if (formData.has("title")) {
    const title = String(formData.get("title")).trim();
    if (!title) return { error: "Task title cannot be empty." };
    update.title = title;
  }
  if (formData.has("description")) {
    update.description = String(formData.get("description")).trim();
  }
  if (formData.has("status")) {
    update.status = assertValidStatus(String(formData.get("status")));
  }

  if (Object.keys(update).length === 0) redirect(`/boards/${boardId}`);

  const { supabase } = await requireUser();

  const { error } = await supabase.from("tasks").update(update).eq("id", id);

  if (error) return { error: error.message };

  revalidatePath(`/boards/${boardId}`);
  return null;
}

export async function deleteTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const boardId = String(formData.get("boardId") ?? "");

  if (!id || !boardId) redirect(`/boards/${boardId || ""}`);

  const { supabase } = await requireUser();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    redirect(`/boards/${boardId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/boards/${boardId}`);
}
