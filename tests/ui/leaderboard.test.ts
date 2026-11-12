// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { formatTime } from '../../src/ui/format.js';
import { loadScores, renderLeaderboard, saveScore } from '../../src/ui/leaderboard.js';
import type { Score } from '../../src/ui/leaderboard.js';

const makeScore = (attempts: number, timeMs: number): Score => ({
  attempts,
  timeMs,
  length: 4,
  base: 10,
  date: '2026-01-01T00:00:00.000Z',
});

beforeEach(() => {
  localStorage.clear();
});

describe('leaderboard storage', () => {
  it('returns empty list when nothing is stored', () => {
    expect(loadScores()).toEqual([]);
  });

  it('sorts by attempts, then by time', () => {
    saveScore(makeScore(3, 2000));
    saveScore(makeScore(2, 5000));
    saveScore(makeScore(3, 1000));
    const scores = loadScores();
    expect(scores[0]).toMatchObject({ attempts: 2, timeMs: 5000 });
    expect(scores[1]).toMatchObject({ attempts: 3, timeMs: 1000 });
    expect(scores[2]).toMatchObject({ attempts: 3, timeMs: 2000 });
  });

  it('keeps only top 10', () => {
    for (let attempts = 12; attempts >= 1; attempts -= 1) {
      saveScore(makeScore(attempts, 1000));
    }
    const scores = loadScores();
    expect(scores.length).toBe(10);
    expect(scores[0]?.attempts).toBe(1);
    expect(scores[9]?.attempts).toBe(10);
  });
});

describe('renderLeaderboard', () => {
  it('shows empty message without records', () => {
    const section = renderLeaderboard([]);
    expect(section.textContent).toContain('No records yet');
  });

  it('renders one row per score with settings badge', () => {
    const section = renderLeaderboard([makeScore(5, 65000)]);
    expect(section.querySelectorAll('tr').length).toBe(2);
    expect(section.textContent).toContain('len 4, base 10');
    expect(section.textContent).toContain('1:05');
  });
});

describe('formatTime', () => {
  it('formats minutes and seconds', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(65000)).toBe('1:05');
  });
});
