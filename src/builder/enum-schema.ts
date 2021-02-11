import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfEnumSchema(
    ctx: BuildContext,
    key: string,
    { values }: Schema.EnumSchema<unknown>,
): string {
    if (values.length === 0) {
        throw new Error("EnumSchema must have 1 or more values.")
    }
    const valueStrs = values.map((value, i) => {
        switch (typeof value) {
            case "bigint":
                return `${value}n`
            case "boolean":
                return String(value)
            case "function":
            case "symbol":
                return ctx.addLocal(`${key}.values[${i}]`, values[i])
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
                    : ctx.addLocal(`${key}.values[${i}]`, values[i])
            case "string":
                return JSON.stringify(value)
            case "undefined":
                return "undefined"

            //istanbul ignore next
            default:
                throw new Error(`Unknown type: ${typeof value}`)
        }
    })
    const conditionStr = valueStrs
        .map(s =>
            s === "Number.NaN" ? "!Number.isNaN(value)" : `value !== ${s}`,
        )
        .join(" && ")
    const optionsStr = `[${valueStrs.join(", ")}]`

    return ctx.addValidation(`
        if (${conditionStr}) {
            errors.push({ code: "enum", args: { name: name, values: ${optionsStr} }, depth: depth });
        }
        return errors;
    `)
}
