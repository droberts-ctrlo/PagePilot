import Step from './Step';

export default class Stepper<T extends HTMLElement = HTMLElement> {
    get activeStep() {
        return this.steps.find(step => step.active);
    }

    get stepCount() {
        return this.steps.length;
    }

    constructor(private rootElement: T | HTMLElement, private steps: Step<T>[]) {
        if (!Array.isArray(steps)) throw new Error('Steps must be an array');
        if (steps.length === 0) throw new Error('No steps provided');
    }

    next() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        const nextStep = this.steps.find(step => step.number === activeStep.number + 1);
        if (!nextStep) {
            this.done();
            return;
        }
        activeStep.element.dispatchEvent(new CustomEvent('next'));
        activeStep.active = false;
        nextStep.active = true;
    }

    previous() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        const previousStep = this.steps.find(step => step.number === activeStep.number - 1);
        if (!previousStep) return;
        activeStep.element.dispatchEvent(new CustomEvent('previous'));
        activeStep.active = false;
        previousStep.active = true;
    }

    done() {
        const activeStep = this.activeStep;
        if (!activeStep) return;
        activeStep.element.dispatchEvent(new CustomEvent('done'));
        this.rootElement.dispatchEvent(new CustomEvent('done'));
        activeStep.completed = true;
        activeStep.active = false;
    }
}
