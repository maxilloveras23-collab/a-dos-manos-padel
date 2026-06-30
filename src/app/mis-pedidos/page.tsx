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
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">Iniciá sesión para ver tus pedidos</h1>
        <p className="mt-2 text-neutral-600">
          Usá el botón &quot;Iniciar sesión&quot; en la parte superior.
        </p>
      </div>
    );
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("id, created_at, status, total_ars")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Mis pedidos</h1>

      {!orders || orders.length === 0 ? (
        <p className="mt-6 text-neutral-500">Todavía no hiciste ningún pedido.</p>
      ) : (
        <ul className="mt-6 divide-y divide-neutral-200">
          {orders.map((order) => (
            <li key={order.id} className="flex items-center justify-between py-4">
              <div>
                <Link
                  href={`/pedido/${order.id}/confirmacion`}
                  className="font-medium hover:underline"
                >
                  Pedido #{order.id.slice(0, 8)}
                </Link>
                <p className="text-sm text-neutral-500">
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
