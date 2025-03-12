import { CommonOptions } from "lib/common/options";
import TooltipButton from "./TooltipButton";

export interface TooltipConfig<T extends HTMLElement = HTMLElement> extends CommonOptions {
    element: T,
    buttons: TooltipButton[]
}