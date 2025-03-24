/**
 * Highlighter class
 */
export default class Highlighter {
    fade;
    /**
     * Creates a new highlighter
     */
    constructor() {
        this.createFade();
        this.reset();
    }
    createFade() {
        const fade = document.createElement('div');
        fade.id = 'background-fade';
        fade.style.display = 'none';
        this.fade = fade;
        document.body.appendChild(fade);
    }
    /**
     * Highlights an element
     * @template {HTMLElement} T The type of the element
     * @param element The element to highlight
     */
    highlight(element) {
        if (!element)
            throw new Error('Element not found');
        this.doScroll(element);
        this.fade.style.display = '';
        if (!element.classList.contains('highlight')) {
            element.classList.add('highlight');
        }
    }
    /**
     * Removes the highlight from an element
     * @param element The element to remove the highlight from
     */
    removeHighlight(element) {
        if (element.classList.contains('highlight')) {
            element.classList.remove('highlight');
        }
        ;
    }
    doScroll(element) {
        // @ts-expect-error test is not defined
        if (window.test)
            return;
        const { top } = element.getBoundingClientRect();
        const { scrollTop } = document.body;
        const offset = Math.max(top + scrollTop - 100, 0);
        window.scrollTo(0, offset);
    }
    /**
     * Resets the highlighter
     */
    reset() {
        this.fade.style.display = 'none';
        const highlighted = document.querySelector('.highlight');
        if (highlighted) {
            highlighted.classList.remove('highlight');
        }
    }
}
