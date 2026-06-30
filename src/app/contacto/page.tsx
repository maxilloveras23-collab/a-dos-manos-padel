export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-2xl font-black uppercase tracking-tight">
        Contacto
      </h1>
      <p className="mt-2 text-[14px] text-ink-soft">
        ¿Tenés dudas sobre un producto o un pedido? Escribinos.
      </p>

      <div className="mt-6 space-y-1.5 border-y border-line py-5 text-[14px]">
        <p>
          <span className="font-medium">WhatsApp:</span>{" "}
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-court hover:underline"
          >
            +54 9 11 0000-0000
          </a>
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a
            href="mailto:hola@dosmanospadel.com.ar"
            className="hover:underline"
          >
            hola@dosmanospadel.com.ar
          </a>
        </p>
      </div>

      <form className="mt-8 space-y-5">
        <label className="block text-[14px]">
          <span className="text-ink-soft">Nombre</span>
          <input
            name="name"
            required
            className="mt-1 w-full border border-line bg-paper px-3 py-2.5 focus:border-court focus:outline-none"
          />
        </label>
        <label className="block text-[14px]">
          <span className="text-ink-soft">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full border border-line bg-paper px-3 py-2.5 focus:border-court focus:outline-none"
          />
        </label>
        <label className="block text-[14px]">
          <span className="text-ink-soft">Mensaje</span>
          <textarea
            name="message"
            rows={4}
            required
            className="mt-1 w-full border border-line bg-paper px-3 py-2.5 focus:border-court focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="bg-ink px-7 py-3 text-[13px] font-bold uppercase tracking-wide text-paper transition-colors hover:bg-court-deep"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
