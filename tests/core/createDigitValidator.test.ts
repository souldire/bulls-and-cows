import { describe, expect, it } from 'vitest';
import { createDigitValidator } from '../../src/core/createDigitValidator.js';

describe('createDigitValidator', () => {
  it('returns a predicate function', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(typeof isDecimalDigit).toBe('function');
  });

  it('accepts decimal digits 0-9 and rejects others', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('0')).toBe(true);
    expect(isDecimalDigit('9')).toBe(true);
    expect(isDecimalDigit('a')).toBe(false);
    expect(isDecimalDigit('10')).toBe(false);
  });

  it('accepts only 0 and 1 in binary', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
    expect(isBinaryDigit('2')).toBe(false);
  });

  it('accepts only 0-7 in octal', () => {
    const isOctalDigit = createDigitValidator(8);
    expect(isOctalDigit('7')).toBe(true);
    expect(isOctalDigit('8')).toBe(false);
    expect(isOctalDigit('9')).toBe(false);
  });

  it('accepts lowercase and uppercase hex digits (case-insensitive)', () => {
    const isHexDigit = createDigitValidator(16);
    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('f')).toBe(true);
    expect(isHexDigit('A')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
    expect(isHexDigit('g')).toBe(false);
    expect(isHexDigit('G')).toBe(false);
  });

  it('rejects non-digit and multi-char input', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('')).toBe(false);
    expect(isDecimalDigit('12')).toBe(false);
    expect(isDecimalDigit(' ')).toBe(false);
    expect(isDecimalDigit('+')).toBe(false);
    expect(isDecimalDigit('-')).toBe(false);
  });
});
