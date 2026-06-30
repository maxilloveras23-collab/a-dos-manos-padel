"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatArs } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, setQuantity, totalArs } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-black uppercase tracking-tight">
          Tu carrito está vacío
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

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-2xl font-black uppercase tracking-tight">
        Tu carrito
      </h1>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-wrap items-center gap-x-4 gap-y-3 py-5 sm:flex-nowrap"
          >
            <div className="h-20 w-20 flex-shrink-0 bg-paper-dim" />

            <div className="min-w-[140px] flex-1">
              <Link
                href={`/producto/${item.slug}`}
                className="font-medium hover:text-court"
              >
                {item.name}
              </Link>
              <p className="mt-0.5 text-[13px] text-ink-soft">
                {formatArs(item.priceArs)} c/u
              </p>
            </div>

            <div className="ml-[96px] flex flex-1 items-center justify-between gap-4 sm:ml-0 sm:flex-none sm:justify-start">
              <select
                value={item.quantity}
                onChange={(e) =>
                  setQuantity(item.productId, Number(e.target.value))
                }
                className="border border-line bg-paper px-2 py-1.5 text-[13px]"
              >
                {Array.from({ length: item.stock }, (_, i) => i + 1).map(
                  (qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  )
                )}
              </select>

              <p className="text-right font-medium sm:w-24">
                {formatArs(item.priceArs * item.quantity)}
              </p>

              <button
                onClick={() => removeItem(item.productId)}
                className="text-[13px] text-ink-soft hover:text-danger"
                aria-label={`Quitar ${item.name}`}
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between pt-2">
        <span className="font-display text-lg font-bold uppercase tracking-tight">
          Total
        </span>
        <span className="font-display text-lg font-bold">
          {formatArs(totalArs)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-8 block w-full bg-ink py-4 text-center text-[13px] font-bold uppercase tracking-wide text-paper transition-colors hover:bg-court-deep"
      >
        Continuar al pago
      </Link>
    </div>
  );
}
