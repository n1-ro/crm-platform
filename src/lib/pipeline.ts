export type DealStage = 'lead' | 'qualified' | 'proposal' | 'won' | 'lost';

export interface StageDefinition {
  id: DealStage;
  label: string;
  order: number;
  isClosed: boolean;
  isWon?: boolean;
}

export const STAGES: StageDefinition[] = [
  { id: 'lead', label: 'Lead', order: 0, isClosed: false },
  { id: 'qualified', label: 'Qualified', order: 1, isClosed: false },
  { id: 'proposal', label: 'Proposal', order: 2, isClosed: false },
  { id: 'won', label: 'Won', order: 3, isClosed: true, isWon: true },
  { id: 'lost', label: 'Lost', order: 4, isClosed: true, isWon: false },
];

export const TRANSITIONS: Record<DealStage, DealStage[]> = {
  lead: ['qualified', 'lost'],
  qualified: ['proposal', 'lost'],
  proposal: ['won', 'lost'],
  won: [],
  lost: [],
};

export function canTransition(from: DealStage, to: DealStage): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export interface Deal {
  id: string;
  contactId: string;
  title: string;
  value: number;
  stage: DealStage;
  createdAt: string;
}

export function winRate(deals: Deal[]): number {
  const closed = deals.filter((d) => d.stage === 'won' || d.stage === 'lost');
  if (closed.length === 0) return 0;
  return (closed.filter((d) => d.stage === 'won').length / closed.length) * 100;
}

export function pipelineValue(deals: Deal[]): number {
  return deals
    .filter((d) => d.stage !== 'lost')
    .reduce((sum, d) => sum + d.value, 0);
}
