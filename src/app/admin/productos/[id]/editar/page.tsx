import { notFound } from "next/navigation";
import { getAllCategories } from "@/lib/products";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ProductFields } from "@/components/admin/ProductFields";
import {
  deleteProductImage,
  updateProduct,
  uploadProductImage,
} from "@/app/admin/actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categories = await getAllCategories();
  const supabase = createServerSupabaseClient();

  const [{ data: product }, { data: brands }, { data: images }] =
    await Promise.all([
      supabase.from("products").select("*").eq("id", id).maybeSingle(),
      supabase.from("brands").select("id, name, slug"),
      supabase
        .from("product_images")
        .select("id, storage_path, position")
        .eq("product_id", id)
        .order("position"),
    ]);

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, id);
  const uploadImageWithId = uploadProductImage.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold">Editar producto</h1>

      <form action={updateProductWithId} className="mt-6 max-w-2xl">
        <ProductFields
          categories={categories}
          brands={brands ?? []}
          defaultValues={product}
        />
        <button
          type="submit"
          className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
        >
          Guardar cambios
        </button>
      </form>

      <div className="mt-10 max-w-2xl">
        <h2 className="font-semibold">Imágenes</h2>

        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images?.map((image) => {
            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${image.storage_path}`;
            const deleteImageWithIds = deleteProductImage.bind(
              null,
              id,
              image.id,
              image.storage_path
            );
            return (
              <div key={image.id} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={publicUrl}
                  alt=""
                  className="aspect-square w-full rounded-md object-cover"
                />
                <form action={deleteImageWithIds}>
                  <button
                    type="submit"
                    className="mt-1 w-full text-xs text-neutral-500 hover:text-red-600"
                  >
                    Quitar
                  </button>
                </form>
              </div>
            );
          })}
        </div>

        <form
          action={uploadImageWithId}
          className="mt-4 flex items-center gap-3"
        >
          <input type="file" name="file" accept="image/*" required />
          <button
            type="submit"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm"
          >
            Subir imagen
          </button>
        </form>
      </div>
    </div>
  );
}
