import { Events } from './Events';
import Step from './Step';

/**
 * A class to manage a set of steps
 * @param rootElement The root element of the stepper
 * @param steps The steps to manage
 * @template T The type of the root element
 */
export default class Stepper<T extends HTMLElement = HTMLElement> {
    private raiseEvent(element: HTMLElement, event: Events) {
        element.dispatchEvent(new CustomEvent(event));
    }

    /**
     * Get the first step that is not disabled
     * @returns The last step that is not disabled
     */
    getLastStep() {
        if (this.steps.length == 0) return undefined;
        let last = this.steps[this.steps.length - 1];
        let decrement = 2;
        while (last.disabled && decrement <= this.steps.length) {
            last = this.steps[this.steps.length - decrement];
            decrement++;
        }
        return last;
    }

    /**
     * The current active step
     */
    get activeStep() {
        return this.steps.find(step => step.active);
    }

    /**
     * The current step count
     */
    get stepCount() {
        return this.steps.length;
    }

    /**
     * Create a new Stepper
     * @param rootElement The root element of the stepper
     * @param steps The steps to manage
     */
    constructor(private rootElement: HTMLElement, private steps: Step<T>[]) {
        if (!Array.isArray(steps)) throw new Error('Steps must be an array');
        if (steps.length === 0) throw new Error('No steps provided');
    }

    /**
     * Move to the next step if there is one available
     */
    next() {
        const activeStep = this.activeStep;
        if (!activeStep) {
            this.steps[0].active = true;
            this.raiseEvent(this.activeStep!.element, 'stepper.enter');
            return;
        }
        let nextStep = this.steps.find(step => step.number === activeStep.number + 1);
        if (!nextStep) {
            this.done();
            return;
        }
        let increment = 2;
        while (nextStep?.disabled == true) {
            nextStep = this.steps.find(step => step.number === activeStep.number + increment);
            increment++;
        }
        if (!nextStep) {
            this.done();
            return;
        }
        this.raiseEvent(activeStep.element, 'stepper.leave');
        this.raiseEvent(nextStep.element, 'stepper.enter');
        activeStep.active = false;
        nextStep.active = true;
    }

    /**
     * Move to the previous step if there is one available
     */
    previous() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        const previousStep = this.steps.find(step => step.number === activeStep.number - 1);
        if (!previousStep) return;
        this.raiseEvent(activeStep.element, 'stepper.leave');
        this.raiseEvent(previousStep.element, 'stepper.enter');
        activeStep.active = false;
        previousStep.active = true;
    }

    /**
     * Finish the stepper
     */
    done() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        this.raiseEvent(this.rootElement, 'stepper.done');
        this.raiseEvent(activeStep.element, 'stepper.leave');
        activeStep.completed = true;
        activeStep.active = false;
    }

    /**
     * Reset the stepper
     */
    reset() {
        this.steps.forEach((step) => {
            step.active = false;
            step.completed = false;
        });
    }
}
