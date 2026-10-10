import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

export async function initSchema(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text NOT NULL,
      company text DEFAULT '',
      tags text[] DEFAULT '{}',
      stage text DEFAULT 'lead',
      created_at timestamptz DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS activities (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
      type text NOT NULL,
      body text NOT NULL,
      created_at timestamptz DEFAULT now()
    );
  `);
}
