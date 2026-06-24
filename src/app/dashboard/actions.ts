"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import {
  insertBoard,
  removeBoard,
  invalidateUserBoards,
} from "@/lib/db/boards";
import { checkRateLimit, MUTATION_LIMIT } from "@/lib/rate-limit";
import { toUserMessage } from "@/lib/errors";

export type BoardActionState = { error: string } | null;

export async function createBoard(
  _prevState: BoardActionState,
  formData: FormData,
): Promise<BoardActionState> {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Board title is required." };

  const { user } = await requireUser();

  const rl = checkRateLimit(`createBoard:${user.id}`, MUTATION_LIMIT);
  if (!rl.allowed) return { error: "Too many requests. Please slow down." };

  try {
    await insertBoard(user.id, title);
  } catch (err) {
    return { error: toUserMessage(err) };
  }

  invalidateUserBoards(user.id);
  redirect("/dashboard");
}

export async function deleteBoard(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/dashboard");

  const { user } = await requireUser();

  const rl = checkRateLimit(`deleteBoard:${user.id}`, MUTATION_LIMIT);
  if (!rl.allowed) {
    redirect(`/dashboard?error=${encodeURIComponent("Too many requests. Please slow down.")}`);
  }

  try {
    await removeBoard(id);
  } catch (err) {
    redirect(`/dashboard?error=${encodeURIComponent(toUserMessage(err))}`);
  }

  invalidateUserBoards(user.id);
  redirect("/dashboard");
}
