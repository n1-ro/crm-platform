import { Deal, canTransition, DealStage } from './pipeline';

export function applyTransition(deals: Deal[], dealId: string, to: DealStage): Deal[] {
  return deals.map((d) => {
    if (d.id !== dealId) return d;
    if (!canTransition(d.stage, to)) return d;
    return { ...d, stage: to };
  });
}

export function groupByStage(deals: Deal[]) {
  const map = new Map<DealStage, Deal[]>();
  for (const d of deals) {
    const list = map.get(d.stage) ?? [];
    list.push(d);
    map.set(d.stage, list);
  }
  return map;
}

export function sortDealsByValue(deals: Deal[]): Deal[] {
  return [...deals].sort((a, b) => b.value - a.value);
}
