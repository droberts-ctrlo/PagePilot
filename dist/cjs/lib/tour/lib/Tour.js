import { Tooltip } from 'tooltip';
import { StepParser, Stepper, StepSorter } from 'step';
import { Highlight } from 'highlighter';
import 'bootstrap';
export default class Tour {
    stepper;
    constructor(stepElements) {
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
    setupStepsAndEvents(stepper, steps, highlighter) {
        steps.forEach((step, index) => {
            const buttons = [];
            if (index !== 0)
                buttons.push({
                    text: 'Back',
                    onClick: () => stepper.previous()
                });
            const last = stepper.getLastStep() === step;
            if (last) {
                buttons.push({
                    text: 'Finish',
                    onClick: () => stepper.done()
                });
            }
            else {
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
    createSteps(stepElements) {
        const steps = stepElements.map(stepElement => StepParser(stepElement, { prefix: 'pp' }));
        steps.sort(StepSorter);
        return steps;
    }
    start() {
        this.stepper.next();
    }
}
