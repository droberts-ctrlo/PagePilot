/**
 * Highlighter class
 */
export default class Highlighter {
    private fade;
    constructor();
    private createFade;
    /**
     * Highlights an element
     * @template {HTMLElement} T The type of the element
     * @param element The element to highlight
     */
    highlight<T extends HTMLElement = HTMLElement>(element: T): void;
    removeHighlight<T extends HTMLElement>(element: T): void;
    private doScroll;
    /**
     * Resets the highlighter
     */
    reset(): void;
}
