export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold">Contacto</h1>
      <p className="mt-2 text-neutral-600">
        ¿Tenés dudas sobre un producto o un pedido? Escribinos.
      </p>

      <div className="mt-6 space-y-2 text-sm">
        <p>
          <span className="font-medium">WhatsApp:</span>{" "}
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
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

      <form className="mt-8 space-y-4">
        <label className="block text-sm">
          <span className="text-neutral-700">Nombre</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-neutral-700">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-neutral-700">Mensaje</span>
          <textarea
            name="message"
            rows={4}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
