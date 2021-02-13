import { Message } from "./message"

/**
 * Validation errors.
 */
export class ValidationError extends Error {
    /**
     * The errors.
     * Every error has `code` and `args`.
     */
    readonly errors: readonly ValidationError.ErrorInfo[]

    /**
     * Initialize this instance.
     * @param message The message generator.
     * @param name The target name.
     * @param errors The errors.
     */
    constructor(
        message: Message,
        name: string,
        errors: ValidationError.ErrorInfo[],
    ) {
        super(toMessage(message, name, errors))
        this.errors = errors
        ;(Error as any).captureStackTrace?.(this, ValidationError)
    }
}
export namespace ValidationError {
    /**
     * The error code.
     */
    export type ErrorCode = Exclude<keyof Message, "validation">
    /**
     * The pair of a error code and arguments.
     */
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
