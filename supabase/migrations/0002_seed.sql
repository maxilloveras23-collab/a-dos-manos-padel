-- Datos de prueba para desarrollo del catálogo

insert into categories (name, slug, gender) values
  ('Palas', 'palas', null),
  ('Accesorios', 'accesorios', null),
  ('Indumentaria Mujer', 'indumentaria-mujer', 'mujer'),
  ('Indumentaria Hombre', 'indumentaria-hombre', 'hombre');

insert into brands (name, slug) values
  ('Adidas', 'adidas'),
  ('Bullpadel', 'bullpadel'),
  ('Nox', 'nox'),
  ('Siux', 'siux'),
  ('Wilson', 'wilson'),
  ('Head', 'head');

insert into products (name, slug, description, price_ars, transfer_discount_pct, weight_grams, stock, is_featured, category_id, brand_id)
select
  p.name, p.slug, p.description, p.price_ars, p.transfer_discount_pct, p.weight_grams, p.stock, p.is_featured,
  (select id from categories where slug = p.category_slug),
  (select id from brands where slug = p.brand_slug)
from (values
  ('Pala Bullpadel Vertex 04', 'pala-bullpadel-vertex-04', 'Pala de gama alta, forma diamante, control y potencia para jugadores avanzados.', 450000::numeric, 10::numeric, 365, 8, true, 'palas', 'bullpadel'),
  ('Pala Nox AT10 Genius', 'pala-nox-at10-genius', 'Pala redonda de gran control, ideal para jugadores de nivel intermedio-avanzado.', 380000, 10, 360, 5, true, 'palas', 'nox'),
  ('Pala Siux Electra', 'pala-siux-electra', 'Pala híbrida balance medio, polivalente para todo tipo de juego.', 290000, 8, 355, 12, false, 'palas', 'siux'),
  ('Pala Wilson Bela Pro V2', 'pala-wilson-bela-pro-v2', 'Pala femenina de control, balance bajo, fácil manejo.', 250000, 8, 350, 10, false, 'palas', 'wilson'),
  ('Paletero Head Tour Team', 'paletero-head-tour-team', 'Paletero para 2 palas con bolsillo térmico y compartimento para accesorios.', 85000, 5, 800, 15, true, 'accesorios', 'head'),
  ('Tubo de pelotas Head Padel Pro S', 'pelotas-head-padel-pro-s', 'Tubo x3 pelotas de pádel de competición.', 18000, 0, 150, 50, false, 'accesorios', 'head'),
  ('Overgrip Siux x3', 'overgrip-siux-x3', 'Pack de 3 overgrips antideslizantes para pala.', 9000, 0, 30, 60, false, 'accesorios', 'siux'),
  ('Remera Adidas Padel Tee', 'remera-adidas-padel-tee', 'Remera técnica transpirable para hombre, línea pádel.', 45000, 5, 180, 20, false, 'indumentaria-hombre', 'adidas'),
  ('Vestido Bullpadel Match', 'vestido-bullpadel-match', 'Vestido deportivo de competición para mujer, tela técnica.', 65000, 5, 200, 14, true, 'indumentaria-mujer', 'bullpadel'),
  ('Short Nox Pro', 'short-nox-pro', 'Short deportivo de hombre con bolsillo para pelotas.', 38000, 0, 160, 18, false, 'indumentaria-hombre', 'nox')
) as p(name, slug, description, price_ars, transfer_discount_pct, weight_grams, stock, is_featured, category_slug, brand_slug);
