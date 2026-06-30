"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => subscription.subscription.unsubscribe();
  }, [supabase]);

  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Link href="/mis-pedidos" className="hover:underline">
          {user.email}
        </Link>
        <button
          onClick={() => supabase.auth.signOut()}
          className="hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/auth/callback` },
        })
      }
      className="text-sm hover:underline"
    >
      Iniciar sesión
    </button>
  );
}
