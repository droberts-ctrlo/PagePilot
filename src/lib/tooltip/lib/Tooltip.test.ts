import {describe, it, expect} from '@jest/globals';
import Tooltip from './Tooltip';
import { TooltipConfig } from './ToolTipConfig';

// TODO: not sure what else to test here that isn't already part of Bootstrap
describe('Tooltip', () => {
    it('Should error if the element passed in is undefined', () => {
        const config:TooltipConfig = {
            //@ts-expect-error - Testing for error
            element: undefined,
            buttons: [],
            prefix: 'pp'
        };
        expect(() => new Tooltip(config)).toThrowError('Element not found');
    });

    it('Should error if the element passed in does not have a content attribute', () => {
        const element = document.createElement('div');
        const config:TooltipConfig = {
            element,
            buttons: [],
            prefix: 'pp'
        }
        expect(() => new Tooltip(config)).toThrowError('No content found on element');
    });

    it('Should create a new tooltip', () => {
        const element = document.createElement('div');
        element.dataset['ppContent'] = 'Content';
        const config:TooltipConfig = {
            element,
            buttons: [],
            prefix: 'pp'
        }
        const tooltip = new Tooltip(config);
        expect(tooltip).toBeInstanceOf(Tooltip);
    });
});