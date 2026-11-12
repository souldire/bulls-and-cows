import { createDigitValidator } from './createDigitValidator.js';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  if (guess.length !== length) {
    return false;
  }
  const isValidDigit = createDigitValidator(base);
  const chars = guess.toLowerCase().split('');
  if (!chars.every((char) => isValidDigit(char))) {
    return false;
  }
  return new Set(chars).size === chars.length;
};
