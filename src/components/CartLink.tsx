"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link href="/carrito" className="relative hover:underline">
      Carrito
      {totalItems > 0 && (
        <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1.5 text-xs font-medium text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
