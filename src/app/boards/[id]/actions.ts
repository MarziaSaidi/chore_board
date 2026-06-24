"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import {
  insertTask,
  patchTask,
  removeTask,
  getNextPosition,
  invalidateBoardTasks,
} from "@/lib/db/tasks";
import { checkRateLimit, MUTATION_LIMIT } from "@/lib/rate-limit";
import { toUserMessage } from "@/lib/errors";
import type { TaskStatus } from "@/lib/supabase/types";

export type TaskActionState = { error: string } | null;

const VALID_STATUSES = new Set<TaskStatus>(["todo", "in_progress", "done"]);

function parseStatus(raw: string): TaskStatus {
  if (!VALID_STATUSES.has(raw as TaskStatus)) {
    throw new Error(`Invalid task status: ${raw}`);
  }
  return raw as TaskStatus;
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

  let status: TaskStatus;
  try {
    status = parseStatus(rawStatus);
  } catch {
    return { error: "Invalid status." };
  }

  const { user } = await requireUser();

  const rl = checkRateLimit(`createTask:${user.id}`, MUTATION_LIMIT);
  if (!rl.allowed) return { error: "Too many requests. Please slow down." };

  try {
    const assigneeId = formData.get("assignee_id") as string | null;
    const position = await getNextPosition(boardId);
    await insertTask({ boardId, userId: user.id, title, status, position, assigneeId: assigneeId || null });
  } catch (err) {
    return { error: toUserMessage(err) };
  }

  invalidateBoardTasks(boardId);
  return null;
}

export async function updateTask(
  _prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const id = String(formData.get("id") ?? "");
  const boardId = String(formData.get("boardId") ?? "");

  if (!id || !boardId) redirect(`/boards/${boardId || ""}`);

  type TaskUpdate = { title?: string; description?: string; status?: TaskStatus; assigneeId?: string | null };
  const update: TaskUpdate = {};

  if (formData.has("title")) {
    const title = String(formData.get("title")).trim();
    if (!title) return { error: "Task title cannot be empty." };
    update.title = title;
  }
  if (formData.has("description")) {
    update.description = String(formData.get("description")).trim();
  }
  if (formData.has("assignee_id")) {
    update.assigneeId = (formData.get("assignee_id") as string) || null;
  }
  if (formData.has("status")) {
    try {
      update.status = parseStatus(String(formData.get("status")));
    } catch {
      return { error: "Invalid status." };
    }
  }

  if (Object.keys(update).length === 0) redirect(`/boards/${boardId}`);

  const { user } = await requireUser();

  const rl = checkRateLimit(`updateTask:${user.id}`, MUTATION_LIMIT);
  if (!rl.allowed) return { error: "Too many requests. Please slow down." };

  try {
    await patchTask(id, update);
  } catch (err) {
    return { error: toUserMessage(err) };
  }

  invalidateBoardTasks(boardId);
  return null;
}

export async function moveTask(
  taskId: string,
  boardId: string,
  status: TaskStatus,
  position: number,
): Promise<void> {
  const { user } = await requireUser();

  const rl = checkRateLimit(`moveTask:${user.id}`, MUTATION_LIMIT);
  if (!rl.allowed) return;

  try {
    await patchTask(taskId, { status, position });
  } catch {
    // realtime will reconcile state on next subscription event
  }

  invalidateBoardTasks(boardId);
}

export async function deleteTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const boardId = String(formData.get("boardId") ?? "");

  if (!id || !boardId) redirect(`/boards/${boardId || ""}`);

  const { user } = await requireUser();

  const rl = checkRateLimit(`deleteTask:${user.id}`, MUTATION_LIMIT);
  if (!rl.allowed) {
    redirect(`/boards/${boardId}?error=${encodeURIComponent("Too many requests.")}`);
  }

  try {
    await removeTask(id);
  } catch (err) {
    redirect(`/boards/${boardId}?error=${encodeURIComponent(toUserMessage(err))}`);
  }

  invalidateBoardTasks(boardId);
}
