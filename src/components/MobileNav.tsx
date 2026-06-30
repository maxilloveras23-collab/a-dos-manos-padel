"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Palas", href: "/catalogo/palas" },
  { label: "Accesorios", href: "/catalogo/accesorios" },
  { label: "Indumentaria Mujer", href: "/catalogo/indumentaria-mujer" },
  { label: "Indumentaria Hombre", href: "/catalogo/indumentaria-hombre" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {mounted &&
        open &&
        createPortal(
          <nav className="fixed inset-0 z-50 overflow-y-auto bg-paper px-6 pb-8 pt-6">
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
            >
              <span className="h-px w-5 translate-y-[3.5px] rotate-45 bg-ink" />
              <span className="h-px w-5 -translate-y-[3.5px] -rotate-45 bg-ink" />
            </button>
            <ul className="mt-8 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block border-b border-line py-4 font-display text-2xl font-black uppercase tracking-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>,
          document.body
        )}
    </div>
  );
}
