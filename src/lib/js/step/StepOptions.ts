export default interface StepOptions {
    prefix?: string
    onNext?: () => void
    onPrev?: () => void
    onFinish?: () => void
    onSkip?: () => void
    onDone?: () => void
}
