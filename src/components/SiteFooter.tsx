import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-court-deep text-paper">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-display text-2xl font-black uppercase tracking-tight">
          Dos Manos <span className="text-accent">Pádel</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] uppercase tracking-wide text-paper/60">
          <span>© {new Date().getFullYear()} — Hecho en Argentina</span>
          <div className="flex gap-6">
            <Link href="/contacto" className="transition-colors hover:text-paper">
              Contacto
            </Link>
            <Link
              href="/devoluciones"
              className="transition-colors hover:text-paper"
            >
              Devoluciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
