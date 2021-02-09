import { createValidationOfSchema } from "./builder"
import { DefaultMessage, Message } from "./message"
import { TypeOf } from "./real-types"
import { Schema } from "./schema-types"
import { ValidationError } from "./validation-error"

export type Validate<T extends Schema> = (
    name: string,
    value: any,
) => asserts value is TypeOf<T>

export function createValidation<T extends Schema>(
    schema: T,
    { messages = DefaultMessage }: createValidation.Options = {},
): Validate<T> {
    const validate = createValidationOfSchema(schema)
    return (name, value) => {
        const errors = validate(name, value)
        if (errors.length > 0) {
            throw new ValidationError(messages, name, errors)
        }
    }
}
export namespace createValidation {
    export type Options = {
        messages?: Message
    }
}
