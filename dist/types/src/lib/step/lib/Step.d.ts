/**
 * Step interface
 * @template {HTMLElement} T The type of the root element
 * @property {T} element The element this step is attached to
 * @property {number} number The number of this step
 * @property {string} title The title of this step
 * @property {string} content The content of this step
 * @property {boolean} active Whether this step is active
 * @property {boolean} completed Whether this step is completed
 * @property {boolean} disabled Whether this step is disabled
 */
interface Step<T extends HTMLElement = HTMLElement> {
    element: T;
    number: number;
    title?: string;
    content?: string;
    active: boolean;
    completed: boolean;
    disabled: boolean;
}
export default Step;
