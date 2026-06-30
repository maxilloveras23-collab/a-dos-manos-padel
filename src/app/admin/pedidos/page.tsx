import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatArs } from "@/lib/format";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default async function AdminOrdersPage() {
  const supabase = createServerSupabaseClient();
  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id, created_at, customer_name, customer_email, total_ars, status, payment_method"
    )
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold">Pedidos</h1>

      <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left text-neutral-500">
            <th className="py-2">Fecha</th>
            <th className="py-2">Cliente</th>
            <th className="py-2">Pago</th>
            <th className="py-2">Total</th>
            <th className="py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id} className="border-b border-neutral-100">
              <td className="py-2 text-neutral-600">
                {new Date(order.created_at).toLocaleDateString("es-AR")}
              </td>
              <td className="py-2">
                <p>{order.customer_name}</p>
                <p className="text-xs text-neutral-500">{order.customer_email}</p>
              </td>
              <td className="py-2 text-neutral-600">{order.payment_method}</td>
              <td className="py-2">{formatArs(order.total_ars)}</td>
              <td className="py-2">
                <OrderStatusSelect orderId={order.id} status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
