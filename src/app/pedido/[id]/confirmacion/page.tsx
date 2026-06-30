import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { formatArs } from "@/lib/format";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Checkout es sin cuenta: el UUID del pedido (no adivinable) funciona
  // como token de acceso, por eso esta página usa el cliente service_role.
  const supabase = createServiceSupabaseClient();

  const { data: order } = await supabase
    .from("orders")
    .select(
      "id, customer_name, customer_email, total_ars, shipping_cost_ars, payment_method, status, order_items ( product_name, unit_price_ars, quantity )"
    )
    .eq("id", id)
    .maybeSingle();

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-2xl font-bold">¡Gracias por tu compra, {order.customer_name}!</h1>
      <p className="mt-2 text-neutral-600">
        Pedido #{order.id.slice(0, 8)} — te enviamos la confirmación a{" "}
        {order.customer_email}
      </p>

      <ul className="mt-8 divide-y divide-neutral-200 text-left text-sm">
        {order.order_items?.map((item, i) => (
          <li key={i} className="flex justify-between py-2">
            <span>
              {item.product_name} x{item.quantity}
            </span>
            <span>{formatArs(item.unit_price_ars * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-base font-semibold">
        <span>Total</span>
        <span>{formatArs(order.total_ars)}</span>
      </div>

      {order.payment_method === "transferencia" && (
        <p className="mt-6 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-700">
          Te vamos a contactar por WhatsApp o email con los datos para
          transferir.
        </p>
      )}

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
