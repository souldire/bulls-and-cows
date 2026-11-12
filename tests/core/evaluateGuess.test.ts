import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../../src/core/evaluateGuess.js';

describe('evaluateGuess', () => {
  it('returns all bulls for exact match', () => {
    expect(evaluateGuess('0371', '0371')).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns zeros when no digits match', () => {
    expect(evaluateGuess('0371', '4562')).toEqual({ bulls: 0, cows: 0 });
  });

  it('counts bulls, cows and missing digits separately', () => {
    expect(evaluateGuess('0371', '0437')).toEqual({ bulls: 1, cows: 2 });
    expect(evaluateGuess('0371', '9037')).toEqual({ bulls: 0, cows: 3 });
  });

  it('returns only cows when all digits present but shuffled', () => {
    expect(evaluateGuess('0371', '7103')).toEqual({ bulls: 0, cows: 4 });
  });

  it('counts mixed bulls and cows', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
  });

  it('compares hex digits case-insensitively', () => {
    expect(evaluateGuess('0af3', 'f0a3')).toEqual({ bulls: 1, cows: 3 });
    expect(evaluateGuess('0AF3', '0af3')).toEqual({ bulls: 4, cows: 0 });
  });
});
