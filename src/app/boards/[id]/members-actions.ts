"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/auth";
import { checkRateLimit, MUTATION_LIMIT } from "@/lib/rate-limit";
import { toUserMessage } from "@/lib/errors";

export type InviteState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export async function inviteMember(
  _prev: InviteState,
  formData: FormData,
): Promise<InviteState> {
  const boardId = String(formData.get("boardId") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!boardId) return { type: "error", message: "Invalid board." };
  if (!email) return { type: "error", message: "Email is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { type: "error", message: "Enter a valid email address." };
  }

  const { user, supabase } = await requireUser();

  const rl = checkRateLimit(`invite:${user.id}`, MUTATION_LIMIT);
  if (!rl.allowed) {
    return { type: "error", message: "Too many requests. Please slow down." };
  }

  // Only the board owner can invite
  const { data: board } = await supabase
    .from("boards")
    .select("user_id")
    .eq("id", boardId)
    .single();

  if (!board) return { type: "error", message: "Board not found." };
  if (board.user_id !== user.id) {
    return { type: "error", message: "Only the board owner can invite members." };
  }

  // Can't invite yourself
  if (email === user.email) {
    return { type: "error", message: "You are already a member of this board." };
  }

  // Look up the invitee by email
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name")
    .eq("email", email)
    .maybeSingle();

  if (!profile) {
    return {
      type: "error",
      message: "No account found with that email. Ask them to sign up first.",
    };
  }

  // Check if already a member
  const { data: existing } = await supabase
    .from("board_members")
    .select("id")
    .eq("board_id", boardId)
    .eq("user_id", profile.id)
    .maybeSingle();

  if (existing) {
    return {
      type: "error",
      message: `${profile.full_name ?? email} is already a member.`,
    };
  }

  try {
    const { error } = await supabase
      .from("board_members")
      .insert({ board_id: boardId, user_id: profile.id });

    if (error) throw error;
  } catch (err) {
    return { type: "error", message: toUserMessage(err) };
  }

  revalidatePath(`/boards/${boardId}`);
  return {
    type: "success",
    message: `${profile.full_name ?? email} was added to the board.`,
  };
}

export async function removeMember(formData: FormData): Promise<void> {
  const boardId = String(formData.get("boardId") ?? "").trim();
  const memberId = String(formData.get("memberId") ?? "").trim();

  if (!boardId || !memberId) return;

  const { user, supabase } = await requireUser();

  // Only board owner can remove others; members can remove themselves
  const { data: board } = await supabase
    .from("boards")
    .select("user_id")
    .eq("id", boardId)
    .single();

  if (!board) return;
  if (board.user_id !== user.id && memberId !== user.id) return;
  if (memberId === board.user_id) return; // can't remove owner

  await supabase
    .from("board_members")
    .delete()
    .eq("board_id", boardId)
    .eq("user_id", memberId);

  revalidatePath(`/boards/${boardId}`);
}
