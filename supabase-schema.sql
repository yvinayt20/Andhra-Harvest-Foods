-- Run this in the Supabase SQL Editor
-- https://supabase.com/dashboard/project/_/sql

-- ─── product_overrides ─────────────────────────────────────────────────────
-- Stores admin-set price and stock per product variant.
-- product_id + size is the compound key (matches products.ts id + variant.size)
create table if not exists product_overrides (
  id          uuid primary key default gen_random_uuid(),
  product_id  text not null,
  size        text not null,
  price       integer,          -- overridden price in INR; null = use default from products.ts
  stock       integer default 0, -- units in stock; 0 = sold out
  updated_at  timestamptz default now(),
  unique (product_id, size)
);

-- Only admins (service role) can write; anon can read
alter table product_overrides enable row level security;
create policy "Public read" on product_overrides for select using (true);
create policy "Admin write" on product_overrides for all
  using (auth.role() = 'service_role');

-- ─── feedback ──────────────────────────────────────────────────────────────
create table if not exists feedback (
  id          uuid primary key default gen_random_uuid(),
  product_id  text not null,
  user_id     uuid references auth.users(id) on delete cascade,
  user_name   text,
  rating      smallint check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz default now()
);

alter table feedback enable row level security;
-- Anyone can read feedback
create policy "Public read feedback" on feedback for select using (true);
-- Logged-in users can insert their own feedback
create policy "Authenticated insert feedback" on feedback for insert
  with check (auth.uid() = user_id);
-- Users can delete their own feedback
create policy "Owner delete feedback" on feedback for delete
  using (auth.uid() = user_id);
