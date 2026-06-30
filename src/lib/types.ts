export type Category = {
  id: string;
  name: string;
  slug: string;
  gender: "mujer" | "hombre" | null;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_ars: number;
  transfer_discount_pct: number;
  weight_grams: number | null;
  stock: number;
  is_featured: boolean;
  category: Category | null;
  brand: Brand | null;
};
