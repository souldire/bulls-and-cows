export const BASES = [
    { value: 2, label: 'Binary (0-1)' },
    { value: 8, label: 'Octal (0-7)' },
    { value: 10, label: 'Decimal (0-9)' },
    { value: 16, label: 'Hex (0-9, A-F)' },
];
export const renderSettings = (onStart) => {
    const container = document.createElement('div');
    const title = document.createElement('h1');
    title.textContent = 'Bulls and Cows';
    const description = document.createElement('p');
    description.textContent =
        'Guess the secret number of unique digits. Bulls: right digit in right place. Cows: right digit in wrong place.';
    const baseLabel = document.createElement('label');
    baseLabel.textContent = 'Base: ';
    const baseSelect = document.createElement('select');
    BASES.forEach(({ value, label }) => {
        const option = document.createElement('option');
        option.value = String(value);
        option.textContent = label;
        baseSelect.append(option);
    });
    baseLabel.append(baseSelect);
    const lengthLabel = document.createElement('label');
    lengthLabel.textContent = 'Length: ';
    const lengthSelect = document.createElement('select');
    lengthLabel.append(lengthSelect);
    const fillLengths = (base) => {
        lengthSelect.replaceChildren();
        for (let len = 2; len <= 6 && len <= base; len += 1) {
            const option = document.createElement('option');
            option.value = String(len);
            option.textContent = String(len);
            lengthSelect.append(option);
        }
    };
    fillLengths(Number(baseSelect.value));
    baseSelect.addEventListener('change', () => {
        fillLengths(Number(baseSelect.value));
    });
    const startButton = document.createElement('button');
    startButton.textContent = 'Start game';
    startButton.addEventListener('click', () => {
        onStart({ length: Number(lengthSelect.value), base: Number(baseSelect.value) });
    });
    container.append(title, description, baseLabel, lengthLabel, startButton);
    return container;
};
