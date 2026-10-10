-- Fictional demo data. No real people or companies.
INSERT INTO contacts (name, email, company, tags, stage) VALUES
  ('Ava Thompson', 'ava@example.test', 'Northwind Labs', '{prospect}', 'lead'),
  ('Liam Carter', 'liam@example.test', 'Acme Widgets', '{prospect,vip}', 'customer'),
  ('Sofia Reyes', 'sofia@example.test', 'Brightline Co', '{referral}', 'lead'),
  ('Noah Bennett', 'noah@example.test', 'Cedar & Co', '{churned}', 'inactive')
ON CONFLICT DO NOTHING;
