import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../../src/core/countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  it('counts permutations without repetition', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });

  it('handles binary', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('handles length equal to base', () => {
    expect(countPossibleSecrets(4, 4)).toBe(24);
  });

  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
    expect(countPossibleSecrets(11, 10)).toBe(0);
  });

  it('counts longer secrets beyond the game limit', () => {
    expect(countPossibleSecrets(7, 10)).toBe(604800);
  });

  it('handles empty and negative length', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
    expect(countPossibleSecrets(-1, 10)).toBe(0);
  });

  it('handles max length', () => {
    expect(countPossibleSecrets(6, 10)).toBe(151200);
    expect(countPossibleSecrets(6, 10)).toBe(151200);
  });
});
