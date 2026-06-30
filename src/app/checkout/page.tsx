"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatArs } from "@/lib/format";
import {
  calculateShippingCost,
  FREE_SHIPPING_THRESHOLD_ARS,
} from "@/lib/shipping";

export default function CheckoutPage() {
  const { items, totalArs, clear } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<
    "mercadopago" | "transferencia"
  >("transferencia");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((acc, item) => {
    const unitPrice =
      paymentMethod === "transferencia"
        ? item.priceArs * (1 - item.transferDiscountPct / 100)
        : item.priceArs;
    return acc + unitPrice * item.quantity;
  }, 0);
  const shippingCost = calculateShippingCost(subtotal);
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-black uppercase tracking-tight">
          No hay nada para pagar
        </h1>
        <Link
          href="/"
          className="mt-8 inline-block bg-ink px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-paper transition-colors hover:bg-court-deep"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          customerName: formData.get("customerName"),
          customerEmail: formData.get("customerEmail"),
          customerPhone: formData.get("customerPhone"),
          shippingPostalCode: formData.get("shippingPostalCode"),
          shippingAddress: formData.get("shippingAddress"),
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al procesar el pedido");

      clear();
      router.push(`/pedido/${data.orderId}/confirmacion`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-2xl font-black uppercase tracking-tight">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-12 sm:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
            Datos de envío
          </h2>

          <Field label="Nombre y apellido" name="customerName" required />
          <Field label="Email" name="customerEmail" type="email" required />
          <Field label="Teléfono" name="customerPhone" />
          <Field label="Código postal" name="shippingPostalCode" required />
          <Field label="Dirección" name="shippingAddress" required />

          <div>
            <h2 className="mt-8 text-[12px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              Método de pago
            </h2>
            <div className="mt-3 space-y-3">
              <label className="flex items-center gap-2 text-[14px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "transferencia"}
                  onChange={() => setPaymentMethod("transferencia")}
                  className="accent-court"
                />
                Transferencia bancaria
                <span className="text-court">(con descuento)</span>
              </label>
              <label className="flex items-center gap-2 text-[14px] text-ink-soft/60">
                <input
                  type="radio"
                  name="paymentMethod"
                  disabled
                  checked={paymentMethod === "mercadopago"}
                  onChange={() => setPaymentMethod("mercadopago")}
                />
                Mercado Pago (tarjeta / cuotas) — próximamente
              </label>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
            Resumen
          </h2>
          <ul className="mt-3 divide-y divide-line text-[14px]">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between py-2.5">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>
                  {formatArs(
                    (paymentMethod === "transferencia"
                      ? item.priceArs * (1 - item.transferDiscountPct / 100)
                      : item.priceArs) * item.quantity
                  )}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-[14px]">
            <div className="flex justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span>{formatArs(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Envío</span>
              <span>
                {shippingCost === 0 ? "Gratis" : formatArs(shippingCost)}
              </span>
            </div>
            {shippingCost > 0 && (
              <p className="text-[12px] text-ink-soft">
                Envío gratis a partir de{" "}
                {formatArs(FREE_SHIPPING_THRESHOLD_ARS)}
              </p>
            )}
            <div className="flex justify-between border-t border-line pt-3 font-display text-base font-bold">
              <span>Total</span>
              <span>{formatArs(total)}</span>
            </div>
          </div>

          {error && <p className="mt-4 text-[13px] text-danger">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full bg-ink py-4 text-[13px] font-bold uppercase tracking-wide text-paper transition-colors hover:bg-court-deep disabled:opacity-50"
          >
            {submitting ? "Procesando..." : "Confirmar pedido"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[14px]">
      <span className="text-ink-soft">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full border border-line bg-paper px-3 py-2.5 focus:border-court focus:outline-none"
      />
    </label>
  );
}
