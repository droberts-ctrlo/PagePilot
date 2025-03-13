import { Tooltip } from "../../tooltip";
import { Step, StepParser, Stepper, StepSorter } from "../../step";
import Highlighter from "lib/highlighter/lib/Highlight";

export default class Tour<T extends HTMLElement = HTMLElement> {
    stepper: Stepper<T>;

    constructor(stepElements: T[]) {
        const steps = this.createSteps(stepElements);
        const highlighter = new Highlighter();
        steps.forEach(step => {
            const config = {
                element: step.element,
                buttons: [],
                prefix: 'pp'
            }
            new Tooltip(config);
        });
        document.body.addEventListener('stepper.start', ()=>{
            highlighter.highlight(this.stepper.activeStep!.element);
        });
        this.stepper = new Stepper(document.body, steps);
    }

    private createSteps(stepElements: T[]): Step<T>[] {
        const steps = stepElements.map(stepElement => StepParser(stepElement, { prefix: 'pp' }));
        steps.sort(StepSorter);
        return steps;
    }

    start() {
        this.stepper.next();
    }
}