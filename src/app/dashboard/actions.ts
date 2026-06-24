"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";

export type BoardActionState = { error: string } | null;

export async function createBoard(
  _prevState: BoardActionState,
  formData: FormData,
): Promise<BoardActionState> {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Board title is required." };

  const { supabase, user } = await requireUser();

  const { error } = await supabase
    .from("boards")
    .insert({ title, user_id: user.id });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteBoard(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/dashboard");

  const { supabase } = await requireUser();

  const { error } = await supabase.from("boards").delete().eq("id", id);

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
