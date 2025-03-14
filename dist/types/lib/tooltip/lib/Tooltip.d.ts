import { TooltipConfig } from './ToolTipConfig';
export default class Tooltip<T extends HTMLElement = HTMLElement> {
    private popover;
    constructor({ element, buttons, prefix }: TooltipConfig<T>);
    private createContent;
    private createButton;
    show(): void;
    hide(): void;
}
