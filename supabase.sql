-- Enable UUID generation
create extension if not exists "pgcrypto";

create table if not exists analyses (
  id uuid primary key default gen_random_uuid(),
  video_url text not null,
  analysis_json jsonb not null,
  status text default 'complete',
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '45 days')
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  video_url text,
  consent boolean default false,
  is_personal_domain boolean default false,
  unlocked_at timestamptz default now()
);

create index if not exists analyses_video_url_idx on analyses (video_url);
create index if not exists leads_email_idx on leads (email);
