import { createClient } from "@/lib/supabase/server";
import type { BoardMember } from "@/lib/supabase/types";

export async function getBoardMembers(boardId: string): Promise<BoardMember[]> {
  const supabase = await createClient();

  const { data: memberRows, error: membersError } = await supabase
    .from("board_members")
    .select("user_id")
    .eq("board_id", boardId);

  if (membersError) throw new Error(membersError.message);
  if (!memberRows || memberRows.length === 0) return [];

  const userIds = memberRows.map((r) => r.user_id);

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, email, full_name")
    .in("id", userIds);

  if (profilesError) throw new Error(profilesError.message);

  return (profiles ?? []).map((profile) => ({
    user_id: profile.id,
    profile,
  }));
}
