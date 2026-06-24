import { redirect } from "next/navigation";
import { createClient } from "./server";

/**
 * Shared auth guard for server actions and route handlers.
 * Returns the authenticated supabase client and user, or redirects to /login.
 */
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}
