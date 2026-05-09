-- Concert tickets / seat assignment workflow.
-- Apply against the ANALYTICS Supabase project (ANALYTICS_SUPABASE_URL).

create schema if not exists concert_tickets;

create table if not exists concert_tickets.ticket_orders (
  id                    uuid primary key default gen_random_uuid(),
  shopify_order_id      text not null unique,
  shopify_order_name    text,
  customer_first_name   text,
  customer_last_name    text,
  customer_email        text not null,
  customer_locale       text,
  ticket_quantity       int not null,
  ticket_type           text,
  variant_id            text,
  order_status          text not null
    check (order_status in ('pending','paid','cancelled','refunded')),
  seat_status           text not null default 'pending'
    check (seat_status in ('pending','assigned','emailed','error','cancelled')),
  assigned_seats        text,
  organizer_notes       text,
  assigned_by           text,
  assigned_at           timestamptz,
  emailed_at            timestamptz,
  email_error           text,
  email_dry_run         boolean not null default false,
  shopify_payload       jsonb,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists ticket_orders_seat_status_idx
  on concert_tickets.ticket_orders (seat_status, created_at desc);

create index if not exists ticket_orders_shopify_order_id_idx
  on concert_tickets.ticket_orders (shopify_order_id);

create table if not exists concert_tickets.ticket_order_events (
  id                uuid primary key default gen_random_uuid(),
  ticket_order_id   uuid not null references concert_tickets.ticket_orders(id) on delete cascade,
  event_type        text not null,
  actor             text,
  payload           jsonb,
  created_at        timestamptz not null default now()
);

create index if not exists ticket_order_events_ticket_order_id_idx
  on concert_tickets.ticket_order_events (ticket_order_id, created_at desc);

-- Required for the service-role REST client to actually access this schema.
-- Custom schemas in Supabase do not auto-grant; without these, PostgREST
-- returns 403 "permission denied for schema concert_tickets".
grant usage on schema concert_tickets to service_role, anon, authenticated;
grant all on all tables in schema concert_tickets to service_role;
grant all on all sequences in schema concert_tickets to service_role;
alter default privileges in schema concert_tickets
  grant all on tables to service_role;
alter default privileges in schema concert_tickets
  grant all on sequences to service_role;

create or replace function concert_tickets.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists ticket_orders_touch_updated_at on concert_tickets.ticket_orders;
create trigger ticket_orders_touch_updated_at
  before update on concert_tickets.ticket_orders
  for each row execute function concert_tickets.touch_updated_at();

-- Expose schema to PostgREST so the service-role client can query it.
-- Run this manually via Supabase Dashboard → API Settings → "Exposed schemas":
--   add: concert_tickets
-- (The grants above handle permissions; this exposes the schema to the REST API.)
