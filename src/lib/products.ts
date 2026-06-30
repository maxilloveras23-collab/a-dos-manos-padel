import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

const PRODUCT_SELECT = `
  id, name, slug, description, price_ars, transfer_discount_pct,
  weight_grams, stock, is_featured,
  category:categories ( id, name, slug, gender ),
  brand:brands ( id, name, slug )
`;

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, name, slug, description, price_ars, transfer_discount_pct,
      weight_grams, stock, is_featured,
      category:categories!inner ( id, name, slug, gender ),
      brand:brands ( id, name, slug )
    `
    )
    .eq("category.slug", categorySlug)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as unknown as Product | null;
}

export async function getAllCategories() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, gender")
    .order("name");

  if (error) throw error;
  return data ?? [];
}
