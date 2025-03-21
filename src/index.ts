import { Tour } from './lib/tour/index.js';
import 'bootstrap';

/**
 * Create a new tour object
 * @param triggerElement The element to trigger the tour from
 * @returns The tour object
 */
function createTour(triggerElement?: HTMLElement) {
    const elements = document.querySelectorAll('[data-pp-number]');
    if (elements.length === 0) return;
    const tourElements = Array.from(elements) as HTMLElement[];
    const tour = new Tour(tourElements);
    if (triggerElement) triggerElement.addEventListener('click', () => tour.start());
    return tour;
};

export default createTour;
