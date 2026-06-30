import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getAllCategories, getProductsByCategory } from "@/lib/products";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = await getAllCategories();
  const currentCategory = categories.find((c) => c.slug === category);

  if (!currentCategory) notFound();

  const products = await getProductsByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-baseline justify-between border-b border-line pb-5">
        <h1 className="font-display text-3xl font-black uppercase tracking-tight">
          {currentCategory.name}
        </h1>
        <span className="text-[13px] uppercase tracking-wide text-ink-soft">
          {products.length} productos
        </span>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-ink-soft">
          Todavía no hay productos en esta categoría.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
