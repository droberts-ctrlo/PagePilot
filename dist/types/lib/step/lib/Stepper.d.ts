import Step from './Step';
/**
 * A class to manage a set of steps
 * @param rootElement The root element of the stepper
 * @param steps The steps to manage
 * @template T The type of the root element
 */
export default class Stepper<T extends HTMLElement = HTMLElement> {
    private rootElement;
    private steps;
    private raiseEvent;
    getLastStep(): Step<T> | undefined;
    /**
     * The current active step
     */
    get activeStep(): Step<T> | undefined;
    /**
     * The current step count
     */
    get stepCount(): number;
    constructor(rootElement: HTMLElement, steps: Step<T>[]);
    /**
     * Move to the next step
     */
    next(): void;
    /**
     * Move to the previous step
     */
    previous(): void;
    /**
     * Finish the stepper
     */
    done(): void;
    /**
     * Reset the stepper
     */
    reset(): void;
}
