import { Message } from "./message"

export class ValidationError extends Error {
    readonly errors: readonly ValidationError.ErrorInfo[]

    constructor(
        message: Message,
        name: string,
        errors: ValidationError.ErrorInfo[],
    ) {
        super(toMessage(message, name, errors))
        this.errors = errors
        Error.captureStackTrace?.(this, ValidationError)
    }
}
export namespace ValidationError {
    export type ErrorCode = Exclude<keyof Message, "validation">
    export type ErrorInfo = {
        [P in ErrorCode]: {
            code: P
            args: Parameters<Message[P]>[0]
            depth: number
        }
    }[ErrorCode]
}

function toMessage(
    message: Message,
    name: string,
    errors: ValidationError.ErrorInfo[],
): string {
    return message.validation({
        name,
        errors: errors.map(e => message[e.code](e.args as any)),
    })
}
