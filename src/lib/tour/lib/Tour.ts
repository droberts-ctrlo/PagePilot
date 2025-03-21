import { Tooltip, TooltipButton } from '../../tooltip/index.js';
import { Step, StepParser, Stepper, StepSorter } from '../../step/index.js';
import { Highlight } from '../../highlighter/index.js';
import 'bootstrap';

/**
 * A class to create a tour
 */
export default class Tour<T extends HTMLElement = HTMLElement> {
    private stepper: Stepper<T>;

    /**
     * Create a new tour
     * @param stepElements The elements to use as steps
     */
    constructor(stepElements: T[]) {
        const steps = this.createSteps(stepElements);
        const highlighter = new Highlight();
        const stepper = new Stepper(document.body, steps);
        document.body.addEventListener('stepper.done', () => {
            highlighter.reset();
            stepper.reset();
        });
        this.setupStepsAndEvents(stepper, steps, highlighter);
        this.stepper = stepper;
    }

    private setupStepsAndEvents(stepper: Stepper, steps: Step<T>[], highlighter: Highlight) {
        steps.forEach((step, index) => {
            const buttons: TooltipButton[] = [];
            if (index !== 0)
                buttons.push(
                    {
                        text: 'Back',
                        onClick: () => stepper.previous()
                    }
                );
            const last = stepper.getLastStep() === step;
            if (last) {
                buttons.push({
                    text: 'Finish',
                    onClick: () => stepper.done()
                });
            } else {
                buttons.push({
                    text: 'Next',
                    onClick: () => stepper.next()
                });
            }
            const config = {
                element: step.element,
                buttons: buttons,
                prefix: 'pp'
            };
            const tooltip = new Tooltip(config);
            step.element.addEventListener('stepper.enter', () => {
                highlighter.highlight(step.element);
                tooltip.show();
            });
            step.element.addEventListener('stepper.leave', () => {
                highlighter.removeHighlight(step.element);
                tooltip.hide();
            });
        });
    }

    private createSteps(stepElements: T[]): Step<T>[] {
        const steps = stepElements.map(stepElement => StepParser(stepElement, { prefix: 'pp' }));
        steps.sort(StepSorter);
        return steps;
    }

    /**
     * Start the tour
     */
    start() {
        this.stepper.next();
    }
}
