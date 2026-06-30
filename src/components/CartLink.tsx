"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/carrito"
      className="flex items-center gap-1.5 text-ink-soft transition-colors hover:text-ink"
    >
      Carrito
      {totalItems > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-sm bg-accent px-1 text-[11px] font-bold text-ink">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
