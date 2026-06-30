import { redirect } from "next/navigation";
import { createAuthAwareSupabaseClient } from "@/lib/supabase/server-auth";

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdminUser() {
  const supabase = await createAuthAwareSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmails = getAdminEmails();
  const email = user?.email?.toLowerCase();

  if (!user || !email || !adminEmails.includes(email)) {
    redirect("/acceso-denegado");
  }

  return user;
}
