import Step from './Step';
import { CommonOptions } from 'common/options';
/**
 * Parses an element into a step
 * @param element The element to parse
 * @param stepOptions The options for the step
 */
declare const _default: <T extends HTMLElement = HTMLElement>(element: T, stepOptions?: CommonOptions) => Step<T>;
export default _default;
