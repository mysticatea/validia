export type Equals<T, U> = [T] extends [U]
    ? [U] extends [T]
        ? true
        : false
    : false

export function assertType<T extends true>(): void {}
