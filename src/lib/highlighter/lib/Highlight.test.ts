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

    it('creates the helper-layer div', () => {
        new Highlighter();
        const helperLayer = document.getElementById('helper-layer');
        expect(helperLayer).toBeTruthy();
    });

    it('highlights an element', () => {
        const element = document.createElement('div');
        document.body.appendChild(element);
        const highlighter = new Highlighter();
        const { x, y, width, height } = element.getBoundingClientRect();
        highlighter.highlight(element);
        const highlightX = highlighter.x;
        const highlightY = highlighter.y;
        const highlightWidth = highlighter.width;
        const highlightHeight = highlighter.height;
        expect(highlightX).toBe(x);
        expect(highlightY).toBe(y);
        expect(highlightWidth).toBe(width);
        expect(highlightHeight).toBe(height);
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
