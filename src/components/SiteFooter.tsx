import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-neutral-500">
        <span>© {new Date().getFullYear()} Dos Manos Pádel</span>
        <div className="flex gap-4">
          <Link href="/contacto" className="hover:underline">
            Contacto
          </Link>
          <Link href="/devoluciones" className="hover:underline">
            Devoluciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
