import Link from "next/link";
import { createAuthAwareSupabaseClient } from "@/lib/supabase/server-auth";
import { formatArs } from "@/lib/format";

export default async function MyOrdersPage() {
  const supabase = await createAuthAwareSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-black uppercase tracking-tight">
          Iniciá sesión para ver tus pedidos
        </h1>
        <p className="mt-2 text-[14px] text-ink-soft">
          Usá el botón &quot;Ingresar&quot; en la parte superior.
        </p>
      </div>
    );
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("id, created_at, status, total_ars")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-2xl font-black uppercase tracking-tight">
        Mis pedidos
      </h1>

      {!orders || orders.length === 0 ? (
        <p className="mt-8 text-[14px] text-ink-soft">
          Todavía no hiciste ningún pedido.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <Link
                  href={`/pedido/${order.id}/confirmacion`}
                  className="font-medium hover:text-court"
                >
                  Pedido #{order.id.slice(0, 8)}
                </Link>
                <p className="mt-0.5 text-[13px] text-ink-soft">
                  {new Date(order.created_at).toLocaleDateString("es-AR")} ·{" "}
                  {order.status}
                </p>
              </div>
              <p className="font-medium">{formatArs(order.total_ars)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
