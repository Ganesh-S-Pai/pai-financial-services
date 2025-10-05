export interface ToastItem {
    id?: number,
    message: string,
    color: string,
    timeout?: number,
    top?: boolean,
    bottom?: boolean,
    left?: boolean,
    right?: boolean,
    show?: boolean
}