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
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">No hay nada para pagar</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
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
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-semibold">Datos de envío</h2>

          <Field label="Nombre y apellido" name="customerName" required />
          <Field
            label="Email"
            name="customerEmail"
            type="email"
            required
          />
          <Field label="Teléfono" name="customerPhone" />
          <Field
            label="Código postal"
            name="shippingPostalCode"
            required
          />
          <Field label="Dirección" name="shippingAddress" required />

          <div>
            <h2 className="mt-6 font-semibold">Método de pago</h2>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "transferencia"}
                  onChange={() => setPaymentMethod("transferencia")}
                />
                Transferencia bancaria
                <span className="text-emerald-600">(con descuento)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-neutral-400">
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
          <h2 className="font-semibold">Resumen</h2>
          <ul className="mt-2 divide-y divide-neutral-200 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between py-2">
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

          <div className="mt-4 space-y-1 border-t border-neutral-200 pt-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatArs(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>
                {shippingCost === 0 ? "Gratis" : formatArs(shippingCost)}
              </span>
            </div>
            {shippingCost > 0 && (
              <p className="text-xs text-neutral-500">
                Envío gratis a partir de{" "}
                {formatArs(FREE_SHIPPING_THRESHOLD_ARS)}
              </p>
            )}
            <div className="flex justify-between pt-2 text-base font-semibold">
              <span>Total</span>
              <span>{formatArs(total)}</span>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-neutral-900 px-6 py-3 font-medium text-white disabled:opacity-50"
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
    <label className="block text-sm">
      <span className="text-neutral-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
      />
    </label>
  );
}
