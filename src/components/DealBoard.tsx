import { Deal } from '../lib/pipeline';

interface Props {
  deals: Deal[];
  onMove: (dealId: string, stage: Deal['stage']) => void;
}

export default function DealBoard({ deals, onMove }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {(['lead', 'qualified', 'proposal', 'won', 'lost'] as const).map((stage) => (
        <div key={stage} className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="mb-2 text-sm font-medium capitalize">{stage}</div>
          <div className="space-y-2">
            {deals
              .filter((d) => d.stage === stage)
              .map((d) => (
                <div key={d.id} className="rounded-lg bg-slate-50 p-2 text-xs">
                  <div className="font-medium">{d.title}</div>
                  <div className="text-slate-500">${d.value.toLocaleString()}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
