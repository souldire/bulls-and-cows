export const createDigitValidator = (base) => (char) => {
    const digits = '0123456789abcdef'.slice(0, base);
    return char.length === 1 && digits.includes(char.toLowerCase());
};
