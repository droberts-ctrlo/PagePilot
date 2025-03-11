import HighlightOptions from "./HighlighOptions";

/**
 * Highlighter class
 * @property {number} x - x coordinate of the element
 * @property {number} y - y coordinate of the element
 * @property {number} width - width of the element
 * @property {number} height - height of the element
 */
export default class Highlighter {
    private defaultX!: number;
    private defaultY!: number;
    private defaultWidth!: number;
    private defaultHeight!: number;

    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    private fade!: HTMLDivElement;
    private helperLayer!: HTMLDivElement;

    constructor(options: HighlightOptions = {}) {
        this.setDefaults(options);
        this.createFade();
        this.createHelperLayer();
    }

    private createFade() {
        const fade = document.createElement('div');
        fade.id = 'background-fade';
        fade.style.display = 'none';
        this.fade = fade;
        document.body.appendChild(fade);
    }

    private createHelperLayer() {
        const helperLayer = document.createElement('div');
        helperLayer.id = 'helper-layer';
        helperLayer.style.display = 'none';
        this.helperLayer = helperLayer;
        document.body.appendChild(helperLayer);
    }

    private setDefaults({ defaultHeight, defaultWidth, defaultX, defaultY }: HighlightOptions) {
        this.defaultX = defaultX || screen.width / 2;
        this.defaultY = defaultY || screen.height / 2;
        this.defaultWidth = defaultWidth || 1;
        this.defaultHeight = defaultHeight || 1;
    }

    private moveHelperLayer(x: number, y: number, width: number, height: number, defaultPlacement: boolean = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.helperLayer.style.display = 'block';
        this.helperLayer.style.left = `${x - (defaultPlacement ? 0 : 10)}px`;
        this.helperLayer.style.top = `${y - (defaultPlacement ? 0 : 10)}px`;
        this.helperLayer.style.width = `${width + (defaultPlacement ? 0 : 20)}px`;
        this.helperLayer.style.height = `${height + (defaultPlacement ? 0 : 20)}px`;
    }

    /**
     * Highlights an element
     * @template {HTMLElement} T The type of the element
     * @param element The element to highlight
     */
    highlight<T extends HTMLElement = HTMLElement>(element: T) {
        if (!element) throw new Error('Element not found');
        const { x, y, width, height } = element.getBoundingClientRect();
        this.moveHelperLayer(x, y, width, height);
        this.fade.style.display = '';
        if (!element.classList.contains('highlight')) {
            element.classList.add('highlight');
        }
    }

    /**
     * Resets the highlighter
     */
    reset() {
        this.moveHelperLayer(this.defaultX, this.defaultY, this.defaultWidth, this.defaultHeight, true);
        this.helperLayer.style.display = 'none';
        this.fade.style.display = 'none';
        const highlighted = document.querySelector('.highlight');
        if (highlighted) {
            highlighted.classList.remove('highlight');
        }
    }
}
