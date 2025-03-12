import {describe, it, expect} from '@jest/globals';
import Tooltip from './Tooltip';

// TODO: not sure what else to test here that isn't already part of Bootstrap
describe('Tooltip', () => {
    it('Should error if the element passed in is undefined', () => {
        //@ts-expect-error - Testing for error
        expect(() => new Tooltip(undefined)).toThrowError('Element not found');
    });

    it('Should error if the element passed in does not have a content attribute', () => {
        const element = document.createElement('div');
        expect(() => new Tooltip(element)).toThrowError('No content found on element');
    });

    it('Should create a new tooltip', () => {
        const element = document.createElement('div');
        element.dataset['ppContent'] = 'Content';
        const tooltip = new Tooltip(element);
        expect(tooltip).toBeInstanceOf(Tooltip);
    });
});