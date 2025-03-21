"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("bootstrap");
const constants_js_1 = require("../../common/constants.js");
/**
 * A class to create a tooltip
 */
class Tooltip {
    popover;
    /**
     * Create a new tooltip
     * @param config The tooltip configuration
     */
    constructor({ element, buttons, prefix = constants_js_1.prefix }) {
        if (!element)
            throw new Error('Element not found');
        const data = element.dataset;
        if (!data[`${prefix}Content`])
            throw new Error('No content found on element');
        this.popover = new bootstrap_1.Popover(element, {
            title: data[`${prefix}Title`] ?? '',
            content: this.createContent(data[`${prefix}Content`], ...buttons),
            html: true,
            trigger: 'manual',
            placement: 'bottom'
        });
    }
    createContent(content, ...buttons) {
        const div = document.createElement('div');
        div.textContent = content;
        div.classList.add('tooltip-content');
        if (buttons && buttons.length) {
            const footerDiv = document.createElement('div');
            footerDiv.classList.add('tooltip-footer');
            buttons.forEach((button) => {
                footerDiv.appendChild(this.createButton(button));
            });
            div.appendChild(footerDiv);
        }
        return div;
    }
    createButton({ text, onClick, classNames }) {
        const button = document.createElement('button');
        button.textContent = text;
        button.type = 'button';
        button.classList.add(`tooltip-button`);
        button.classList.add('btn');
        button.classList.add('btn-sm');
        if (!classNames || classNames.length == 0)
            button.classList.add('btn-primary');
        else
            button.classList.add(...classNames);
        if (onClick == 'hide') {
            button.addEventListener('click', () => this.popover.hide());
        }
        else if (onClick == 'show') {
            button.addEventListener('click', () => this.popover.show());
        }
        else
            button.addEventListener('click', onClick);
        return button;
    }
    /**
     * Show the tooltip
     */
    show() {
        this.popover.show();
    }
    /**
     * Hide the tooltip
     */
    hide() {
        this.popover.hide();
    }
}
exports.default = Tooltip;
