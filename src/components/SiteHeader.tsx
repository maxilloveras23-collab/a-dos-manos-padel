import Link from "next/link";
import { CartLink } from "@/components/CartLink";
import { UserMenu } from "@/components/UserMenu";
import { MobileNav } from "@/components/MobileNav";

const NAV_ITEMS = [
  { label: "Palas", href: "/catalogo/palas" },
  { label: "Accesorios", href: "/catalogo/accesorios" },
  { label: "Mujer", href: "/catalogo/indumentaria-mujer" },
  { label: "Hombre", href: "/catalogo/indumentaria-hombre" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:gap-6 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link
            href="/"
            className="font-display text-lg font-black uppercase tracking-tight sm:text-xl"
          >
            Dos Manos<span className="text-court"> Pádel</span>
          </Link>
        </div>

        <nav className="hidden gap-7 text-[13px] font-medium uppercase tracking-wide sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-court transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-wide sm:gap-5 sm:text-[13px]">
          <UserMenu />
          <CartLink />
        </div>
      </div>
    </header>
  );
}
