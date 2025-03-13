/**
 * Highlighter class
 * @property {number} x - x coordinate of the element
 * @property {number} y - y coordinate of the element
 * @property {number} width - width of the element
 * @property {number} height - height of the element
 */
export default class Highlighter {
    
    private fade!: HTMLDivElement;
    
    constructor() {
        this.createFade();
        this.reset();
    }

    private createFade() {
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
    highlight<T extends HTMLElement = HTMLElement>(element: T) {
        if (!element) throw new Error('Element not found');
        this.doScroll(element);
        this.fade.style.display = '';
        if (!element.classList.contains('highlight')) {
            element.classList.add('highlight');
        }
    }

    removeHighlight<T extends HTMLElement>(element: T) {
        if (element.classList.contains('highlight')) {
            element.classList.remove('highlight');
        };
    }

    private doScroll(element: HTMLElement) {
        // @ts-expect-error test is not defined
        if(window.test) return;
        const { top } = element.getBoundingClientRect();
        const {scrollTop} = document.body;
        var offset = Math.max(top + scrollTop-100,0);
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
