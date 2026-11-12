import { generateSecret } from './core/generateSecret.js';
import { renderGameScreen } from './ui/gameScreen.js';
import { renderSettings } from './ui/settingsScreen.js';
import { formatTime } from './ui/format.js';
import { renderLeaderboard, saveScore } from './ui/leaderboard.js';
const root = document.createElement('div');
document.body.append(root);
const showSettings = () => {
    root.replaceChildren(renderSettings(startGame));
};
const startGame = (settings) => {
    const secret = generateSecret(settings.length, settings.base);
    renderGameScreen(root, settings, secret, (result) => showWin(settings, result));
};
const showWin = (settings, result) => {
    const scores = saveScore({
        attempts: result.attempts,
        timeMs: result.timeMs,
        length: settings.length,
        base: settings.base,
        date: new Date().toISOString(),
    });
    const victory = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'You won!';
    const stats = document.createElement('p');
    stats.textContent = `Attempts: ${result.attempts} | Time: ${formatTime(result.timeMs)} | Length: ${settings.length}, base: ${settings.base}`;
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New game';
    newGameButton.addEventListener('click', showSettings);
    victory.append(title, stats, newGameButton, renderLeaderboard(scores));
    root.append(victory);
};
showSettings();
