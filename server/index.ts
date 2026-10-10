import express from 'express';
import { pool } from './db';

const app = express();
app.use(express.json());

app.get('/api/contacts', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, company, tags, stage, created_at FROM contacts ORDER BY created_at DESC',
    );
    res.json(
      rows.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        company: r.company,
        tags: r.tags ?? [],
        stage: r.stage,
        createdAt: r.created_at,
      })),
    );
  } catch (err) {
    res.status(500).json({ error: 'failed to list contacts' });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, email, company, tags, stage } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO contacts (name, email, company, tags, stage)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, company, tags, stage, created_at`,
      [name, email, company ?? '', tags ?? [], stage ?? 'lead'],
    );
    const r = rows[0];
    res.status(201).json({
      id: r.id,
      name: r.name,
      email: r.email,
      company: r.company,
      tags: r.tags ?? [],
      stage: r.stage,
      createdAt: r.created_at,
    });
  } catch {
    res.status(500).json({ error: 'failed to create contact' });
  }
});

app.get('/api/contacts/:id/activities', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, contact_id, type, body, created_at FROM activities WHERE contact_id = $1 ORDER BY created_at DESC',
      [req.params.id],
    );
    res.json(
      rows.map((r) => ({
        id: r.id,
        contactId: r.contact_id,
        type: r.type,
        body: r.body,
        createdAt: r.created_at,
      })),
    );
  } catch {
    res.status(500).json({ error: 'failed to list activities' });
  }
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
  console.log(`CRM API listening on :${PORT}`);
});
