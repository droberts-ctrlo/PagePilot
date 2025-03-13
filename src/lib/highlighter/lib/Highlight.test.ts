import { afterEach, describe, expect, it } from '@jest/globals';
import Highlighter from './Highlight';

describe('Highlight', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('creates the background-fade div', () => {
        new Highlighter();
        const fade = document.getElementById('background-fade');
        expect(fade).toBeTruthy();
    });

    it('highlights an element', () => {
        const element = document.createElement('div');
        document.body.appendChild(element);
        const highlighter = new Highlighter();
        highlighter.highlight(element);
        expect(element.classList.contains('highlight')).toBe(true);
    });

    it('resets the highlighter', () => {
        const element = document.createElement('div');
        document.body.appendChild(element);
        const highlighter = new Highlighter();
        highlighter.highlight(element);
        highlighter.reset();
        expect(element.classList.contains('highlight')).toBe(false);
    });
});
