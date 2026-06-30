import type { Brand, Category } from "@/lib/types";

export function ProductFields({
  categories,
  brands,
  defaultValues,
}: {
  categories: Category[];
  brands: Brand[];
  defaultValues?: {
    name?: string;
    description?: string | null;
    price_ars?: number;
    transfer_discount_pct?: number;
    weight_grams?: number | null;
    stock?: number;
    is_featured?: boolean;
    category_id?: string;
    brand_id?: string | null;
  };
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm sm:col-span-2">
        <span className="text-neutral-700">Nombre</span>
        <input
          name="name"
          required
          defaultValue={defaultValues?.name}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm sm:col-span-2">
        <span className="text-neutral-700">Descripción</span>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues?.description ?? ""}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="text-neutral-700">Precio (ARS)</span>
        <input
          name="price_ars"
          type="number"
          min={0}
          step="0.01"
          required
          defaultValue={defaultValues?.price_ars}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="text-neutral-700">Descuento por transferencia (%)</span>
        <input
          name="transfer_discount_pct"
          type="number"
          min={0}
          max={100}
          defaultValue={defaultValues?.transfer_discount_pct ?? 0}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="text-neutral-700">Peso (gramos)</span>
        <input
          name="weight_grams"
          type="number"
          min={0}
          defaultValue={defaultValues?.weight_grams ?? ""}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="text-neutral-700">Stock</span>
        <input
          name="stock"
          type="number"
          min={0}
          required
          defaultValue={defaultValues?.stock ?? 0}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        <span className="text-neutral-700">Categoría</span>
        <select
          name="category_id"
          required
          defaultValue={defaultValues?.category_id}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        >
          <option value="" disabled>
            Elegir...
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-neutral-700">Marca</span>
        <select
          name="brand_id"
          defaultValue={defaultValues?.brand_id ?? ""}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        >
          <option value="">Sin marca</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm sm:col-span-2">
        <input
          name="is_featured"
          type="checkbox"
          defaultChecked={defaultValues?.is_featured}
        />
        <span>Destacado en home</span>
      </label>
    </div>
  );
}
