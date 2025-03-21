/**
 * TooltipButton interface for the tooltip button and their callbacks
 */
export default interface TooltipButton {
    /**
     * Any additional class names to add to the button
     */
    classNames?: string[];
    /**
     * The text to display on the button
     */
    text: string;
    /**
     * The callback to run when the button is clicked
     * 'hide' will hide the tooltip
     * 'show' will show the tooltip
     * A function will run the function
     */
    onClick: ((ev: Event) => void) | 'hide' | 'show';
}
