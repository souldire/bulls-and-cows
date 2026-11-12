export const evaluateGuess = (secret: string, guess: string): { bulls: number; cows: number } => {
  const secretChars = secret.toLowerCase().split('');
  const guessChars = guess.toLowerCase().split('');
  const bulls = guessChars.filter((char, i) => char === secretChars[i]).length;
  const cows = guessChars.filter((char) => secretChars.includes(char)).length - bulls;
  return { bulls, cows };
};
