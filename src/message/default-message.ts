import { Schema } from "../schema-types"
import { Message } from "./message"

export const DefaultMessage: Message = {
    array: ({ name }) => `"${name}" must be an array.`,
    arrayMaxLength: ({ name, maxLength }) =>
        `The length of "${name}" must be ${maxLength} or less than it.`,
    arrayMinLength: ({ name, minLength }) =>
        `The length of "${name}" must be ${minLength} or greater than it.`,
    arrayUnique: ({ name }) => `"${name}" must not contain duplicate values.`,
    bigint: ({ name }) => `"${name}" must be a bigint value.`,
    bigintMaxValue: ({ name, maxValue }) =>
        `"${name}" must be ${maxValue}n or less than it.`,
    bigintMinValue: ({ name, minValue }) =>
        `"${name}" must be ${minValue}n or greater than it.`,
    boolean: ({ name }) => `"${name}" must be a boolean value.`,
    class: ({ name, constructor: ctor }) =>
        `"${name}" must be an instance of ${ctor.name}.`,
    custom: ({ name, checkName }) => `"${name}" must be ${checkName}.`,
    enum: ({ name, values }) =>
        values.length === 1
            ? `"${name}" must be ${valueToString(values[0])}.`
            : `"${name}" must be any of ${listToString(
                  values,
                  "and",
                  valueToString,
              )}.`,
    function: ({ name }) => `"${name}" must be a function.`,
    number: ({ name }) => `"${name}" must be a number.`,
    numberDisallowInfinity: ({ name }) => `"${name}" must not be Infinity.`,
    numberDisallowNaN: ({ name }) => `"${name}" must not be NaN.`,
    numberIntOnly: ({ name }) => `"${name}" must be an integer.`,
    numberMaxValue: ({ name, maxValue }) =>
        `"${name}" must be ${maxValue} or less than it.`,
    numberMinValue: ({ name, minValue }) =>
        `"${name}" must be ${minValue} or greater than it.`,
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
    stringMaxLength: ({ name, maxLength }) =>
        `The cheracters of "${name}" must be ${maxLength} or less than it.`,
    stringMinLength: ({ name, minLength }) =>
        `The cheracters of "${name}" must be ${minLength} or more than it.`,
    stringPattern: ({ name, pattern }) =>
        `"${name}" must match the pattern ${pattern}.`,
    symbol: ({ name }) => `"${name}" must be a symbol.`,
    tuple: ({ name }) => `"${name}" must be a tuple.`,
    tupleLength: ({ name, length }) =>
        `The length of "${name}" must be ${length}.`,
    union({ name, schemas }) {
        const options = ([] as string[])
            .concat(...schemas.map(schemaToString))
            .filter(isNotDuplicatedValue)
        return options.length === 2
            ? `"${name}" must be ${listToString(options, "or")}.`
            : `"${name}" must be any of ${listToString(options, "and")}.`
    },
    validation({ name, errors }) {
        if (errors.length === 1) {
            return errors[0]
        }
        return `"${name}" has multiple validation errors:\n${errors
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

function listToString<T>(
    xs: readonly T[],
    kind: "and" | "or",
    select: (x: T) => string = String,
): string {
    switch (xs.length) {
        case 0:
            return ""
        case 1:
            return select(xs[0])
        case 2:
            return `${select(xs[0])} ${kind} ${select(xs[1])}`
        default: {
            const ys = xs.map(select)
            const last = ys.pop()
            return `${ys.join(", ")}, ${kind} ${last}`
        }
    }
}

function isNotDuplicatedValue(x: string, i: number, xs: string[]): boolean {
    for (let j = 0; j < i; ++j) {
        if (x === xs[j]) {
            return false
        }
    }
    return true
}
