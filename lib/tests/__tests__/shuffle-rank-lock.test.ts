import { describe, expect, it } from 'vitest';
import { generateShuffledPaper } from '../shuffle';
import { estimateRank, percentileFromCohort, percentileFromReference } from '../rank';
import { formatClock, scaleSectionalLock, sectionAccess } from '../sectionLock';

const section = {
  id: 'physics',
  questions: [
    { id: 'q1', groupId: null, optionIds: ['a', 'b', 'c', 'd'], shuffleOptions: true },
    { id: 'q2', groupId: 'p1', optionIds: ['a', 'b', 'c', 'd'], shuffleOptions: true },
    { id: 'q3', groupId: 'p1', optionIds: ['a', 'b', 'c', 'd'], shuffleOptions: false },
    { id: 'q4', groupId: null, optionIds: [], shuffleOptions: true },
    { id: 'q5', groupId: null, optionIds: ['a', 'b', 'c', 'd'], shuffleOptions: true },
  ],
};

describe('generateShuffledPaper', () => {
  it('is deterministic for the same seed', () => {
    expect(generateShuffledPaper('seed-1', [section])).toEqual(generateShuffledPaper('seed-1', [section]));
  });

  it('keeps every question exactly once and passage groups together in order', () => {
    const paper = generateShuffledPaper('seed-2', [section]);
    const ids = paper.sections[0].questionIds;
    expect([...ids].sort()).toEqual(['q1', 'q2', 'q3', 'q4', 'q5']);
    expect(ids.indexOf('q3')).toBe(ids.indexOf('q2') + 1);
  });

  it('respects keepOrder and non-shuffled options', () => {
    const paper = generateShuffledPaper('seed-3', [{ ...section, keepOrder: true }]);
    expect(paper.sections[0].questionIds).toEqual(['q1', 'q2', 'q3', 'q4', 'q5']);
    expect(paper.optionOrder.q3).toEqual(['a', 'b', 'c', 'd']);
    expect(paper.optionOrder.q4).toBeUndefined();
    expect([...paper.optionOrder.q1].sort()).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('rank estimate', () => {
  const rows = [{ marks: 0, percentile: 10 }, { marks: 100, percentile: 90 }, { marks: 200, percentile: 99.9 }];

  it('interpolates reference rows', () => {
    expect(percentileFromReference(50, rows)).toBeCloseTo(50);
    expect(percentileFromReference(-10, rows)).toBe(10);
    expect(percentileFromReference(500, rows)).toBe(99.9);
  });

  it('computes cohort percentile with ties counted as at-or-below', () => {
    expect(percentileFromCohort(50, [10, 50, 50, 90])).toBe(75);
  });

  it('returns null without cohort or reference', () => {
    expect(estimateRank({ score: 10, cohortScores: [1, 2], cohortThreshold: 30, referenceRows: null, referenceIsSample: true, registrations: 1000 })).toBeNull();
  });

  it('uses the reference with low confidence when it is sample data', () => {
    const r = estimateRank({ score: 100, cohortScores: [], cohortThreshold: 30, referenceRows: rows, referenceIsSample: true, registrations: 100000 })!;
    expect(r.method).toBe('REFERENCE');
    expect(r.confidence).toBe('Low');
    expect(r.isSampleReference).toBe(true);
    expect(r.rankLow!).toBeLessThan(10000);
    expect(r.rankHigh!).toBeGreaterThan(10000);
  });

  it('never estimates a rank beyond the number of candidates', () => {
    const r = estimateRank({ score: 0, cohortScores: [], cohortThreshold: 30, referenceRows: rows, referenceIsSample: true, registrations: 1000 })!;
    expect(r.rankHigh!).toBeLessThanOrEqual(1000);
    expect(r.rankLow!).toBeLessThanOrEqual(r.rankHigh!);
  });
});

describe('sectional lock', () => {
  const lock = { firstPhaseSections: ['physics', 'chemistry'], secondPhaseSections: ['maths'], switchAtRemainingSeconds: 5400 };

  it('locks maths until 90:00 and physics/chemistry after', () => {
    expect(sectionAccess(lock, 'maths', 5401)).toBe('LOCKED_UNTIL_SWITCH');
    expect(sectionAccess(lock, 'physics', 5401)).toBe('OPEN');
    expect(sectionAccess(lock, 'maths', 5400)).toBe('OPEN');
    expect(sectionAccess(lock, 'chemistry', 5400)).toBe('LOCKED_AFTER_SWITCH');
    expect(sectionAccess(null, 'maths', 9999)).toBe('OPEN');
  });

  it('scales to shorter tests', () => {
    expect(scaleSectionalLock(lock, 10800, 1800)!.switchAtRemainingSeconds).toBe(900);
  });

  it('formats the clock', () => {
    expect(formatClock(3725)).toBe('01 : 02 : 05');
  });
});
