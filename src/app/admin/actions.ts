"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(formData: FormData) {
  await requireAdminUser();
  const supabase = createServiceSupabaseClient();

  const name = String(formData.get("name"));
  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name,
      slug: slugify(name),
      description: String(formData.get("description") ?? ""),
      price_ars: Number(formData.get("price_ars")),
      transfer_discount_pct: Number(formData.get("transfer_discount_pct") ?? 0),
      weight_grams: formData.get("weight_grams")
        ? Number(formData.get("weight_grams"))
        : null,
      stock: Number(formData.get("stock") ?? 0),
      is_featured: formData.get("is_featured") === "on",
      category_id: String(formData.get("category_id")),
      brand_id: formData.get("brand_id") ? String(formData.get("brand_id")) : null,
    })
    .select("id")
    .single();

  if (error || !product) throw new Error(error?.message ?? "Error al crear producto");

  revalidatePath("/admin/productos");
  redirect(`/admin/productos/${product.id}/editar`);
}

export async function updateProduct(productId: string, formData: FormData) {
  await requireAdminUser();
  const supabase = createServiceSupabaseClient();

  const { error } = await supabase
    .from("products")
    .update({
      name: String(formData.get("name")),
      description: String(formData.get("description") ?? ""),
      price_ars: Number(formData.get("price_ars")),
      transfer_discount_pct: Number(formData.get("transfer_discount_pct") ?? 0),
      weight_grams: formData.get("weight_grams")
        ? Number(formData.get("weight_grams"))
        : null,
      stock: Number(formData.get("stock") ?? 0),
      is_featured: formData.get("is_featured") === "on",
      category_id: String(formData.get("category_id")),
      brand_id: formData.get("brand_id") ? String(formData.get("brand_id")) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${productId}/editar`);
}

export async function deleteProduct(productId: string) {
  await requireAdminUser();
  const supabase = createServiceSupabaseClient();

  const { data: images } = await supabase
    .from("product_images")
    .select("storage_path")
    .eq("product_id", productId);

  if (images?.length) {
    await supabase.storage
      .from("product-images")
      .remove(images.map((i) => i.storage_path));
  }

  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/productos");
}

export async function uploadProductImage(productId: string, formData: FormData) {
  await requireAdminUser();
  const supabase = createServiceSupabaseClient();

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No se seleccionó ningún archivo");

  const ext = file.name.split(".").pop();
  const path = `${productId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, { contentType: file.type });

  if (uploadError) throw new Error(uploadError.message);

  const { data: existing } = await supabase
    .from("product_images")
    .select("id")
    .eq("product_id", productId);

  const { error: insertError } = await supabase.from("product_images").insert({
    product_id: productId,
    storage_path: path,
    position: existing?.length ?? 0,
  });

  if (insertError) throw new Error(insertError.message);

  revalidatePath(`/admin/productos/${productId}/editar`);
}

export async function deleteProductImage(productId: string, imageId: string, storagePath: string) {
  await requireAdminUser();
  const supabase = createServiceSupabaseClient();

  await supabase.storage.from("product-images").remove([storagePath]);
  const { error } = await supabase.from("product_images").delete().eq("id", imageId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/productos/${productId}/editar`);
}

export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdminUser();
  const supabase = createServiceSupabaseClient();

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/pedidos");
}
