@AGENTS.md

# Dos Manos Pádel

E-commerce de artículos de pádel (palas, accesorios, indumentaria). Ver [SCOPE.md](SCOPE.md) para el alcance completo del producto.

## Stack
- Next.js (App Router, TypeScript), Tailwind CSS
- Supabase: Postgres + Auth + Storage (imágenes de producto)
- Mercado Pago Checkout Pro para pagos (ARS, cuotas, transferencia)
- Vercel para hosting/deploy

## Estado
Proyecto recién scaffoldeado. Falta: crear cuentas (Supabase, Mercado Pago, Vercel), modelar la base de datos, y construir catálogo/carrito/checkout/admin según SCOPE.md.

## Convenciones
- Variables de entorno en `.env.local` (ver `.env.local.example` para la lista completa). Nunca commitear `.env.local`.
- Precios en ARS, sin decimales (centavos no aplican en el dominio de este negocio).
