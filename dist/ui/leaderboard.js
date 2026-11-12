import { formatTime } from './format.js';
const STORAGE_KEY = 'bulls-and-cows-leaderboard';
const MAX_SCORES = 10;
export const loadScores = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
        return [];
    }
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
};
export const saveScore = (score) => {
    const scores = [...loadScores(), score];
    scores.sort((a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs);
    const top = scores.slice(0, MAX_SCORES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
    return top;
};
export const renderLeaderboard = (scores) => {
    const section = document.createElement('section');
    const title = document.createElement('h3');
    title.textContent = 'Leaderboard: top 10 by attempts';
    section.append(title);
    if (scores.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No records yet';
        section.append(empty);
        return section;
    }
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['#', 'Attempts', 'Time', 'Settings'].forEach((text) => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.append(th);
    });
    table.append(headerRow);
    scores.forEach((score, index) => {
        const row = document.createElement('tr');
        const cells = [
            String(index + 1),
            String(score.attempts),
            formatTime(score.timeMs),
            `len ${score.length}, base ${score.base}`,
        ];
        cells.forEach((text) => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.append(cell);
        });
        table.append(row);
    });
    section.append(table);
    return section;
};
