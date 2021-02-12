import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfEnumSchema(
    ctx: BuildContext,
    schemaKey: string,
    { values }: Schema.EnumSchema<unknown>,
): string {
    if (values.length === 0) {
        throw new Error("EnumSchema must have 1 or more values.")
    }
    return ctx.addValidation((_locals, name, value, depth, errors) => {
        const valueStrs = values.map(valueToString(ctx, schemaKey))
        const conditionStr = valueStrs
            .map(stringToCondition(value))
            .join(" && ")
        const optionsStr = valueStrs.join(", ")
        return `
            if (${conditionStr}) {
                ${errors}.push({ code: "enum", args: { name: ${name}, values: [${optionsStr}] }, depth: ${depth} });
            }
            return ${errors};
        `
    })
}

function valueToString(
    ctx: BuildContext,
    key: string,
): (value: unknown, i: number) => string {
    return (value, i) => {
        switch (typeof value) {
            case "bigint":
                return `${value}n`
            case "boolean":
                return String(value)
            case "function":
            case "symbol":
                return ctx.addConstant(`${key}.values[${i}]`, value)
            case "number":
                return Number.isNaN(value)
                    ? "Number.NaN"
                    : value === Number.POSITIVE_INFINITY
                    ? "Number.POSITIVE_INFINITY"
                    : value === Number.NEGATIVE_INFINITY
                    ? "Number.NEGATIVE_INFINITY"
                    : String(value)
            case "object":
                return value === null
                    ? "null"
                    : ctx.addConstant(`${key}.values[${i}]`, value)
            case "string":
                return JSON.stringify(value)
            case "undefined":
                return "undefined"

            //istanbul ignore next
            default:
                throw new Error(`Unknown type: ${typeof value}`)
        }
    }
}

function stringToCondition(value: string): (criteria: string) => string {
    return criteria =>
        criteria === "Number.NaN"
            ? `!Number.isNaN(${value})`
            : `${value} !== ${criteria}`
}
