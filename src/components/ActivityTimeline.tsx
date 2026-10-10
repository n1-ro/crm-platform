import { Contact } from '../lib/api';

interface Props {
  contacts: Contact[];
}

export default function ActivityTimeline({ contacts }: Props) {
  // Derive a lightweight timeline from contact recency; full timeline is
  // fetched from the API in the real app.
  const recent = [...contacts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);

  if (recent.length === 0) {
    return <p className="text-sm text-slate-400">No recent activity.</p>;
  }

  return (
    <div className="space-y-3">
      {recent.map((c) => (
        <div key={c.id} className="flex items-start gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
          <div>
            <p className="text-sm">
              <b>{c.name}</b> <span className="text-slate-400">·</span> {c.company}
            </p>
            <p className="text-xs text-slate-400">Added {c.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
