import { createValidationOfSchema } from "./builder"
import { DefaultMessage, Message } from "./message"
import { TypeOf } from "./real-types"
import { Schema } from "./schema-types"
import { ValidationError } from "./validation-error"

export function validate<T extends Schema>(
    schema: T,
    name: string,
    value: any,
    { messages = DefaultMessage }: validate.Options = {},
): asserts value is TypeOf<T> {
    const errors = createValidationOfSchema(schema)(name, value)
    if (errors.length > 0) {
        throw new ValidationError(messages, name, errors)
    }
}
export namespace validate {
    export type Options = {
        messages?: Message
    }
}
