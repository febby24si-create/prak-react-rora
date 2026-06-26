-- =============================================
-- TABLE: products
-- Copy paste ke Supabase SQL Editor lalu Run
-- =============================================

-- 1. BUAT TABLE
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null default '',
  price       numeric not null default 0,
  stock       integer not null default 0,
  category    text not null default '',
  image_url   text not null default '',
  status      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. AKTIFKAN RLS
alter table public.products enable row level security;

-- 3. HAPUS POLICY LAMA (kalau sudah ada)
drop policy if exists "Everyone can read active products" on public.products;
drop policy if exists "Admin can read all products" on public.products;
drop policy if exists "Admin can insert products" on public.products;
drop policy if exists "Admin can update products" on public.products;
drop policy if exists "Admin can delete products" on public.products;

-- 4. BUAT POLICY BARU
-- Semua user bisa lihat produk yang aktif
create policy "Everyone can read active products"
  on public.products for select
  using (status = true);

-- Admin bisa lihat semua produk (termasuk nonaktif)
create policy "Admin can read all products"
  on public.products for select
  to authenticated
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Admin bisa insert
create policy "Admin can insert products"
  on public.products for insert
  to authenticated
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Admin bisa update
create policy "Admin can update products"
  on public.products for update
  to authenticated
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Admin bisa delete
create policy "Admin can delete products"
  on public.products for delete
  to authenticated
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- 5. INDEX (biar cepat)
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_name on public.products(name);

-- 6. SAMPLE DATA (testing) -- skip kalo udah ada
-- Hapus dulu data lama biar ga dobel
delete from public.products;

insert into public.products (name, description, price, stock, category, status) values
  ('Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan udang', 35000, 50, 'Food', true),
  ('Mie Ayam Bakso', 'Mie ayam lengkap dengan bakso sapi', 25000, 40, 'Food', true),
  ('Ayam Bakar Madu', 'Ayam bakar dengan olesan madu khas', 45000, 30, 'Food', true),
  ('Es Teh Manis', 'Teh manis segar dengan es batu', 5000, 100, 'Beverage', true),
  ('Kopi Susu', 'Kopi susu gula aren kekinian', 18000, 60, 'Beverage', true),
  ('Jus Alpukat', 'Jus alpukat segar dengan susu coklat', 20000, 25, 'Beverage', true),
  ('Kentang Goreng', 'Kentang goreng crispy dengan saus sambal', 15000, 45, 'Snack', true),
  ('Pisang Goreng Keju', 'Pisang goreng crispy toping keju & meses', 12000, 35, 'Snack', true);
