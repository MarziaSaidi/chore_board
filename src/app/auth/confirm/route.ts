import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function safeRedirectPath(next: string | null): string {
  if (!next) return "/dashboard";
  // Reject anything that looks like an absolute URL or protocol-relative URL
  if (/^https?:\/\//i.test(next) || next.startsWith("//")) return "/dashboard";
  // Must start with /
  if (!next.startsWith("/")) return "/dashboard";
  return next;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeRedirectPath(searchParams.get("next"));

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      redirect(next);
    }
  }

  redirect(
    `/login?error=${encodeURIComponent(
      "Email confirmation link is invalid or has expired.",
    )}`,
  );
}
