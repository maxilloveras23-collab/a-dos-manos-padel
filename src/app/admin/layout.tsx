import Link from "next/link";
import { requireAdminUser } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminUser();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <nav className="mb-8 flex gap-5 border-b border-neutral-200 pb-4 text-sm">
        <Link href="/admin/productos" className="font-medium hover:underline">
          Productos
        </Link>
        <Link href="/admin/pedidos" className="font-medium hover:underline">
          Pedidos
        </Link>
        <Link href="/" className="ml-auto text-neutral-500 hover:underline">
          Volver al sitio
        </Link>
      </nav>
      {children}
    </div>
  );
}
