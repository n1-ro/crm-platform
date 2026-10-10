# CRM Platform

A lightweight, self-hosted customer-relationship management system for small teams. Track contacts and deals through a simple pipeline, keep a shared activity log, and view live dashboards of pipeline value and conversion — all in one clean single-page app.

Built as a modern full-stack starter: React frontend, a thin Node API, and PostgreSQL for storage. No heavyweight CRM lock-in — the schema and UI are intentionally simple so a team can adopt it in a day.

## Features

- Contacts with lifecycle stage and tags
- Deals with a configurable pipeline (lead → qualified → proposal → won/lost)
- Shared activity timeline per contact
- Dashboard: pipeline value, win rate, contacts by stage
- Role-aware UI (owner vs. member)

## Tech stack

- TypeScript
- React 18 + Vite
- Tailwind CSS + shadcn/ui primitives
- Node.js + Express (thin REST API)
- PostgreSQL via `pg`

## Run it

```bash
npm install
npm run dev        # Vite + API dev server
npm run build      # production build
npm run test       # unit tests
```

## Structure

```
src/
  lib/
    pipeline.ts     # stage definitions + transitions
    api.ts          # typed API client
  components/
    Dashboard.tsx
    Pipeline.tsx
    ContactList.tsx
    ActivityTimeline.tsx
  App.tsx
server/
  index.ts          # Express API
  db.ts             # pg queries + schema
```

> **Note:** sample data in `server/seed.sql` is fictional and generated for demo purposes.
