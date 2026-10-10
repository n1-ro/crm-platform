import { useEffect, useState } from 'react';
import { api, Contact } from './lib/api';
import { Deal, pipelineValue, winRate, STAGES } from './lib/pipeline';
import Pipeline from './components/Pipeline';
import ContactList from './components/ContactList';

// Static demo deals derived from the pipeline module (kept local so the UI
// runs without a backend). In production these come from the API.
const DEMO_DEALS: Deal[] = [
  { id: 'd1', contactId: 'c1', title: 'Annual renewal', value: 24000, stage: 'proposal', createdAt: '2026-01-10' },
  { id: 'd2', contactId: 'c2', title: 'Expansion pilot', value: 18000, stage: 'qualified', createdAt: '2026-02-02' },
  { id: 'd3', contactId: 'c3', title: 'New logo', value: 9500, stage: 'won', createdAt: '2026-01-20' },
  { id: 'd4', contactId: 'c4', title: 'Consulting', value: 12000, stage: 'lost', createdAt: '2026-02-15' },
];

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    api.listContacts().then(setContacts).catch(() => {
      setContacts([
        { id: 'c1', name: 'Ava Thompson', email: 'ava@example.test', company: 'Northwind Labs', tags: ['prospect'], stage: 'lead', createdAt: '2026-02-01' },
        { id: 'c2', name: 'Liam Carter', email: 'liam@example.test', company: 'Acme Widgets', tags: ['vip'], stage: 'customer', createdAt: '2026-01-15' },
      ]);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-xl font-semibold">CRM Platform</h1>
          <div className="mt-2 flex gap-6 text-sm text-slate-500">
            <span>Pipeline value: <b className="text-slate-900">${pipelineValue(DEMO_DEALS).toLocaleString()}</b></span>
            <span>Win rate: <b className="text-slate-900">{winRate(DEMO_DEALS).toFixed(0)}%</b></span>
            <span>Stages: <b className="text-slate-900">{STAGES.length}</b></span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        <Pipeline deals={DEMO_DEALS} />
        <ContactList contacts={contacts} />
      </main>
    </div>
  );
}
