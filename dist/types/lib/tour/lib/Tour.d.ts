import 'bootstrap';
/**
 * A class to create a tour
 */
export default class Tour<T extends HTMLElement = HTMLElement> {
    private stepper;
    /**
     * Create a new tour
     * @param stepElements The elements to use as steps
     */
    constructor(stepElements: T[]);
    private setupStepsAndEvents;
    private createSteps;
    /**
     * Start the tour
     */
    start(): void;
}
