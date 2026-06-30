import { getAllCategories } from "@/lib/products";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ProductFields } from "@/components/admin/ProductFields";
import { createProduct } from "@/app/admin/actions";

export default async function NewProductPage() {
  const categories = await getAllCategories();
  const supabase = createServerSupabaseClient();
  const { data: brands } = await supabase.from("brands").select("id, name, slug");

  return (
    <div>
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form action={createProduct} className="mt-6 max-w-2xl">
        <ProductFields categories={categories} brands={brands ?? []} />
        <button
          type="submit"
          className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
        >
          Crear producto
        </button>
      </form>
    </div>
  );
}
