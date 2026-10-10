import { describe, expect, it } from 'vitest';
import { applyTransition, groupByStage, sortDealsByValue } from './deal-ops';
import { Deal } from './pipeline';

const deal = (id: string, stage: Deal['stage'], value = 100): Deal => ({
  id, contactId: 'c', title: id, value, stage, createdAt: '',
});

describe('applyTransition', () => {
  it('moves a deal to a valid stage', () => {
    const deals = [deal('a', 'lead')];
    const out = applyTransition(deals, 'a', 'qualified');
    expect(out[0].stage).toBe('qualified');
  });

  it('leaves the deal unchanged on invalid transition', () => {
    const deals = [deal('a', 'lead')];
    const out = applyTransition(deals, 'a', 'won');
    expect(out[0].stage).toBe('lead');
  });
});

describe('groupByStage', () => {
  it('groups deals by stage', () => {
    const out = groupByStage([deal('a', 'lead'), deal('b', 'lead'), deal('c', 'won')]);
    expect(out.get('lead')).toHaveLength(2);
    expect(out.get('won')).toHaveLength(1);
  });
});

describe('sortDealsByValue', () => {
  it('sorts descending by value', () => {
    const out = sortDealsByValue([deal('a', 'lead', 100), deal('b', 'lead', 900), deal('c', 'lead', 50)]);
    expect(out[0].id).toBe('b');
    expect(out[2].id).toBe('c');
  });
});
