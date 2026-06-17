"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  return { supabase, user };
}

export async function createTask(formData: FormData) {
  const boardId = String(formData.get("boardId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const status = String(formData.get("status") ?? "todo");

  if (!boardId) {
    redirect("/dashboard");
  }
  if (!title) {
    redirect(`/boards/${boardId}`);
  }

  const { supabase, user } = await requireUser();

  const { error } = await supabase.from("tasks").insert({
    board_id: boardId,
    user_id: user.id,
    title,
    status,
    position: Date.now(),
  });

  if (error) {
    redirect(`/boards/${boardId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/boards/${boardId}`);
}

export async function updateTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const boardId = String(formData.get("boardId") ?? "");

  if (!id || !boardId) {
    redirect(`/boards/${boardId || ""}`);
  }

  const update: Record<string, string> = {};
  if (formData.has("title")) {
    update.title = String(formData.get("title")).trim();
  }
  if (formData.has("description")) {
    update.description = String(formData.get("description")).trim();
  }
  if (formData.has("status")) {
    update.status = String(formData.get("status"));
  }

  if (Object.keys(update).length === 0) {
    redirect(`/boards/${boardId}`);
  }

  const { supabase } = await requireUser();

  const { error } = await supabase.from("tasks").update(update).eq("id", id);

  if (error) {
    redirect(`/boards/${boardId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/boards/${boardId}`);
}

export async function deleteTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const boardId = String(formData.get("boardId") ?? "");

  if (!id || !boardId) {
    redirect(`/boards/${boardId || ""}`);
  }

  const { supabase } = await requireUser();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    redirect(`/boards/${boardId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/boards/${boardId}`);
}
