import { Tour } from './lib/tour';
import './css/index.scss';
import "bootstrap";

(()=>{
    const elements = document.querySelectorAll('[data-pp-number]');
    if(elements.entries.length === 0) return;
    const tourElements = Array.from(elements) as HTMLElement[];
    const tour = new Tour(tourElements)
    const tourButton = document.getElementById('tour-button');
    tourButton?.addEventListener('click', () => {
        tour.start();
    });
})();
