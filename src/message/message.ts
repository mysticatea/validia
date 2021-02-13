import { Schema } from "../schema-types"

/**
 * The message generator.
 *
 * You can implement this interface to generate your own error messages.
 *
 * The default implementation is {@link DefaultMessage}.
 */
export interface Message {
    /**
     * Get the error message that a value is expected to be an array but wasn't.
     * @param args The arguments of this error.
     */
    array(args: { name: string }): string

    /**
     * Get the error message that the length of arrays was greater than the maximum value.
     * @param args The arguments of this error.
     */
    arrayMaxLength(args: { name: string; maxLength: number }): string

    /**
     * Get the error message that the length of arrays was less than the minimum value.
     * @param args The arguments of this error.
     */
    arrayMinLength(args: { name: string; minLength: number }): string

    /**
     * Get the error message that an array is expected to not contain duplicated values but wasn't.
     * @param args The arguments of this error.
     */
    arrayUnique(args: { name: string }): string

    /**
     * Get the error message that a value is expected to be a bigint value but wasn't.
     * @param args The arguments of this error.
     */
    bigint(args: { name: string }): string

    /**
     * Get the error message that a bigint value was greater than the maximum value.
     * @param args The arguments of this error.
     */
    bigintMaxValue(args: { name: string; maxValue: bigint }): string

    /**
     * Get the error message that a bigint value was less than the minimum value.
     * @param args The arguments of this error.
     */
    bigintMinValue(args: { name: string; minValue: bigint }): string

    /**
     * Get the error message that a value is expected to be a boolean value but wasn't.
     * @param args The arguments of this error.
     */
    boolean(args: { name: string }): string

    /**
     * Get the error message that a value is expected to be an instance of a specific class but wasn't.
     * @param args The arguments of this error.
     */
    class(args: { name: string; constructor: Function }): string

    /**
     * Get the error message that a value failed a specific user-defined check.
     * @param args The arguments of this error.
     */
    custom(args: {
        name: string
        checkFunc: Function
        checkName: string
    }): string

    /**
     * Get the error message that a value is expected to be any of the specific values but wasn't.
     * @param args The arguments of this error.
     */
    enum(args: { name: string; values: readonly any[] }): string

    /**
     * Get the error message that a value is expected to be a function but wasn't.
     * @param args The arguments of this error.
     */
    function(args: { name: string }): string

    /**
     * Get the error message that a value is expected to be a number but wasn't.
     * @param args The arguments of this error.
     */
    number(args: { name: string }): string

    /**
     * Get the error message that a value was unexpected infinity.
     * @param args The arguments of this error.
     */
    numberDisallowInfinity(args: { name: string }): string

    /**
     * Get the error message that a value was unexpected `NaN`.
     * @param args The arguments of this error.
     */
    numberDisallowNaN(args: { name: string }): string

    /**
     * Get the error message that a value is expected to be an integer but wasn't.
     * @param args The arguments of this error.
     */
    numberIntOnly(args: { name: string }): string

    /**
     * Get the error message that a number was greater than the maximum value.
     * @param args The arguments of this error.
     */
    numberMaxValue(args: { name: string; maxValue: number }): string

    /**
     * Get the error message that a number was less than the minimum value.
     * @param args The arguments of this error.
     */
    numberMinValue(args: { name: string; minValue: number }): string

    /**
     * Get the error message that a value is expected to be an object instance but wasn't.
     * @param args The arguments of this error.
     */
    object(args: { name: string }): string

    /**
     * Get the error message that an object instance was lacking the required properties.
     * @param args The arguments of this error.
     */
    objectRequiredKeys(args: { name: string; keys: readonly string[] }): string

    /**
     * Get the error message that an object instance was having extra properties.
     * @param args The arguments of this error.
     */
    objectUnknownKeys(args: { name: string; keys: readonly string[] }): string

    /**
     * Get the error message that a value is expected to be a string but wasn't.
     * @param args The arguments of this error.
     */
    string(args: { name: string }): string

    /**
     * Get the error message that the length of strings was greater than the maximum value.
     * @param args The arguments of this error.
     */
    stringMaxLength(args: { name: string; maxLength: number }): string

    /**
     * Get the error message that the length of strings was less than the minimum value.
     * @param args The arguments of this error.
     */
    stringMinLength(args: { name: string; minLength: number }): string

    /**
     * Get the error message that a string didn't match with a specific pattern.
     * @param args The arguments of this error.
     */
    stringPattern(args: { name: string; pattern: RegExp }): string

    /**
     * Get the error message that a value is expected to be a symbol but wasn't.
     * @param args The arguments of this error.
     */
    symbol(args: { name: string }): string

    /**
     * Get the error message that a value is expected to be a tuple instance but wasn't.
     * @param args The arguments of this error.
     */
    tuple(args: { name: string }): string

    /**
     * Get the error message that the length of tuples didn't match.
     * @param args The arguments of this error.
     */
    tupleLength(args: { name: string; length: number }): string

    /**
     * Get the error message that a value is expected to be any of the specific values but wasn't.
     * @param args The arguments of this error.
     */
    union(args: {
        name: string
        schemas: readonly Exclude<Schema, Schema.Any | Schema.Union<any>>[]
    }): string

    /**
     * Get the error message that a value had one or more validation errors.
     * @param args The arguments of this error.
     */
    validation(args: { name: string; errors: readonly string[] }): string
}
