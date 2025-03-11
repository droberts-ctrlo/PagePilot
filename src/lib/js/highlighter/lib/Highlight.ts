export default class Highlighter {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    fade: HTMLDivElement;
    helperLayer: HTMLDivElement;

    constructor() {
        const fade = document.createElement('div');
        fade.id = 'background-fade';
        fade.style.display = 'none';
        this.fade = fade;
        document.body.appendChild(fade);
        const helperLayer = document.createElement('div');
        helperLayer.id = 'helper-layer';
        helperLayer.style.display = 'none';
        this.helperLayer = helperLayer;
        document.body.appendChild(helperLayer);
    }

    highlight<T extends HTMLElement = HTMLElement>(element: T) {
        if (!element) throw new Error('Element not found');
        const { x, y, width, height } = element.getBoundingClientRect();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.helperLayer.style.display = 'block';
        this.helperLayer.style.left = `${x - 10}px`;
        this.helperLayer.style.top = `${y - 10}px`;
        this.helperLayer.style.width = `${width + 20}px`;
        this.helperLayer.style.height = `${height + 20}px`;
        this.fade.style.display = '';
        if (!element.classList.contains('highlight')) {
            element.classList.add('highlight');
        }
    }

    reset() {
        this.helperLayer.style.display = 'none';
        this.fade.style.display = 'none';
        const highlighted = document.querySelector('.highlight');
        if (highlighted) {
            highlighted.classList.remove('highlight');
        }
    }
}
