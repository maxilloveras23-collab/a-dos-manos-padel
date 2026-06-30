import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-2xl font-bold">No tenés acceso a esta sección</h1>
      <p className="mt-2 text-neutral-600">
        Iniciá sesión con una cuenta autorizada para entrar al panel admin.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
