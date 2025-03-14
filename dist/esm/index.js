import { Tour } from 'tour';
import 'bootstrap';
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
