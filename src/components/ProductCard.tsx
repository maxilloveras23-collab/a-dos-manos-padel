import Link from "next/link";
import { formatArs } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const transferPrice =
    product.price_ars * (1 - product.transfer_discount_pct / 100);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block rounded-lg border border-neutral-200 p-4 transition hover:border-neutral-400"
    >
      <div className="aspect-square w-full rounded-md bg-neutral-100" />
      <p className="mt-3 text-xs uppercase tracking-wide text-neutral-500">
        {product.brand?.name}
      </p>
      <h3 className="mt-1 font-medium text-neutral-900 group-hover:underline">
        {product.name}
      </h3>
      <p className="mt-2 text-lg font-semibold">
        {formatArs(product.price_ars)}
      </p>
      {product.transfer_discount_pct > 0 && (
        <p className="text-sm text-emerald-600">
          {formatArs(transferPrice)} por transferencia
        </p>
      )}
      {product.stock === 0 && (
        <p className="mt-1 text-sm text-red-600">Sin stock</p>
      )}
    </Link>
  );
}
