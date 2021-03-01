export type HTMLInputEvent<T, U> = InputEvent & { target: T & { value: U } }

export type HTMLInputInputEvent<T> = HTMLInputEvent<HTMLInputElement, T>

export type HTMLSelectInputEvent<T> = HTMLInputEvent<HTMLSelectElement, T>
