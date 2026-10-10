import { Deal, STAGES } from '../lib/pipeline';

interface Props {
  deals: Deal[];
}

export default function Pipeline({ deals }: Props) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-medium">Pipeline</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.id);
          const value = stageDeals.reduce((sum, d) => sum + d.value, 0);
          return (
            <div key={stage.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stage.label}</span>
                <span className="text-xs text-slate-400">{stageDeals.length}</span>
              </div>
              <div className="mt-2 text-lg font-semibold">${value.toLocaleString()}</div>
              {stageDeals.map((d) => (
                <div key={d.id} className="mt-2 rounded-lg bg-slate-50 p-2 text-xs">
                  {d.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
