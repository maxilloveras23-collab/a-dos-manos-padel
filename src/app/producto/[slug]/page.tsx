import { notFound } from "next/navigation";
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
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="aspect-square w-full rounded-lg bg-neutral-100" />

        <div>
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            {product.brand?.name}
          </p>
          <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>

          <p className="mt-4 text-2xl font-semibold">
            {formatArs(product.price_ars)}
          </p>
          {product.transfer_discount_pct > 0 && (
            <p className="mt-1 text-emerald-600">
              {formatArs(transferPrice)} por transferencia (
              {product.transfer_discount_pct}% off)
            </p>
          )}
          <p className="mt-1 text-sm text-neutral-500">
            3 o 12 cuotas sin interés
          </p>

          <p className="mt-6 text-neutral-700">{product.description}</p>

          <dl className="mt-6 space-y-1 text-sm text-neutral-600">
            {product.weight_grams && (
              <div className="flex gap-2">
                <dt className="font-medium">Peso:</dt>
                <dd>{product.weight_grams} g</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-medium">Stock:</dt>
              <dd>
                {product.stock > 0
                  ? `${product.stock} disponibles`
                  : "Sin stock"}
              </dd>
            </div>
          </dl>

          <button
            disabled={product.stock === 0}
            className="mt-8 w-full rounded-full bg-neutral-900 px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
