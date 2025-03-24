import { TooltipConfig } from './ToolTipConfig.js';
/**
 * A class to create a tooltip
 */
export default class Tooltip<T extends HTMLElement = HTMLElement> {
    private popover;
    /**
     * Create a new tooltip
     * @param config The tooltip configuration
     */
    constructor({ element, buttons, prefix }: TooltipConfig<T>);
    private createContent;
    private createButton;
    /**
     * Show the tooltip
     */
    show(): void;
    /**
     * Hide the tooltip
     */
    hide(): void;
}
