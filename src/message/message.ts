import { Schema } from "../schema-types"

export interface Message {
    array(vars: { name: string }): string
    arrayMaxLength(vars: { name: string; maxLength: number }): string
    arrayMinLength(vars: { name: string; minLength: number }): string
    arrayUnique(vars: { name: string }): string
    bigint(vars: { name: string }): string
    bigintMaxValue(vars: { name: string; maxValue: bigint }): string
    bigintMinValue(vars: { name: string; minValue: bigint }): string
    boolean(vars: { name: string }): string
    class(vars: { name: string; constructor: Function }): string
    custom(vars: {
        name: string
        checkFunc: Function
        checkName: string
    }): string
    enum(vars: { name: string; values: readonly any[] }): string
    function(vars: { name: string }): string
    number(vars: { name: string }): string
    numberDisallowInfinity(vars: { name: string }): string
    numberDisallowNaN(vars: { name: string }): string
    numberIntOnly(vars: { name: string }): string
    numberMaxValue(vars: { name: string; maxValue: number }): string
    numberMinValue(vars: { name: string; minValue: number }): string
    object(vars: { name: string }): string
    objectRequiredKeys(vars: { name: string; keys: readonly string[] }): string
    objectUnknownKeys(vars: { name: string; keys: readonly string[] }): string
    string(vars: { name: string }): string
    stringMaxLength(vars: { name: string; maxLength: number }): string
    stringMinLength(vars: { name: string; minLength: number }): string
    stringPattern(vars: { name: string; pattern: RegExp }): string
    symbol(vars: { name: string }): string
    tuple(vars: { name: string }): string
    tupleLength(vars: { name: string; length: number }): string
    union(vars: {
        name: string
        schemas: readonly Exclude<
            Schema,
            Schema.AnySchema | Schema.UnionSchema<any>
        >[]
    }): string
    validation(vars: { name: string; errors: readonly string[] }): string
}
