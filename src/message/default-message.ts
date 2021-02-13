import { Schema } from "../schema-types"
import { Message } from "./message"

/**
 * The default error message generator.
 */
export const DefaultMessage: Message = {
    array: ({ name }) => `"${name}" must be an array.`,
    arrayMaxLength({ name, maxLength }) {
        const length = plural(maxLength, "item")
        return `"${name}" must contain less than or equal to ${length}.`
    },
    arrayMinLength: ({ name, minLength }) =>
        minLength === 1
            ? `"${name}" must not be empty.`
            : `"${name}" must contain more than or equal to ${minLength} items.`,
    arrayUnique: ({ name }) => `"${name}" must not contain duplicate values.`,
    bigint: ({ name }) => `"${name}" must be a bigint value.`,
    bigintMaxValue: ({ name, maxValue }) =>
        `"${name}" must be less than or equal to ${maxValue}n.`,
    bigintMinValue: ({ name, minValue }) =>
        `"${name}" must be greater than or equal to ${minValue}n.`,
    boolean: ({ name }) => `"${name}" must be a boolean value.`,
    class: ({ name, constructor: ctor }) =>
        `"${name}" must be an instance of ${ctor.name || "Anonymous class"}.`,
    custom: ({ name, checkName }) => `"${name}" must be ${checkName}.`,
    enum({ name, values }) {
        const options = values.map(valueToString).filter(isNotDuplicateValue)
        if (options.length <= 2) {
            return `"${name}" must be ${listToString(options, "or")}.`
        }
        return `"${name}" must be any of ${listToString(options, "and")}.`
    },
    function: ({ name }) => `"${name}" must be a function.`,
    number: ({ name }) => `"${name}" must be a number.`,
    numberDisallowInfinity: ({ name }) => `"${name}" must not be Infinity.`,
    numberDisallowNaN: ({ name }) => `"${name}" must not be NaN.`,
    numberIntOnly: ({ name }) => `"${name}" must be an integer.`,
    numberMaxValue: ({ name, maxValue }) =>
        `"${name}" must be less than or equal to ${maxValue}.`,
    numberMinValue: ({ name, minValue }) =>
        `"${name}" must be greater than or equal to ${minValue}.`,
    object: ({ name }) => `"${name}" must be an object.`,
    objectRequiredKeys: ({ name, keys }) =>
        keys.length === 1
            ? `"${name}" must have the required property: ${keys[0]}.`
            : `"${name}" must have the required properties: ${keys.join(",")}.`,
    objectUnknownKeys: ({ name, keys }) =>
        keys.length === 1
            ? `"${name}" must not have unknown property: ${keys[0]}.`
            : `"${name}" must not have unknown properties: ${keys.join(",")}.`,
    string: ({ name }) => `"${name}" must be a string.`,
    stringMaxLength({ name, maxLength }) {
        const length = plural(maxLength, "character")
        return `"${name}" must be less than or equal to ${length}.`
    },
    stringMinLength: ({ name, minLength }) =>
        minLength === 1
            ? `"${name}" must not be empty.`
            : `"${name}" must be more than or equal to ${minLength} characters.`,
    stringPattern: ({ name, pattern }) =>
        `"${name}" must match the pattern ${pattern}.`,
    symbol: ({ name }) => `"${name}" must be a symbol.`,
    tuple: ({ name }) => `"${name}" must be a tuple.`,
    tupleLength: ({ name, length }) =>
        `"${name}" must contain exactly ${plural(length, "item")}.`,
    union({ name, schemas }) {
        const options = ([] as string[])
            .concat(...schemas.map(schemaToString))
            .filter(isNotDuplicateValue)
        return options.length === 2
            ? `"${name}" must be ${listToString(options, "or")}.`
            : `"${name}" must be any of ${listToString(options, "and")}.`
    },
    validation({ name, errors }) {
        if (errors.length === 1) {
            return errors[0]
        }
        return `"${name}" has ${errors.length} validation errors:\n${errors
            .map(e => `- ${e}`)
            .join("\n")}`
    },
}

function valueToString(value: any): string {
    switch (typeof value) {
        case "bigint":
            return `${value}n`
        case "function":
            return `[function ${value.name || "(anonymous)"}]`
        case "string":
            return JSON.stringify(value)
        default:
            return String(value)
    }
}

function schemaToString(
    schema: Exclude<Schema, Schema.Any | Schema.Union<any>>,
): string | string[] {
    switch (schema.type) {
        case "array":
            return "an array"
        case "bigint":
            return "a bigint value"
        case "boolean":
            return "a boolean value"
        case "class":
            return `a ${schema.constructor.name} instance`
        case "custom":
            return schema.name
        case "enum":
            return schema.values.map(valueToString)
        case "function":
            return "a function"
        case "number":
            return "a number"
        case "object":
        case "record":
            return "an object"
        case "string":
            return "a string"
        case "symbol":
            return "a symbol"
        case "tuple":
            return "a tuple"

        //istanbul ignore next
        default:
            return "an unknown value"
    }
}

function listToString(xs: readonly string[], kind: "and" | "or"): string {
    if (xs.length <= 2) {
        return xs.join(` ${kind} `)
    }

    const ys = [...xs]
    const last = ys.pop()
    return `${ys.join(", ")}, ${kind} ${last}`
}

function plural(n: number, unit: string): string {
    return `${n} ${unit}${n === 1 ? "" : "s"}`
}

function isNotDuplicateValue(x: string, i: number, xs: string[]): boolean {
    for (let j = 0; j < i; ++j) {
        if (x === xs[j]) {
            return false
        }
    }
    return true
}
