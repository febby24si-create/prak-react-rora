-- =============================================
-- SEED USERS: Admin & Member
-- Copy paste ke Supabase SQL Editor lalu Run
-- =============================================

-- 1. Buat admin user via Supabase Auth
select supabase.auth.admin_create_user(
  '{
    "email": "admin@sedap.com",
    "password": "admin123",
    "email_confirm": true,
    "user_metadata": {"full_name": "Admin Sedap"}
  }'::jsonb
);

-- 2. Buat member user
select supabase.auth.admin_create_user(
  '{
    "email": "member@sedap.com",
    "password": "member123",
    "email_confirm": true,
    "user_metadata": {"full_name": "Member Biasa"}
  }'::jsonb
);

-- 3. Ubah role admin (trigger default = member)
update public.profiles
set role = 'admin'
where email = 'admin@sedap.com';
