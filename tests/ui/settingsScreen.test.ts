// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { renderSettings } from '../../src/ui/settingsScreen.js';

describe('settingsScreen', () => {
  const getScreen = () => renderSettings(() => {});

  it('renders base and length selects with a start button', () => {
    const screen = getScreen();
    expect(screen.querySelectorAll('select').length).toBe(2);
    expect(screen.querySelectorAll('button').length).toBe(1);
  });

  it('limits binary to length 2 only', () => {
    const screen = getScreen();
    const selects = screen.querySelectorAll('select');
    const baseSelect = selects[0] as HTMLSelectElement;
    const lengthSelect = selects[1] as HTMLSelectElement;
    baseSelect.value = '2';
    baseSelect.dispatchEvent(new Event('change'));
    expect(lengthSelect.options.length).toBe(1);
    expect(lengthSelect.options[0]?.value).toBe('2');
  });

  it('offers lengths 2-6 for decimal and hex', () => {
    const screen = getScreen();
    const selects = screen.querySelectorAll('select');
    const baseSelect = selects[0] as HTMLSelectElement;
    const lengthSelect = selects[1] as HTMLSelectElement;
    baseSelect.value = '10';
    baseSelect.dispatchEvent(new Event('change'));
    expect(lengthSelect.options.length).toBe(5);
    baseSelect.value = '16';
    baseSelect.dispatchEvent(new Event('change'));
    expect(lengthSelect.options.length).toBe(5);
  });

  it('passes selected settings to onStart', () => {
    let received: { length: number; base: number } | undefined;
    const screen = renderSettings((settings) => {
      received = settings;
    });
    const selects = screen.querySelectorAll('select');
    const baseSelect = selects[0] as HTMLSelectElement;
    const lengthSelect = selects[1] as HTMLSelectElement;
    baseSelect.value = '16';
    baseSelect.dispatchEvent(new Event('change'));
    lengthSelect.value = '4';
    (screen.querySelector('button') as HTMLButtonElement).click();
    expect(received).toEqual({ length: 4, base: 16 });
  });
});
