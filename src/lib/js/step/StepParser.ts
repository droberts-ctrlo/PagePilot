import { prefix } from '../common/constants';
import Step from './Step';
import StepOptions from './StepOptions';

export default <T extends HTMLElement = HTMLElement>(element: T, stepOptions: StepOptions = { prefix }) => {
    const data = element.dataset;
    const myPrefix = stepOptions.prefix;
    if (!data[myPrefix + 'number']) throw new Error('No number found on element');
    if (!data[myPrefix + 'content']) throw new Error('No content found on element');
    const step: Step<T> = {
        active: false,
        element,
        completed: false,
        content: data[myPrefix + 'content'],
        disabled: data[myPrefix + 'disabled'] === 'true',
        number: parseInt(data[myPrefix + 'number']!),
        title: data[myPrefix + 'title']
    };
    return step;
};
