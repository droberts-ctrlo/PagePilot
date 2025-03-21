import { CommonOptions } from '../../common/options.js';
import TooltipButton from './TooltipButton.js';
/**
 * Tooltip configuration
 */
export interface TooltipConfig<T extends HTMLElement = HTMLElement> extends CommonOptions {
    /**
     * The element to attach the tooltip to
     */
    element: T;
    /**
     * The buttons to show in the tooltip
     */
    buttons: TooltipButton[];
}
