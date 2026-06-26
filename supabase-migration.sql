-- =====================================================
-- SUPABASE MIGRATION — rora-apps (PRD v1.0 - FINAL FIXED)
-- Execute all SQL in Supabase SQL Editor
-- =====================================================

-- 0. EXTENSIONS
create extension if not exists "pgcrypto";

-- =====================================================
-- HELPER FUNCTION: Anti-Recursion Role Checker
-- =====================================================
create or replace function public.is_admin()
returns boolean 
language plpgsql 
security definer 
set search_path = public
as $$
begin
  return exists (
    select 1 from public.profiles 
    where id = auth.uid() and role = 'admin'
  );
end;
$$;

-- =====================================================
-- 1. PROFILES (extends auth.users)
-- =====================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  email       text not null default '',
  phone       text not null default '',
  role        text not null default 'member' check (role in ('admin', 'member')),
  point       integer not null default 0,
  tier        text not null default 'Bronze' check (tier in ('Bronze', 'Silver', 'Gold', 'Platinum')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Admin can read all profiles" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Admin can insert profiles" on public.profiles;
drop policy if exists "Members can update own profile" on public.profiles;
drop policy if exists "Admin can update all profiles" on public.profiles;
drop policy if exists "Admin can delete profiles" on public.profiles;

create policy "Admin can read all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin() or id = auth.uid());

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

create policy "Admin can insert profiles"
  on public.profiles for insert
  to authenticated
  with check (public.is_admin());

create policy "Members can update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = 'member'
    and point = point
    and tier = tier
  );

create policy "Admin can update all profiles"
  on public.profiles for update
  to authenticated
  using (public.is_admin());

create policy "Admin can delete profiles"
  on public.profiles for delete
  to authenticated
  using (public.is_admin());

-- Trigger: Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, role, point, tier)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, ''),
    'member',
    0,
    'Bronze'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================
-- 2. CUSTOMERS
-- =====================================================
create table if not exists public.customers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null default '',
  phone       text not null default '',
  address     text not null default '',
  status      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.customers enable row level security;

drop policy if exists "Admin can read all customers" on public.customers;
drop policy if exists "Admin can insert customers" on public.customers;
drop policy if exists "Admin can update customers" on public.customers;
drop policy if exists "Admin can delete customers" on public.customers;

create policy "Admin can read all customers"
  on public.customers for select
  to authenticated
  using (public.is_admin());

create policy "Admin can insert customers"
  on public.customers for insert
  to authenticated
  with check (public.is_admin());

create policy "Admin can update customers"
  on public.customers for update
  to authenticated
  using (public.is_admin());

create policy "Admin can delete customers"
  on public.customers for delete
  to authenticated
  using (public.is_admin());

create index if not exists idx_customers_email on public.customers(email);

-- =====================================================
-- 3. PRODUCTS
-- =====================================================
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

alter table public.products enable row level security;

drop policy if exists "Everyone can read active products" on public.products;
drop policy if exists "Admin can read all products" on public.products;
drop policy if exists "Admin can insert products" on public.products;
drop policy if exists "Admin can update products" on public.products;
drop policy if exists "Admin can delete products" on public.products;

create policy "Everyone can read active products"
  on public.products for select
  using (status = true);

create policy "Admin can read all products"
  on public.products for select
  to authenticated
  using (public.is_admin());

create policy "Admin can insert products"
  on public.products for insert
  to authenticated
  with check (public.is_admin());

create policy "Admin can update products"
  on public.products for update
  to authenticated
  using (public.is_admin());

create policy "Admin can delete products"
  on public.products for delete
  to authenticated
  using (public.is_admin());

create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_name on public.products(name);

-- =====================================================
-- 4. ORDERS
-- =====================================================
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  member_id     uuid not null references public.profiles(id) on delete cascade,
  total         numeric not null default 0,
  status        text not null default 'Pending' check (status in ('Pending', 'Diproses', 'Selesai', 'Dibatalkan')),
  point_earned  integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "Admin can read all orders" on public.orders;
drop policy if exists "Members can read own orders" on public.orders;
drop policy if exists "Members can insert own orders" on public.orders;
drop policy if exists "Admin can insert orders" on public.orders;
drop policy if exists "Admin can update orders" on public.orders;
drop policy if exists "Members can cancel own pending orders" on public.orders;
drop policy if exists "Admin can delete orders" on public.orders;

create policy "Admin can read all orders"
  on public.orders for select
  to authenticated
  using (public.is_admin());

create policy "Members can read own orders"
  on public.orders for select
  to authenticated
  using (member_id = auth.uid());

create policy "Members can insert own orders"
  on public.orders for insert
  to authenticated
  with check (member_id = auth.uid());

create policy "Admin can insert orders"
  on public.orders for insert
  to authenticated
  with check (public.is_admin());

create policy "Admin can update orders"
  on public.orders for update
  to authenticated
  using (public.is_admin());

create policy "Members can cancel own pending orders"
  on public.orders for update
  to authenticated
  using (member_id = auth.uid() and status = 'Pending');

