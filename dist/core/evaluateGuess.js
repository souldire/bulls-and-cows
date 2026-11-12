export const evaluateGuess = (secret, guess) => {
    const secretChars = secret.toLowerCase().split('');
    const guessChars = guess.toLowerCase().split('');
    const bulls = guessChars.filter((char, i) => char === secretChars[i]).length;
    const cows = guessChars.filter((char) => secretChars.includes(char)).length - bulls;
    return { bulls, cows };
};
