-- Bucket público para imágenes de producto (lectura pública, escritura solo
-- vía service_role desde el panel admin)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "lectura pública de imágenes de producto"
on storage.objects for select
using (bucket_id = 'product-images');
