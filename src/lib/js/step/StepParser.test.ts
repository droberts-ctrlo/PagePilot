import { describe, expect, it } from '@jest/globals';
import StepParser from './StepParser';
import StepOptions from './StepOptions';

describe('StepParser', () => {
    it('errors if the element has no number', () => {
        const element = document.createElement('div');
        element.innerHTML = '<div class="step">Step 1</div>';
        expect(() => StepParser(element)).toThrow('No number found on element');
    });

    it('errors if the element has no content', () => {
        const element = document.createElement('div');
        element.dataset['pp_number'] = '1';
        expect(() => StepParser(element)).toThrow('No content found on element');
    });

    it('parses the element with only content', () => {
        const element = document.createElement('div');
        element.dataset['pp_number'] = '1';
        element.dataset['pp_content'] = 'Step 1';
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
        const options: StepOptions = { prefix: 'ls_' };
        const element = document.createElement('div');
        element.dataset['ls_number'] = '1';
        element.dataset['ls_content'] = 'Step 1';
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
        element.dataset['pp_number'] = '1';
        element.dataset['pp_content'] = 'Step 1';
        element.dataset['pp_title'] = 'Title 1';
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
        element.dataset['pp_number'] = '1';
        element.dataset['pp_content'] = 'Step 1';
        element.dataset['pp_title'] = 'Title 1';
        element.dataset['pp_disabled'] = 'true';
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
        element.dataset['pp_number'] = '1';
        element.dataset['pp_content'] = 'Step 1';
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
