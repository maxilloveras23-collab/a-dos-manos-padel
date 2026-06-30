import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Cliente con awareness de sesión (cookies), para Server Components y Route
// Handlers que necesitan saber quién está logueado. Para lecturas públicas
// del catálogo, usar lib/supabase/server.ts en su lugar.
export async function createAuthAwareSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll puede fallar en Server Components; el middleware
            // se encarga de refrescar la sesión en ese caso.
          }
        },
      },
    }
  );
}
