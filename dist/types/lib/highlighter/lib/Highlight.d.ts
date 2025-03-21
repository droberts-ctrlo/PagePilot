/**
 * Highlighter class
 */
export default class Highlighter {
    private fade;
    /**
     * Creates a new highlighter
     */
    constructor();
    private createFade;
    /**
     * Highlights an element
     * @template {HTMLElement} T The type of the element
     * @param element The element to highlight
     */
    highlight<T extends HTMLElement = HTMLElement>(element: T): void;
    /**
     * Removes the highlight from an element
     * @param element The element to remove the highlight from
     */
    removeHighlight<T extends HTMLElement>(element: T): void;
    private doScroll;
    /**
     * Resets the highlighter
     */
    reset(): void;
}
