# Architecture

`crm-platform` is a two-tier app: a React SPA frontend and a thin Node/Express
REST API backed by PostgreSQL.

## Components

```
React SPA (Vite)  ──HTTP──►  Express API  ──SQL──►  PostgreSQL
   src/                        server/
   ├─ App.tsx                  ├─ index.ts   (routes)
   ├─ lib/pipeline.ts          ├─ db.ts      (pool + schema init)
   ├─ lib/deal-ops.ts          └─ seed.sql   (demo data)
   └─ components/
```

## Data model

Three tables: `contacts`, `deals`, `activities`. Deals and activities reference
contacts via foreign keys (cascade on delete). The full schema lives in
`server/schema.sql`; the server also applies it on boot.

## Pipeline state machine

`lib/pipeline.ts` defines the deal lifecycle as an explicit state machine:

```
lead → qualified → proposal → won
  └──────────────→ lost
```

Transitions are enforced in `canTransition()` and `applyTransition()`, so invalid
moves (e.g., won → lead) are rejected at the logic layer, not just the UI.

## Testing

- `lib/pipeline.test.ts` — stage definitions, transitions, win rate, pipeline value
- `lib/deal-ops.test.ts` — transition application, grouping, sorting
