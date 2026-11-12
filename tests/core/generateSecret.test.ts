import { describe, expect, it } from 'vitest';
import { generateSecret } from '../../src/core/generateSecret.js';
import { createDigitValidator } from '../../src/core/createDigitValidator.js';

describe('generateSecret', () => {
  it('picks first available digits when random returns 0', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
    expect(generateSecret(3, 16, () => 0)).toBe('012');
  });

  it('picks last available digits when random is close to 1', () => {
    expect(generateSecret(4, 10, () => 0.99)).toBe('9876');
  });

  it('handles binary base', () => {
    expect(generateSecret(2, 2, () => 0.5)).toBe('10');
  });

  it('generates string of given length with unique valid digits', () => {
    const secret = generateSecret(4, 10);
    expect(typeof secret).toBe('string');
    expect(secret.length).toBe(4);
    expect(new Set(secret).size).toBe(4);
    const isValidDigit = createDigitValidator(10);
    expect(secret.split('').every((char) => isValidDigit(char))).toBe(true);
  });

  it('can start with zero', () => {
    expect(generateSecret(4, 10, () => 0).startsWith('0')).toBe(true);
  });
});
