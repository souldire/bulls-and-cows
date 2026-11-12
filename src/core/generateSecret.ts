export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  const alphabet = '0123456789abcdef'.slice(0, base).split('');
  const picked: string[] = [];
  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(random() * alphabet.length);
    picked.push(...alphabet.splice(index, 1));
  }
  return picked.join('');
};
