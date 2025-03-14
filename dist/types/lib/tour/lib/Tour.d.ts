import 'bootstrap';
export default class Tour<T extends HTMLElement = HTMLElement> {
    private stepper;
    constructor(stepElements: T[]);
    private setupStepsAndEvents;
    private createSteps;
    start(): void;
}
