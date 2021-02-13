import { createValidationOfSchema } from "./builder"
import { DefaultMessage, Message } from "./message"
import { TypeOf } from "./real-types"
import { Schema } from "./schema-types"
import { ValidationError } from "./validation-error"

/**
 * Validate a value by a given schema.
 *
 * If the `value` passed the validation, the `value` gets the specific type that
 * is computed from the schema type `T`. Otherwise, the validation function
 * throws a validation error.
 *
 * The validation code is cached for each schema object into a `WeakMap` object.
 * When GC collected the schema object, the validation code of that is abandoned
 * together.
 *
 * The {@link createValidation} function creates the validation function of
 * schemas to validate values efficiently. Consider using that if you planned to
 * validate values many times.
 *
 * @param schema The schema of the validation.
 * @param value The value to validate.
 * @param options Optional. The options.
 * @throws {@link ValidationError} Thrown if the `value` didn't pass the
 * validation.
 */
export function validate<T extends Schema>(
    schema: T,
    value: any,
    { messages = DefaultMessage, name = "value" }: validate.Options = {},
): asserts value is TypeOf<T> {
    const errors = createValidationOfSchema(schema)(name, value)
    if (errors.length > 0) {
        throw new ValidationError(messages, name, errors)
    }
}

export namespace validate {
    /**
     * The options of validation.
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
