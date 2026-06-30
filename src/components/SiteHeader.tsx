import Link from "next/link";
import { CartLink } from "@/components/CartLink";
import { UserMenu } from "@/components/UserMenu";

const NAV_ITEMS = [
  { label: "Palas", href: "/catalogo/palas" },
  { label: "Accesorios", href: "/catalogo/accesorios" },
  { label: "Indumentaria Mujer", href: "/catalogo/indumentaria-mujer" },
  { label: "Indumentaria Hombre", href: "/catalogo/indumentaria-hombre" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold">
          Dos Manos Pádel
        </Link>
        <nav className="flex gap-5 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
          <CartLink />
        </nav>
        <UserMenu />
      </div>
    </header>
  );
}
