import { describe, expect, it } from 'vitest';
import { isValidGuess } from '../../src/core/isValidGuess.js';

describe('isValidGuess', () => {
  it('accepts correct length with unique valid digits', () => {
    expect(isValidGuess('0371', 4, 10)).toBe(true);
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('0af3', 4, 16)).toBe(true);
    expect(isValidGuess('0AF3', 4, 16)).toBe(true);
  });

  it('rejects wrong length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
    expect(isValidGuess('', 4, 10)).toBe(false);
  });

  it('rejects digits outside the base', () => {
    expect(isValidGuess('1289', 4, 8)).toBe(false);
    expect(isValidGuess('102', 3, 2)).toBe(false);
  });

  it('rejects repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
    expect(isValidGuess('0101', 4, 2)).toBe(false);
  });

  it('rejects non-digit characters', () => {
    expect(isValidGuess('12a3', 4, 10)).toBe(false);
    expect(isValidGuess('12 3', 4, 10)).toBe(false);
    expect(isValidGuess('12-3', 4, 10)).toBe(false);
  });
});
