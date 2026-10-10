import { describe, expect, it } from 'vitest';
import { Deal, canTransition, pipelineValue, winRate, STAGES, TRANSITIONS } from './pipeline';

const deal = (stage: Deal['stage'], value = 100): Deal => ({
  id: Math.random().toString(36).slice(2),
  contactId: 'c',
  title: 'Deal',
  value,
  stage,
  createdAt: '',
});

describe('pipeline stages', () => {
  it('defines five ordered stages', () => {
    expect(STAGES).toHaveLength(5);
    expect(STAGES.map((s) => s.id)).toEqual(['lead', 'qualified', 'proposal', 'won', 'lost']);
  });

  it('marks won/lost as closed', () => {
    const won = STAGES.find((s) => s.id === 'won')!;
    const lost = STAGES.find((s) => s.id === 'lost')!;
    expect(won.isClosed).toBe(true);
    expect(won.isWon).toBe(true);
    expect(lost.isClosed).toBe(true);
  });
});

describe('transitions', () => {
  it('allows lead -> qualified and lead -> lost', () => {
    expect(canTransition('lead', 'qualified')).toBe(true);
    expect(canTransition('lead', 'lost')).toBe(true);
  });

  it('rejects backwards transitions', () => {
    expect(canTransition('proposal', 'lead')).toBe(false);
    expect(canTransition('won', 'proposal')).toBe(false);
  });

  it('rejects transitions from closed stages', () => {
    expect(TRANSITIONS.won).toEqual([]);
    expect(TRANSITIONS.lost).toEqual([]);
  });
});

describe('metrics', () => {
  it('computes pipeline value excluding lost', () => {
    const deals = [deal('lead', 1000), deal('qualified', 500), deal('lost', 300), deal('won', 200)];
    expect(pipelineValue(deals)).toBe(1700);
  });

  it('computes win rate over closed deals only', () => {
    const deals = [deal('won'), deal('won'), deal('lost'), deal('proposal')];
    expect(winRate(deals)).toBeCloseTo(66.67, 1);
  });

  it('returns 0 win rate with no closed deals', () => {
    expect(winRate([deal('lead'), deal('qualified')])).toBe(0);
  });
});
