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
      <div className="flex items-center gap-4">
        <Link
          href="/mis-pedidos"
          className="hidden text-ink-soft transition-colors hover:text-ink sm:inline"
        >
          {user.email}
        </Link>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-ink-soft transition-colors hover:text-ink"
        >
          Salir
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
      className="text-ink-soft transition-colors hover:text-ink"
    >
      Ingresar
    </button>
  );
}
