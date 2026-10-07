-- Product catalog for the AANI site, seeded from src/lib/collectionData.js.
create table public.product_lines (
  id text primary key,
  category text not null,
  name text not null,
  subtitle text,
  material text,
  description text,
  price numeric not null,
  hero_image text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.colorways (
  line_id text not null references public.product_lines(id) on delete cascade,
  id text not null,
  label text not null,
  swatch text,
  front text,
  back text,
  sort_order int not null default 0,
  in_stock boolean not null default true,
  primary key (line_id, id)
);

alter table public.product_lines enable row level security;
alter table public.colorways enable row level security;

-- Anyone can read the catalog; only the dashboard / service role can write.
create policy "Public read product_lines" on public.product_lines for select to anon, authenticated using (is_active);
create policy "Public read colorways" on public.colorways for select to anon, authenticated using (true);

insert into public.product_lines (id, category, name, subtitle, material, description, price, hero_image, sort_order) values ('intrecciato', 'woven', 'The Trellara Portfolio Clutch', 'Woven Leather', 'Hand-woven calfskin, trellara technique', 'Constructed entirely by hand using the signature trellara weaving technique, each portfolio clutch requires between 48 and 72 hours of meticulous work by a single artisan. The supple calfskin strips are woven by hand, creating a structure that is simultaneously architectural and yielding.', 1850, 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/9669d9ec3_hf_20260720_014021_1a9f0fca-a27d-4c9e-8045-df8ce839e3dd.png', 0);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('intrecciato', 'noir', 'Noir', '#1a1a1a', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/c3d34a9e1_hf_20260720_014135_474718a0-7b16-4221-9576-0dcb60147ac1.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/bf2da8e8b_hf_20260720_014810_ff36c759-e8bd-40e9-810a-389cbbcbe6f5.png', 0);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('intrecciato', 'espresso', 'Espresso', '#3b2314', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/3898cbe34_hf_20260720_014057_260dfcb9-b5f1-43b8-a528-596bf26d990d.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/229662a3c_hf_20260720_014612_5cd8d379-69a3-460a-87e9-ee75322b57db.png', 1);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('intrecciato', 'cognac', 'Cognac', '#b5763a', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/21859d7af_hf_20260720_011921_d6dff703-ea63-4ee7-a80b-706a308a66db.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/43d013188_hf_20260720_014859_34abec13-b448-4ed8-9a4b-712c3860f5e6.png', 2);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('intrecciato', 'emerald', 'Emerald', '#2d6a4f', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/9669d9ec3_hf_20260720_014021_1a9f0fca-a27d-4c9e-8045-df8ce839e3dd.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/51a508ea6_hf_20260720_013929_d0f643d8-de1f-4d3f-ba15-f9974c9cb851.png', 3);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('intrecciato', 'stone', 'Stone', '#a09b93', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/93cf7b77e_hf_20260720_014310_34bf547e-3928-4763-8b38-78a71cb796db.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/e135c8bc0_hf_20260720_014827_1d57b785-7103-47ed-9543-b36d623a2395.png', 4);
insert into public.product_lines (id, category, name, subtitle, material, description, price, hero_image, sort_order) values ('liscio', 'smooth', 'The Liscio Clutch', 'Smooth Leather', 'Full-grain smooth calfskin', 'The Liscio presents the purest expression of the leather itself — full-grain calfskin selected for its natural grain and hand-finished to a subtle burnished luster. Its clean lines and oversized leather-covered dome button allow the material to speak without interruption.', 1850, 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/ddbd6b694_hf_20260720_014711_04c05d1e-3474-433a-b9b6-fb4b66aecb7d.png', 1);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('liscio', 'noir', 'Noir', '#1a1a1a', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/ddbd6b694_hf_20260720_014711_04c05d1e-3474-433a-b9b6-fb4b66aecb7d.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/bf2da8e8b_hf_20260720_014810_ff36c759-e8bd-40e9-810a-389cbbcbe6f5.png', 0);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('liscio', 'espresso', 'Espresso', '#3b2314', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/c7ed2fe5c_hf_20260720_014630_e6cf8450-9e6f-4acc-a887-4f5a1cda7bfb.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/229662a3c_hf_20260720_014612_5cd8d379-69a3-460a-87e9-ee75322b57db.png', 1);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('liscio', 'cognac', 'Cognac', '#b5763a', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/3592ad481_hf_20260720_014354_f71caeda-82cf-4555-ba2e-5663e72361b6.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/43d013188_hf_20260720_014859_34abec13-b448-4ed8-9a4b-712c3860f5e6.png', 2);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('liscio', 'emerald', 'Emerald', '#2d6a4f', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/830bbee75_hf_20260720_014558_1efebcc6-ca3e-4edd-a6e3-11ea21143e58.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/22ebec32e_hf_20260720_014542_f5def501-31b3-4929-a67a-c1fff50c0a6a.png', 3);
insert into public.colorways (line_id, id, label, swatch, front, back, sort_order) values ('liscio', 'stone', 'Stone', '#a09b93', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/0b02fb579_hf_20260720_015012_0bfae4cf-b961-4e77-9efd-a90e4646e34c.png', 'https://media.base44.com/images/public/69d266ece83738de05c57bdb/e135c8bc0_hf_20260720_014827_1d57b785-7103-47ed-9543-b36d623a2395.png', 4);
