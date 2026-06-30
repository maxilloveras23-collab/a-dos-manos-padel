export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-2xl font-black uppercase tracking-tight">
        Política de devoluciones
      </h1>

      <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-ink-soft">
        <p>
          Tenés 10 días corridos desde que recibís tu pedido para solicitar un
          cambio o devolución, siempre que el producto esté sin uso, con
          etiquetas y en su empaque original.
        </p>
        <p>
          Para iniciar una devolución, escribinos por WhatsApp o email (ver{" "}
          <a href="/contacto" className="text-court underline">
            Contacto
          </a>
          ) indicando el número de pedido y el motivo.
        </p>
        <p>
          Los costos de envío de la devolución corren por cuenta del
          comprador, salvo que el producto haya llegado con un defecto de
          fábrica o un error nuestro en el envío.
        </p>
        <p>
          Una vez recibido y verificado el producto, procesamos el reembolso
          o cambio dentro de los 5 días hábiles.
        </p>
      </div>
    </div>
  );
}
