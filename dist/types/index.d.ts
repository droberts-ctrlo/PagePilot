import { Tour } from './lib/tour';
import 'bootstrap';
/**
 * Create a new tour object
 * @param triggerElement The element to trigger the tour from
 * @returns The tour object
 */
declare function createTour(triggerElement?: HTMLElement): Tour<HTMLElement> | undefined;
export default createTour;
