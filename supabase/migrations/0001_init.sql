-- Dos Manos Pádel — schema inicial
-- Categorías: Palas, Accesorios, Indumentaria (con género opcional para indumentaria)

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  gender text check (gender in ('mujer', 'hombre', null)),
  created_at timestamptz not null default now()
);

create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_ars numeric(12, 2) not null check (price_ars >= 0),
  transfer_discount_pct numeric(5, 2) not null default 0 check (transfer_discount_pct between 0 and 100),
  weight_grams integer,
  stock integer not null default 0 check (stock >= 0),
  is_featured boolean not null default false,
  category_id uuid not null references categories(id),
  brand_id uuid references brands(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_category_idx on products(category_id);
create index products_brand_idx on products(brand_id);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  storage_path text not null,
  position integer not null default 0
);

create index product_images_product_idx on product_images(product_id);

-- Pedidos: el comprador puede o no tener cuenta (checkout como invitado)
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_postal_code text not null,
  shipping_address text not null,
  shipping_cost_ars numeric(12, 2) not null default 0,
  total_ars numeric(12, 2) not null,
  payment_method text check (payment_method in ('mercadopago', 'transferencia')),
  mercadopago_payment_id text,
  created_at timestamptz not null default now()
);

create index orders_user_idx on orders(user_id);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  product_name text not null, -- snapshot del nombre al momento de compra
  unit_price_ars numeric(12, 2) not null,
  quantity integer not null check (quantity > 0)
);

create index order_items_order_idx on order_items(order_id);

-- Row Level Security
alter table categories enable row level security;
alter table brands enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Catálogo: lectura pública, escritura solo vía service_role (panel admin server-side)
create policy "catálogo público de lectura" on categories for select using (true);
create policy "catálogo público de lectura" on brands for select using (true);
create policy "catálogo público de lectura" on products for select using (true);
create policy "catálogo público de lectura" on product_images for select using (true);

-- Pedidos: cada usuario ve solo los suyos; creación vía server-side (service_role) en checkout
create policy "usuario ve sus propios pedidos" on orders for select using (auth.uid() = user_id);
create policy "usuario ve items de sus propios pedidos" on order_items for select using (
  exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
