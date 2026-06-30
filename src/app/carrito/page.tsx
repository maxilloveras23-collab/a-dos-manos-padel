"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatArs } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, setQuantity, totalArs } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Tu carrito</h1>

      <ul className="mt-6 divide-y divide-neutral-200">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-4 py-4">
            <div className="h-20 w-20 flex-shrink-0 rounded-md bg-neutral-100" />

            <div className="flex-1">
              <Link
                href={`/producto/${item.slug}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-neutral-500">
                {formatArs(item.priceArs)} c/u
              </p>
            </div>

            <select
              value={item.quantity}
              onChange={(e) =>
                setQuantity(item.productId, Number(e.target.value))
              }
              className="rounded border border-neutral-300 px-2 py-1 text-sm"
            >
              {Array.from({ length: item.stock }, (_, i) => i + 1).map(
                (qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                )
              )}
            </select>

            <p className="w-24 text-right font-medium">
              {formatArs(item.priceArs * item.quantity)}
            </p>

            <button
              onClick={() => removeItem(item.productId)}
              className="text-sm text-neutral-400 hover:text-red-600"
              aria-label={`Quitar ${item.name}`}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-6">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold">{formatArs(totalArs)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-full bg-neutral-900 px-6 py-3 text-center font-medium text-white hover:bg-neutral-800"
      >
        Continuar al pago
      </Link>
    </div>
  );
}
