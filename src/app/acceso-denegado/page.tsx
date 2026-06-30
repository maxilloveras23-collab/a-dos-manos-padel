import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-2xl font-black uppercase tracking-tight">
        No tenés acceso a esta sección
      </h1>
      <p className="mt-2 text-[14px] text-ink-soft">
        Iniciá sesión con una cuenta autorizada para entrar al panel admin.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-ink px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-paper transition-colors hover:bg-court-deep"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
