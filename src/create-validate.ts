import { createValidationOfSchema } from "./builder"
import { DefaultMessage, Message } from "./message"
import { TypeOf } from "./real-types"
import { Schema } from "./schema-types"
import { ValidationError } from "./validation-error"

/**
 * The type of validation functions.
 *
 * The validation function has two parameters.
 * - `value` ... The value to validate.
 * - `options` ... Optional. The options.
 *
 * If the `value` passed the validation, the `value` gets the specific type that
 * is computed from the schema `T`. Otherwise, the validation function throws a
 * validation error.
 */
export type Validate<T extends Schema> = (
    value: any,
    options?: Validate.Options,
) => asserts value is TypeOf<T>

export namespace Validate {
    /**
     * The options of validation functions.
     */
    export type Options = {
        /**
         * The error message generator.
         */
        messages?: Message
        /**
         * The name of the target value.
         * This will be used in error messages.
         */
        name?: string
    }
}

/**
 * Compile the validation function of a schema object.
 *
 * Once compiled, it validates values efficiently.
 *
 * The validation code is cached for each schema object into a `WeakMap` object.
 * When GC collected the schema object, the validation code of that is abandoned
 * together.
 *
 * @param schema The schema of the validation.
 * @param options The options.
 * @returns The validation function of the schema.
 */
export function createValidation<T extends Schema>(
    schema: T,
    { defaultMessages = DefaultMessage }: createValidation.Options = {},
): Validate<T> {
    const validateFn = createValidationOfSchema(schema)
    return function validate(
        value,
        { messages = defaultMessages, name = "value" } = {},
    ) {
        const errors = validateFn(name, value)
        if (errors.length > 0) {
            throw new ValidationError(messages, name, errors)
        }
    }
}

export namespace createValidation {
    /**
     * The options of validation function compilation.
     */
    export type Options = {
        /**
         * The error message generator.
         */
        defaultMessages?: Message
    }
}
