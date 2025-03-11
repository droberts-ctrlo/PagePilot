import Step from './Step';

/**
 * A class to manage a set of steps
 * @param rootElement The root element of the stepper
 * @param steps The steps to manage
 * @template T The type of the root element
 */
export default class Stepper<T extends HTMLElement = HTMLElement> {
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

    constructor(private rootElement: T | HTMLElement, private steps: Step<T>[]) {
        if (!Array.isArray(steps)) throw new Error('Steps must be an array');
        if (steps.length === 0) throw new Error('No steps provided');
    }

    /**
     * Move to the next step
     */
    next() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        let nextStep = this.steps.find(step => step.number === activeStep.number + 1);
        if (!nextStep) {
            this.done();
            return;
        }
        if (nextStep.disabled) {
            nextStep = this.steps.find(step => step.number === activeStep.number + 2);
        }
        if (!nextStep) {
            this.done();
            return;
        }
        activeStep.element.dispatchEvent(new CustomEvent('next'));
        activeStep.active = false;
        nextStep.active = true;
    }

    /**
     * Move to the previous step
     */
    previous() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        const previousStep = this.steps.find(step => step.number === activeStep.number - 1);
        if (!previousStep) return;
        activeStep.element.dispatchEvent(new CustomEvent('previous'));
        activeStep.active = false;
        previousStep.active = true;
    }

    /**
     * Finish the stepper
     */
    done() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        activeStep.element.dispatchEvent(new CustomEvent('done'));
        this.rootElement.dispatchEvent(new CustomEvent('done'));
        activeStep.completed = true;
        activeStep.active = false;
    }
}
