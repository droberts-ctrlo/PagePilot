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
    /**
     * Get the first step that is not disabled
     * @returns The last step that is not disabled
     */
    getLastStep(): Step<T> | undefined;
    /**
     * The current active step
     */
    get activeStep(): Step<T> | undefined;
    /**
     * The current step count
     */
    get stepCount(): number;
    /**
     * Create a new Stepper
     * @param rootElement The root element of the stepper
     * @param steps The steps to manage
     */
    constructor(rootElement: HTMLElement, steps: Step<T>[]);
    /**
     * Move to the next step if there is one available
     */
    next(): void;
    /**
     * Move to the previous step if there is one available
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
