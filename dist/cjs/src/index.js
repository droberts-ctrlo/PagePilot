"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./lib/tour/index.js");
require("bootstrap");
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
    const tour = new index_js_1.Tour(tourElements);
    if (triggerElement)
        triggerElement.addEventListener('click', () => tour.start());
    return tour;
}
;
exports.default = createTour;