create policy "Admin can delete orders"
  on public.orders for delete
  to authenticated
  using (public.is_admin());

create index if not exists idx_orders_member_id on public.orders(member_id);
create index if not exists idx_orders_status on public.orders(status);

-- =====================================================
-- 5. ORDER ITEMS
-- =====================================================
create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  product_id  uuid not null references public.products(id) on delete cascade,
  qty         integer not null default 1,
  price       numeric not null default 0,
  subtotal    numeric not null default 0
);

alter table public.order_items enable row level security;

drop policy if exists "Admin can read all order_items" on public.order_items;
drop policy if exists "Members can read own order_items" on public.order_items;
drop policy if exists "Members can insert own order_items" on public.order_items;
drop policy if exists "Admin can manage order_items" on public.order_items;
drop policy if exists "Admin can update order_items" on public.order_items;
drop policy if exists "Admin can delete order_items" on public.order_items;

create policy "Admin can read all order_items"
  on public.order_items for select
  to authenticated
  using (public.is_admin());

create policy "Members can read own order_items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.member_id = auth.uid()
    )
  );

create policy "Members can insert own order_items"
  on public.order_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.member_id = auth.uid()
    )
  );

create policy "Admin can manage order_items"
  on public.order_items for insert
  to authenticated
  with check (public.is_admin());

create policy "Admin can update order_items"
  on public.order_items for update
  to authenticated
  using (public.is_admin());

create policy "Admin can delete order_items"
  on public.order_items for delete
  to authenticated
  using (public.is_admin());

-- =====================================================
-- 6. MEMBERSHIP HISTORY
-- =====================================================
create table if not exists public.membership_history (
  id          uuid primary key default gen_random_uuid(),
  member_id   uuid not null references public.profiles(id) on delete cascade,
  order_id    uuid references public.orders(id) on delete set null,
  point       integer not null default 0,
  description text not null default '',
  created_at  timestamptz not null default now()
);

alter table public.membership_history enable row level security;

drop policy if exists "Admin can read all history" on public.membership_history;
drop policy if exists "Members can read own history" on public.membership_history;
drop policy if exists "Admin can insert history" on public.membership_history;
drop policy if exists "Admin can manage history" on public.membership_history;
drop policy if exists "Admin can delete history" on public.membership_history;

create policy "Admin can read all history"
  on public.membership_history for select
  to authenticated
  using (public.is_admin());

create policy "Members can read own history"
  on public.membership_history for select
  to authenticated
  using (member_id = auth.uid());

create policy "Admin can insert history"
  on public.membership_history for insert
  to authenticated
  with check (public.is_admin());

create policy "Admin can manage history"
  on public.membership_history for update
  to authenticated
  using (public.is_admin());

create policy "Admin can delete history"
  on public.membership_history for delete
  to authenticated
  using (public.is_admin());

create index if not exists idx_membership_history_member_id on public.membership_history(member_id);

-- =====================================================
-- 7. NOTES
-- =====================================================
do $$
begin
  if exists (select from pg_tables where schemaname = 'public' and tablename = 'note') then
    if not exists (select from information_schema.columns where table_schema = 'public' and table_name = 'note' and column_name = 'user_id') then
      alter table public.note add column user_id uuid references auth.users(id) on delete cascade default auth.uid();
    end if;
    alter table public.note enable row level security;
  end if;
end;
$$;

drop policy if exists "Users can read own notes" on public.note;
drop policy if exists "Users can insert own notes" on public.note;
drop policy if exists "Users can update own notes" on public.note;
drop policy if exists "Users can delete own notes" on public.note;

create policy "Users can read own notes"
  on public.note for select
  to authenticated
  using (user_id = auth.uid());

create policy "Users can insert own notes"
  on public.note for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Users can update own notes"
  on public.note for update
  to authenticated
  using (user_id = auth.uid());

create policy "Users can delete own notes"
  on public.note for delete
  to authenticated
  using (user_id = auth.uid());

-- =====================================================
-- 8. FUNCTION: Hitung Tier Otomatis
-- =====================================================
create or replace function public.calculate_tier(p_point integer)
returns text
language plpgsql
immutable
as $$
begin
  if p_point >= 1000 then return 'Platinum';
  elsif p_point >= 500 then return 'Gold';
  elsif p_point >= 200 then return 'Silver';
  else return 'Bronze';
  end if;
end;
$$;

-- =====================================================
-- 9. FUNCTION: Tambah Point + Update Tier + History
-- =====================================================
create or replace function public.add_order_points(
  p_order_id uuid,
  p_member_id uuid,
  p_total numeric
)
returns void
language plpgsql
security definer
as $$
declare
  v_point integer;
begin
  v_point := floor(p_total / 10000)::integer;

  update public.profiles
  set point = point + v_point,
      tier = public.calculate_tier(point + v_point),
      updated_at = now()
  where id = p_member_id;

  insert into public.membership_history (member_id, order_id, point, description)
  values (p_member_id, p_order_id, v_point, 'Poin dari pesanan');

  update public.orders
  set point_earned = v_point,
      updated_at = now()
  where id = p_order_id;
end;
$$;
