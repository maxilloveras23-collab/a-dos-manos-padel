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
      <nav className="mb-8 flex items-center gap-6 border-b border-line pb-4 text-[13px] font-medium uppercase tracking-wide">
        <Link href="/admin/productos" className="hover:text-court">
          Productos
        </Link>
        <Link href="/admin/pedidos" className="hover:text-court">
          Pedidos
        </Link>
        <Link href="/" className="ml-auto text-ink-soft hover:text-ink">
          Volver al sitio
        </Link>
      </nav>
      {children}
    </div>
  );
}
