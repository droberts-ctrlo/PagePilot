"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../tooltip/index.js");
const index_js_2 = require("../../step/index.js");
const index_js_3 = require("../../highlighter/index.js");
require("bootstrap");
/**
 * A class to create a tour
 */
class Tour {
    stepper;
    /**
     * Create a new tour
     * @param stepElements The elements to use as steps
     */
    constructor(stepElements) {
        const steps = this.createSteps(stepElements);
        const highlighter = new index_js_3.Highlight();
        const stepper = new index_js_2.Stepper(document.body, steps);
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
            const tooltip = new index_js_1.Tooltip(config);
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
        const steps = stepElements.map(stepElement => (0, index_js_2.StepParser)(stepElement, { prefix: 'pp' }));
        steps.sort(index_js_2.StepSorter);
        return steps;
    }
    /**
     * Start the tour
     */
    start() {
        this.stepper.next();
    }
}
exports.default = Tour;
