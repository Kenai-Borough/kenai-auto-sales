create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null check (role in ('buyer','seller','dealer','admin')),
  phone text,
  city text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists dealer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  business_name text not null,
  address text,
  phone text,
  website text,
  license_number text,
  inventory_count integer default 0,
  featured_until timestamptz,
  rating numeric(2,1) default 5.0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references profiles(id) on delete cascade,
  vin text,
  year integer not null,
  make text not null,
  model text not null,
  trim text,
  body_type text not null,
  mileage integer default 0,
  price numeric(12,2) not null,
  condition text not null,
  fuel_type text not null,
  transmission text,
  drivetrain text,
  engine text,
  color text,
  features text[] default '{}',
  modifications text[] default '{}',
  description text,
  photos text[] default '{}',
  title_status text,
  accident_history text,
  owner_count integer default 0,
  winter_package boolean default false,
  studded_tires boolean default false,
  rust_rating text,
  status text default 'draft' check (status in ('draft','active','pending','sold','archived')),
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists saved_vehicles (
  user_id uuid not null references profiles(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, vehicle_id)
);

create table if not exists saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text,
  criteria jsonb not null,
  alert_enabled boolean default true,
  created_at timestamptz default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  buyer_id uuid references profiles(id) on delete set null,
  seller_id uuid references profiles(id) on delete set null,
  name text,
  contact text,
  message text not null,
  status text default 'new' check (status in ('new','responded','archived')),
  created_at timestamptz default now()
);

create table if not exists vehicle_views (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  viewer_id uuid references profiles(id) on delete set null,
  viewed_at timestamptz default now(),
  referrer text
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references profiles(id) on delete cascade,
  buyer_id uuid references profiles(id) on delete set null,
  vehicle_id uuid references vehicles(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

create index if not exists idx_vehicles_status_created on vehicles(status, created_at desc);
create index if not exists idx_vehicles_make_model on vehicles(make, model);
create index if not exists idx_vehicles_price on vehicles(price);
create index if not exists idx_vehicles_mileage on vehicles(mileage);
create index if not exists idx_vehicles_features on vehicles using gin(features);
create index if not exists idx_vehicles_photos on vehicles using gin(photos);
create index if not exists idx_saved_searches_user on saved_searches(user_id);
create index if not exists idx_inquiries_vehicle on inquiries(vehicle_id, created_at desc);
create index if not exists idx_vehicle_views_vehicle on vehicle_views(vehicle_id, viewed_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''), coalesce(new.raw_user_meta_data->>'role', 'buyer'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at before update on profiles for each row execute function public.set_updated_at();

drop trigger if exists dealer_profiles_updated_at on dealer_profiles;
create trigger dealer_profiles_updated_at before update on dealer_profiles for each row execute function public.set_updated_at();

drop trigger if exists vehicles_updated_at on vehicles;
create trigger vehicles_updated_at before update on vehicles for each row execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table profiles enable row level security;
alter table dealer_profiles enable row level security;
alter table vehicles enable row level security;
alter table saved_vehicles enable row level security;
alter table saved_searches enable row level security;
alter table inquiries enable row level security;
alter table vehicle_views enable row level security;
alter table reviews enable row level security;

create policy "profiles are viewable by everyone" on profiles for select using (true);
create policy "users manage own profile" on profiles for update using (auth.uid() = id);
create policy "dealers view own profile" on dealer_profiles for select using (true);
create policy "dealers manage own profile" on dealer_profiles for all using (auth.uid() = user_id);
create policy "active vehicles are public" on vehicles for select using (status in ('active','sold'));
create policy "sellers manage own vehicles" on vehicles for all using (auth.uid() = seller_id);
create policy "users manage saved vehicles" on saved_vehicles for all using (auth.uid() = user_id);
create policy "users manage saved searches" on saved_searches for all using (auth.uid() = user_id);
create policy "buyers and sellers read inquiries" on inquiries for select using (auth.uid() = buyer_id or auth.uid() = seller_id);
create policy "buyers can create inquiries" on inquiries for insert with check (auth.uid() = buyer_id);
create policy "vehicle views are insertable" on vehicle_views for insert with check (true);
create policy "reviews are public" on reviews for select using (true);
create policy "buyers create reviews" on reviews for insert with check (auth.uid() = buyer_id);
