import Step from './Step.js';

/**
 * Sorts steps by their number
 * @param a The first step
 * @param b The second step
 */
export default (a: Step, b: Step) => {
    return a.number - b.number;
};
