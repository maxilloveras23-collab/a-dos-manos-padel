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
        className="mt-8 w-full rounded-full bg-neutral-300 px-6 py-3 font-medium text-white"
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
      className="mt-8 w-full rounded-full bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
    >
      {added ? "¡Agregado!" : "Agregar al carrito"}
    </button>
  );
}
