import { describe, expect, it } from '@jest/globals';
import StepParser from './StepParser';

describe('StepParser', () => {
    it('errors if the element has no number', () => {
        const element = document.createElement('div');
        element.innerHTML = '<div class="step">Step 1</div>';
        expect(() => StepParser(element)).toThrow('No number found on element');
    });

    it('errors if the element has no content', () => {
        const element = document.createElement('div');
        element.dataset['ppNumber'] = '1';
        expect(() => StepParser(element)).toThrow('No content found on element');
    });

    it('parses the element with only content', () => {
        const element = document.createElement('div');
        element.dataset['ppNumber'] = '1';
        element.dataset['ppContent'] = 'Step 1';
        expect(StepParser(element)).toEqual({
            active: false,
            completed: false,
            content: 'Step 1',
            disabled: false,
            element,
            number: 1,
            title: undefined
        });
    });

    it('parses the element with a custom prefix and only content', () => {
        const options = { prefix: 'ls' };
        const element = document.createElement('div');
        element.dataset['lsNumber'] = '1';
        element.dataset['lsContent'] = 'Step 1';
        expect(StepParser(element, options)).toEqual({
            active: false,
            completed: false,
            content: 'Step 1',
            disabled: false,
            element,
            number: 1,
            title: undefined
        });
    });

    it('parses the element with content and title', () => {
        const element = document.createElement('div');
        element.dataset['ppNumber'] = '1';
        element.dataset['ppContent'] = 'Step 1';
        element.dataset['ppTitle'] = 'Title 1';
        expect(StepParser(element)).toEqual({
            active: false,
            completed: false,
            content: 'Step 1',
            disabled: false,
            element,
            number: 1,
            title: 'Title 1'
        });
    });

    it('parses the element with content, title, and disabled', () => {
        const element = document.createElement('div');
        element.dataset['ppNumber'] = '1';
        element.dataset['ppContent'] = 'Step 1';
        element.dataset['ppTitle'] = 'Title 1';
        element.dataset['ppDisabled'] = 'true';
        expect(StepParser(element)).toEqual({
            active: false,
            completed: false,
            content: 'Step 1',
            disabled: true,
            element,
            number: 1,
            title: 'Title 1'
        });
    });

    it('parses the element with a different element type', () => {
        const element = document.createElement('li');
        element.dataset['ppNumber'] = '1';
        element.dataset['ppContent'] = 'Step 1';
        const result = StepParser(element);
        expect(result).toEqual({
            active: false,
            completed: false,
            content: 'Step 1',
            disabled: false,
            element,
            number: 1,
            title: undefined
        });
        expect(element).toBeInstanceOf(HTMLLIElement);
        expect(result.element).toBeInstanceOf(HTMLLIElement);
    });
});
