import { Tour } from './lib/tour';
import "bootstrap";

function createTour(triggerElement?: HTMLElement) {
    const elements = document.querySelectorAll('[data-pp-number]');
    if(elements.length === 0) return;
    const tourElements = Array.from(elements) as HTMLElement[];
    const tour = new Tour(tourElements);
    if(triggerElement) triggerElement.addEventListener('click', () => tour.start());
    return tour;
};

export default createTour;