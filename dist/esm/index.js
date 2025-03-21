import { Tour } from './lib/tour';
import 'bootstrap';
/**
 * Create a new tour object
 * @param triggerElement The element to trigger the tour from
 * @returns The tour object
 */
function createTour(triggerElement) {
    const elements = document.querySelectorAll('[data-pp-number]');
    if (elements.length === 0)
        return;
    const tourElements = Array.from(elements);
    const tour = new Tour(tourElements);
    if (triggerElement)
        triggerElement.addEventListener('click', () => tour.start());
    return tour;
}
;
export default createTour;
