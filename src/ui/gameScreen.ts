import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { createDigitValidator } from '../core/createDigitValidator.js';
import { evaluateGuess } from '../core/evaluateGuess.js';
import { isValidGuess } from '../core/isValidGuess.js';
import type { Attempt, Settings } from './types.js';

export interface GameResult {
  attempts: number;
  timeMs: number;
}

export const renderGameScreen = (
  root: HTMLElement,
  settings: Settings,
  secret: string,
  onWin: (result: GameResult) => void,
): void => {
  root.replaceChildren();

  const validator = createDigitValidator(settings.base);
  const startTime = Date.now();
  let history: Attempt[] = [];

  const title = document.createElement('h2');
  title.textContent = `Guess the ${settings.length}-digit secret, base ${settings.base}`;

  const info = document.createElement('p');
  info.textContent = `${countPossibleSecrets(settings.length, settings.base)} possible secrets`;

  const attemptsLabel = document.createElement('p');
  attemptsLabel.textContent = 'Attempts: 0';

  const input = document.createElement('input');
  input.autofocus = true;

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Check';

  const hint = document.createElement('p');

  const historyTitle = document.createElement('h3');
  historyTitle.textContent = 'History';

  const historyList = document.createElement('ul');

  const panel = document.createElement('div');
  panel.append(title, info, attemptsLabel, input, submitButton, hint, historyTitle, historyList);
  root.append(panel);

  const renderHistory = (): void => {
    historyList.replaceChildren();
    history.forEach((attempt) => {
      const item = document.createElement('li');
      item.textContent = `${attempt.guess} → bulls: ${attempt.bulls}, cows: ${attempt.cows}`;
      historyList.append(item);
    });
    attemptsLabel.textContent = `Attempts: ${history.length}`;
  };

  input.addEventListener('input', () => {
    const filtered = input.value
      .toLowerCase()
      .split('')
      .filter((char) => validator(char))
      .slice(0, settings.length)
      .join('');
    if (input.value !== filtered) {
      input.value = filtered;
    }
  });

  const checkGuess = (): void => {
    const guess = input.value;
    if (!isValidGuess(guess, settings.length, settings.base)) {
      hint.textContent = 'Unique digits and full length required';
      return;
    }
    if (history.some((attempt) => attempt.guess === guess)) {
      hint.textContent = 'You already tried this number';
      return;
    }
    const { bulls, cows } = evaluateGuess(secret, guess);
    history = [...history, { guess, bulls, cows }];
    hint.textContent = '';
    input.value = '';
    renderHistory();
    if (bulls === settings.length) {
      input.disabled = true;
      submitButton.disabled = true;
      onWin({ attempts: history.length, timeMs: Date.now() - startTime });
    }
  };

  submitButton.addEventListener('click', checkGuess);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkGuess();
    }
  });
};
