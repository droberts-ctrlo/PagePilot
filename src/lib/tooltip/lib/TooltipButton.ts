export default interface TooltipButton {
    classNames?: string[]
    text: string
    onClick: ((ev: Event) => void) | 'hide' | 'show'
}
