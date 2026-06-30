import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-xl bg-neutral-900 px-8 py-16 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Dos Manos Pádel</h1>
        <p className="mt-3 max-w-md text-neutral-300">
          Palas, accesorios e indumentaria de las mejores marcas. Envíos a
          todo el país.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/catalogo/palas"
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-900"
          >
            Ver palas
          </Link>
          <Link
            href="/catalogo/accesorios"
            className="rounded-full border border-white px-5 py-2 text-sm font-medium"
          >
            Ver accesorios
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Destacados</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
