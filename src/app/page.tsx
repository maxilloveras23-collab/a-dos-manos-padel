import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      <section className="border-b border-line bg-court-deep text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:grid-cols-12 sm:py-28">
          <div className="sm:col-span-8">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-accent">
              Temporada 2026
            </p>
            <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
              Jugá con
              <br />
              dos manos.
            </h1>
            <p className="mt-6 max-w-md text-paper/70">
              Palas, indumentaria y accesorios de las marcas top del pádel.
              Envío gratis desde $300.000.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/catalogo/palas"
                className="bg-accent px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-ink transition-opacity hover:opacity-90"
              >
                Ver palas
              </Link>
              <Link
                href="/catalogo/accesorios"
                className="border border-paper/30 px-7 py-3 text-[13px] font-bold uppercase tracking-wide transition-colors hover:border-paper"
              >
                Accesorios
              </Link>
            </div>
          </div>
          <div className="hidden sm:col-span-4 sm:flex sm:items-end">
            <div className="aspect-[3/4] w-full bg-gradient-to-br from-court to-court-deep" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Destacados
          </h2>
          <span className="text-[13px] uppercase tracking-wide text-ink-soft">
            {featured.length} productos
          </span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
