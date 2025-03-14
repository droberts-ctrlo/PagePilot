import { prefix } from 'common/constants';
import Step from './Step';
import { CommonOptions } from 'common/options';

/**
 * Parses an element into a step
 * @param element The element to parse
 * @param stepOptions The options for the step
 */
export default <T extends HTMLElement = HTMLElement>(element: T, stepOptions: CommonOptions = { prefix }) => {
    const data = element.dataset;
    const myPrefix = stepOptions.prefix;
    if (!data[`${myPrefix}Number`]) throw new Error('No number found on element');
    if (!data[`${myPrefix}Content`]) throw new Error('No content found on element');
    const step: Step<T> = {
        active: false,
        element,
        completed: false,
        content: data[`${myPrefix}Content`],
        disabled: data[`${myPrefix}Disabled`] === 'true',
        number: parseInt(data[`${myPrefix}Number`]!),
        title: data[`${myPrefix}Title`]
    };
    return step;
};
