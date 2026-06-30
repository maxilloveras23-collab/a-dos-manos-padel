import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatArs } from "@/lib/format";
import { deleteProduct } from "@/app/admin/actions";

export default async function AdminProductsPage() {
  const supabase = createServerSupabaseClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, price_ars, stock, is_featured, category:categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          + Nuevo producto
        </Link>
      </div>

      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left text-neutral-500">
            <th className="py-2">Nombre</th>
            <th className="py-2">Categoría</th>
            <th className="py-2">Precio</th>
            <th className="py-2">Stock</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} className="border-b border-neutral-100">
              <td className="py-2">
                <Link
                  href={`/admin/productos/${product.id}/editar`}
                  className="hover:underline"
                >
                  {product.name}
                </Link>
                {product.is_featured && (
                  <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
                    Destacado
                  </span>
                )}
              </td>
              <td className="py-2 text-neutral-600">
                {(product.category as unknown as { name: string } | null)?.name}
              </td>
              <td className="py-2">{formatArs(product.price_ars)}</td>
              <td className="py-2">
                {product.stock === 0 ? (
                  <span className="text-red-600">Sin stock</span>
                ) : (
                  product.stock
                )}
              </td>
              <td className="py-2 text-right">
                <form
                  action={async () => {
                    "use server";
                    await deleteProduct(product.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-neutral-400 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
