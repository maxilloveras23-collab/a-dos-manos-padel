"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (product.stock === 0) {
    return (
      <button
        disabled
        className="mt-8 w-full cursor-not-allowed bg-paper-dim py-4 text-[13px] font-bold uppercase tracking-wide text-ink-soft"
      >
        Sin stock
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        addItem({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          priceArs: product.price_ars,
          transferDiscountPct: product.transfer_discount_pct,
          stock: product.stock,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`mt-8 w-full py-4 text-[13px] font-bold uppercase tracking-wide transition-colors ${
        added
          ? "bg-court text-paper"
          : "bg-ink text-paper hover:bg-court-deep"
      }`}
    >
      {added ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
