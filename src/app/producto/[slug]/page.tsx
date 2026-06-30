import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatArs } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const transferPrice =
    product.price_ars * (1 - product.transfer_discount_pct / 100);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-12 sm:grid-cols-2">
        <div className="aspect-square w-full bg-paper-dim" />

        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
            {product.brand?.name}
          </p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-2xl font-bold">
              {formatArs(product.price_ars)}
            </span>
            {product.transfer_discount_pct > 0 && (
              <span className="text-[13px] font-medium text-court">
                {formatArs(transferPrice)} por transferencia (
                {product.transfer_discount_pct}% off)
              </span>
            )}
          </div>
          <p className="mt-1 text-[13px] text-ink-soft">
            3 o 12 cuotas sin interés
          </p>

          <p className="mt-7 max-w-prose text-[15px] leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <dl className="mt-7 space-y-2 border-t border-line pt-5 text-[13px]">
            {product.weight_grams && (
              <div className="flex justify-between">
                <dt className="text-ink-soft">Peso</dt>
                <dd className="font-medium">{product.weight_grams} g</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-ink-soft">Disponibilidad</dt>
              <dd
                className={`font-medium ${product.stock === 0 ? "text-danger" : ""}`}
              >
                {product.stock > 0
                  ? `${product.stock} unidades`
                  : "Sin stock"}
              </dd>
            </div>
          </dl>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
