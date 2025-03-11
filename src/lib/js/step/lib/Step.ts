interface Step<T extends HTMLElement = HTMLElement> {
    element: T
    number: number
    title?: string
    content?: string | HTMLElement
    active: boolean
    completed: boolean
    disabled: boolean
}

export default Step;
