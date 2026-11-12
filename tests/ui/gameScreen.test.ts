// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { renderGameScreen } from '../../src/ui/gameScreen.js';

describe('gameScreen', () => {
  const setup = (secret = '0123') => {
    const root = document.createElement('div');
    document.body.append(root);
    const onWin = vi.fn();
    renderGameScreen(root, { length: 4, base: 10 }, secret, onWin);
    const input = root.querySelector('input') as HTMLInputElement;
    const button = root.querySelector('button') as HTMLButtonElement;
    const historyCount = () => root.querySelectorAll('li').length;
    const typeGuess = (text: string) => {
      input.value = text;
      input.dispatchEvent(new Event('input'));
    };
    return { root, input, button, onWin, historyCount, typeGuess };
  };

  it('filters input to valid unique-capable digits of the base', () => {
    const { input, typeGuess } = setup();
    typeGuess('ab9x');
    expect(input.value).toBe('9');
  });

  it('caps input length to the secret length', () => {
    const { input, typeGuess } = setup();
    typeGuess('0123456');
    expect(input.value).toBe('0123');
  });

  it('rejects incomplete guesses without adding history', () => {
    const game = setup();
    game.typeGuess('9');
    game.button.click();
    expect(game.historyCount()).toBe(0);
    expect(game.onWin).not.toHaveBeenCalled();
  });

  it('adds evaluated guesses to history and counts attempts', () => {
    const game = setup();
    game.typeGuess('9037');
    game.button.click();
    expect(game.historyCount()).toBe(1);
    const firstItem = game.root.querySelector('li');
    expect(firstItem?.textContent).toContain('bulls: 0');
    expect(firstItem?.textContent).toContain('cows: 2');
    expect(game.root.textContent).toContain('Attempts: 1');
  });

  it('does not duplicate history on repeated guess', () => {
    const game = setup();
    game.typeGuess('9037');
    game.button.click();
    game.typeGuess('9037');
    game.button.click();
    expect(game.historyCount()).toBe(1);
  });

  it('calls onWin with attempts and time on correct guess', () => {
    const game = setup();
    game.typeGuess('9037');
    game.button.click();
    game.typeGuess('0371');
    game.button.click();
    expect(game.onWin).not.toHaveBeenCalled();
    game.typeGuess('0123');
    game.button.click();
    expect(game.onWin).toHaveBeenCalledTimes(1);
    expect(game.onWin).toHaveBeenCalledWith({ attempts: 3, timeMs: expect.any(Number) });
    expect((game.input as HTMLInputElement).disabled).toBe(true);
  });
});
