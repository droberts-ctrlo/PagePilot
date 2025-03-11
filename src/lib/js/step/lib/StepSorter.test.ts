import { describe, it, expect } from '@jest/globals';
import StepSorter from './StepSorter';
import Step from './Step';

describe('StepSorter', () => {
    it('should sort steps by number', () => {
        const base: Step = {
            number: 1,
            element: document.createElement('div'),
            content: 'This is step 1',
            active: true,
            completed: false,
            disabled: false
        };
        const steps: Step[] = [
            { ...base, number: 3 },
            { ...base, number: 1 },
            { ...base, number: 2 }
        ];
        const sorted = steps.sort(StepSorter);
        expect(sorted[0].number).toBe(1);
        expect(sorted[1].number).toBe(2);
        expect(sorted[2].number).toBe(3);
    });
});
