import { createClient } from "@/lib/supabase/server";
import type { BoardMember } from "@/lib/supabase/types";

export async function getBoardMembers(boardId: string): Promise<BoardMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("board_members")
    .select("user_id, profile:profiles(id, email, full_name)")
    .eq("board_id", boardId)
    .returns<BoardMember[]>();

  if (error) throw new Error(error.message);
  return data ?? [];
}
