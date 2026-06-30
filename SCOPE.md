# Dos Manos Pádel — Alcance del MVP

Referencia: https://padelcanning.com.ar/ (mismo modelo de negocio, e-commerce de pádel)

## Páginas

- **Home**: destacados, banner, accesos a categorías
- **Catálogo** por categoría: Palas / Accesorios / Indumentaria (con subfiltro género en indumentaria)
- **Listado de producto**: grilla con filtro por marca, precio, búsqueda
- **Detalle de producto**: nombre, precio, descripción, peso, imágenes, stock, opciones de cuotas
- **Carrito**
- **Checkout**: datos de envío (código postal → costo de envío), método de pago
- **Login / Registro** de usuario (ver pedidos, datos guardados)
- **Contacto**: formulario + WhatsApp
- **Política de devoluciones** (página estática)
- **Panel admin** (básico): alta/edición de productos, stock, ver pedidos

## Catálogo / Datos de producto

- Categorías: Palas, Accesorios, Indumentaria (Mujer/Hombre)
- Marcas (filtro): Adidas, Bullpadel, Nox, Siux, Wilson, Head (configurable, no hardcodeado)
- Campos por producto: nombre, descripción, precio (ARS), peso, marca, categoría, stock, imágenes (múltiples), destacado (sí/no)

## Flujo de compra

1. Usuario navega catálogo → filtra por categoría/marca
2. Ve detalle de producto → agrega al carrito
3. Carrito → checkout
4. Checkout: ingresa código postal (cálculo de envío), datos de contacto/envío
5. Pago: Mercado Pago Checkout Pro (tarjeta, transferencia, cuotas)
6. Confirmación de pedido (email + pantalla de éxito)

## Reglas de negocio simples

- Envío gratis si el total supera un umbral configurable (ej. $300.000 ARS)
- Descuento por transferencia (% configurable) vs. precio con tarjeta
- Cuotas sin interés (3 y 12, vía Mercado Pago)

## Admin (mínimo viable)

- Login protegido (solo dueño/admin)
- CRUD de productos (incluye stock e imágenes)
- Ver listado de pedidos con estado

## Fuera de alcance (v1)

- Multi-vendor
- App mobile nativa
- Integraciones con ERP/ARCA/AFIP
- Programas de fidelización/cupones avanzados

## Stack técnico

- Next.js (App Router, TypeScript) — frontend + backend en un solo repo
- Supabase (Postgres + Auth + Storage de imágenes)
- Mercado Pago (Checkout Pro) — pagos en ARS, cuotas
- Vercel — hosting/deploy
