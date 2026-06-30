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
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold">{currentCategory.name}</h1>
      {products.length === 0 ? (
        <p className="mt-6 text-neutral-500">
          Todavía no hay productos en esta categoría.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
