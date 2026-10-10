import { describe, expect, it } from 'vitest';
import { canTransition, pipelineValue, winRate, STAGES } from './pipeline';

describe('pipeline', () => {
  it('allows valid forward transitions only', () => {
    expect(canTransition('lead', 'qualified')).toBe(true);
    expect(canTransition('lead', 'won')).toBe(false);
    expect(canTransition('proposal', 'won')).toBe(true);
    expect(canTransition('proposal', 'lead')).toBe(false);
  });

  it('computes pipeline value excluding lost deals', () => {
    const deals = [
      { id: '1', contactId: 'a', title: 'A', value: 1000, stage: 'lead', createdAt: '' },
      { id: '2', contactId: 'b', title: 'B', value: 500, stage: 'lost', createdAt: '' },
    ] as const;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(pipelineValue(deals as any)).toBe(1000);
  });

  it('computes win rate from closed deals', () => {
    const deals = [
      { id: '1', contactId: 'a', title: 'A', value: 1, stage: 'won', createdAt: '' },
      { id: '2', contactId: 'b', title: 'B', value: 1, stage: 'lost', createdAt: '' },
      { id: '3', contactId: 'c', title: 'C', value: 1, stage: 'lead', createdAt: '' },
    ] as const;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(winRate(deals as any)).toBe(50);
  });

  it('defines five ordered stages', () => {
    expect(STAGES).toHaveLength(5);
    expect(STAGES[0].id).toBe('lead');
    expect(STAGES[STAGES.length - 1].id).toBe('lost');
  });
});
