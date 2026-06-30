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
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-court">
        Pedido confirmado
      </p>
      <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight">
        Gracias, {order.customer_name.split(" ")[0]}
      </h1>
      <p className="mt-2 text-[14px] text-ink-soft">
        Pedido #{order.id.slice(0, 8)} — te enviamos la confirmación a{" "}
        {order.customer_email}
      </p>

      <ul className="mt-10 divide-y divide-line border-y border-line text-left text-[14px]">
        {order.order_items?.map((item, i) => (
          <li key={i} className="flex justify-between py-3">
            <span>
              {item.product_name} x{item.quantity}
            </span>
            <span>{formatArs(item.unit_price_ars * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between font-display text-lg font-bold">
        <span>Total</span>
        <span>{formatArs(order.total_ars)}</span>
      </div>

      {order.payment_method === "transferencia" && (
        <p className="mt-8 border border-line bg-paper-dim p-4 text-[13px] text-ink-soft">
          Te vamos a contactar por WhatsApp o email con los datos para
          transferir.
        </p>
      )}

      <Link
        href="/"
        className="mt-10 inline-block bg-ink px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-paper transition-colors hover:bg-court-deep"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
