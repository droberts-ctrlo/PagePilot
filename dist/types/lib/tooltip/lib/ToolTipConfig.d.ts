import { CommonOptions } from '../../common/options';
import TooltipButton from './TooltipButton';
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
