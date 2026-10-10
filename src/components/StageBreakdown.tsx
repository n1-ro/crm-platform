import { Contact } from '../lib/api';

interface Props {
  contacts: Contact[];
}

export default function StageBreakdown({ contacts }: Props) {
  const counts = contacts.reduce<Record<string, number>>((acc, c) => {
    acc[c.stage] = (acc[c.stage] ?? 0) + 1;
    return acc;
  }, {});
  const total = contacts.length || 1;

  return (
    <div className="grid grid-cols-3 gap-3">
      {(['lead', 'customer', 'inactive'] as const).map((stage) => {
        const count = counts[stage] ?? 0;
        return (
          <div key={stage} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">{stage}</div>
            <div className="mt-1 text-2xl font-semibold">{count}</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-sky-500" style={{ width: `${(count / total) * 100}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
