import Link from "next/link";
import { formatArs } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const transferPrice =
    product.price_ars * (1 - product.transfer_discount_pct / 100);

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="aspect-square w-full overflow-hidden bg-paper-dim">
        <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
        {product.brand?.name ?? "—"}
      </p>
      <h3 className="mt-1 text-[15px] leading-snug font-medium text-ink">
        {product.name}
      </h3>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-base font-bold">
          {formatArs(product.price_ars)}
        </span>
        {product.transfer_discount_pct > 0 && (
          <span className="text-[12px] text-court">
            {formatArs(transferPrice)} transf.
          </span>
        )}
      </div>

      {product.stock === 0 && (
        <p className="mt-1 text-[12px] font-medium uppercase tracking-wide text-danger">
          Sin stock
        </p>
      )}
    </Link>
  );
}
