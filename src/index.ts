import { generateSecret } from './core/generateSecret.js';
import { renderGameScreen, type GameResult } from './ui/gameScreen.js';
import { renderSettings } from './ui/settingsScreen.js';
import { formatTime } from './ui/format.js';
import type { Settings } from './ui/types.js';

const root = document.createElement('div');
document.body.append(root);

const showSettings = (): void => {
  root.replaceChildren(renderSettings(startGame));
};

const startGame = (settings: Settings): void => {
  const secret = generateSecret(settings.length, settings.base);
  renderGameScreen(root, settings, secret, (result) => showWin(settings, result));
};

const showWin = (settings: Settings, result: GameResult): void => {
  const victory = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = 'You won!';

  const stats = document.createElement('p');
  stats.textContent = `Attempts: ${result.attempts} | Time: ${formatTime(result.timeMs)} | Length: ${settings.length}, base: ${settings.base}`;

  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New game';
  newGameButton.addEventListener('click', showSettings);

  victory.append(title, stats, newGameButton);
  root.append(victory);
};

showSettings();
