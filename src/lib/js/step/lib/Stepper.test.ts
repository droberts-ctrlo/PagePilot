import { describe, expect, it, jest } from '@jest/globals';
import Step from './Step';
import Stepper from './Stepper';

describe('Stepper', () => {
    it('should create a stepper', () => {
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        expect(stepper).toBeInstanceOf(Stepper);
    });

    it('should throw an error if no steps are provided', () => {
        expect(() => new Stepper(document.createElement('div'), [])).toThrow('No steps provided');
    });

    it('should throw an error if steps is not an array', () => {
        // @ts-expect-error Testing invalid input
        expect(() => new Stepper(document.createElement('div'), { hello: 'world' })).toThrow('Steps must be an array');
    });

    it('should get the active step', () => {
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        expect(stepper.activeStep).toBe(steps[0]);
    });

    it('should get the step count', () => {
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            },
            {
                active: false,
                completed: false,
                content: 'This is step 2',
                disabled: false,
                element: document.createElement('div'),
                number: 2
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        expect(stepper.stepCount).toBe(2);
    });

    it('should go to the next step', () => {
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            },
            {
                active: false,
                completed: false,
                content: 'This is step 2',
                disabled: false,
                element: document.createElement('div'),
                number: 2
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.next();
        expect(steps[0].active).toBe(false);
        expect(steps[1].active).toBe(true);
    });

    it('should go to the previous step', () => {
        const steps: Step[] = [
            {
                active: false,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            },
            {
                active: true,
                completed: false,
                content: 'This is step 2',
                disabled: false,
                element: document.createElement('div'),
                number: 2
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.previous();
        expect(steps[0].active).toBe(true);
        expect(steps[1].active).toBe(false);
    });

    it('should mark the current step as completed', () => {
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.done();
        expect(steps[0].completed).toBe(true);
    });

    it('should not go to the previous step if there is no previous step', () => {
        const steps: Step[] = [
            {
                active: false,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.previous();
        expect(steps[0].active).toBe(false);
    });

    it('should not mark the current step as completed if there is no current step', () => {
        const steps: Step[] = [
            {
                active: false,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.done();
        expect(steps[0].completed).toBe(false);
    });

    it('should call the onNext callback when going to the next step', () => {
        const onNext = jest.fn();
        const stepElement = document.createElement('div');
        stepElement.addEventListener('stepper.next', onNext);
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: stepElement,
                number: 1
            },
            {
                active: false,
                completed: false,
                content: 'This is step 2',
                disabled: false,
                element: document.createElement('div'),
                number: 2
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.next();
        expect(onNext).toHaveBeenCalled();
    });

    it('should call the onPrev callback when going to the previous step', () => {
        const onPrev = jest.fn();
        const stepElement = document.createElement('div');
        stepElement.addEventListener('stepper.prev', onPrev);
        const steps: Step[] = [
            {
                active: false,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            },
            {
                active: true,
                completed: false,
                content: 'This is step 2',
                disabled: false,
                element: stepElement,
                number: 2
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.previous();
        expect(onPrev).toHaveBeenCalled();
    });

    it('should call the onDone callback when marking the final step as completed', () => {
        const onDone = jest.fn();
        const stepElement = document.createElement('div');
        stepElement.addEventListener('stepper.done', onDone);
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: stepElement,
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.done();
        expect(onDone).toHaveBeenCalled();
    });

    it('should not call the onNext callback when going to the next step if there is no next step', () => {
        const onNext = jest.fn();
        const stepElement = document.createElement('div');
        stepElement.addEventListener('stepper.next', onNext);
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: stepElement,
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.next();
        expect(onNext).not.toHaveBeenCalled();
    });

    it('should not call the onPrev callback when going to the previous step if there is no previous step', () => {
        const onPrev = jest.fn();
        const stepElement = document.createElement('div');
        stepElement.addEventListener('stepper.previous', onPrev);
        const steps: Step[] = [
            {
                active: false,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: stepElement,
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.previous();
        expect(onPrev).not.toHaveBeenCalled();
    });

    it('should not call the onDone callback when marking the final step as completed if there is no final step', () => {
        const onDone = jest.fn();
        const stepElement = document.createElement('div');
        stepElement.addEventListener('stepper.done', onDone);
        const steps: Step[] = [
            {
                active: false,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: stepElement,
                number: 1
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.done();
        expect(onDone).not.toHaveBeenCalled();
    });

    it('should call the onDone callback on the base element when the final step is completed', () => {
        const onDone = jest.fn();
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            }
        ];
        const el = document.createElement('div');
        el.addEventListener('stepper.baseDone', onDone);
        const stepper = new Stepper(el, steps);
        stepper.done();
        expect(onDone).toHaveBeenCalled();
    });

    it('should skip disabled steps when going to the next step', () => {
        const steps: Step[] = [
            {
                active: true,
                completed: false,
                content: 'This is step 1',
                disabled: false,
                element: document.createElement('div'),
                number: 1
            },
            {
                active: false,
                completed: false,
                content: 'This is step 2',
                disabled: true,
                element: document.createElement('div'),
                number: 2
            },
            {
                active: false,
                completed: false,
                content: 'This is step 3',
                disabled: false,
                element: document.createElement('div'),
                number: 3
            }
        ];
        const stepper = new Stepper(document.createElement('div'), steps);
        stepper.next();
        expect(steps[0].active).toBe(false);
        expect(steps[1].active).toBe(false);
        expect(steps[2].active).toBe(true);
    });
});
