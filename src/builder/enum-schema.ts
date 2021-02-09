import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfEnumSchema(
    ctx: BuildContext,
    { values }: Schema.EnumSchema<unknown>,
    nameVar: string,
    valueVar: string,
): void {
    if (values.length === 0) {
        throw new Error("EnumSchema must have 1 or more values.")
    }
    const simple =
        values.length < 10 &&
        values.every(
            value =>
                typeof value !== "function" &&
                (typeof value !== "object" || value === null) &&
                typeof value !== "symbol",
        )

    let conditionStr: string
    let optionsStr: string
    if (simple) {
        const valueStrs = values.map(value => {
            switch (typeof value) {
                case "bigint":
                    return `${value}n`
                case "boolean":
                case "object":
                case "string":
                    return JSON.stringify(value)
                case "number":
                    return Number.isNaN(value)
                        ? "Number.NaN"
                        : value === Number.POSITIVE_INFINITY
                        ? "Number.POSITIVE_INFINITY"
                        : value === Number.NEGATIVE_INFINITY
                        ? "Number.NEGATIVE_INFINITY"
                        : String(value)
                case "undefined":
                    return "undefined"

                //istanbul ignore next
                default:
                    throw new Error(`Unknown type: ${typeof value}`)
            }
        })
        conditionStr = valueStrs
            .map(s =>
                s === "Number.NaN"
                    ? `!Number.isNaN(${valueVar})`
                    : `${valueVar} !== ${s}`,
            )
            .join(" && ")
        optionsStr = `[${valueStrs.join(", ")}]`
    } else if (values.length === 1) {
        const testValueVar = ctx.addArgument(values[0])
        optionsStr = `[${testValueVar}]`
        conditionStr = `${valueVar} !== ${testValueVar}`
    } else {
        const hasNaN = values.some(value => Number.isNaN(value))
        const testValuesVar = ctx.addArgument([...values])
        optionsStr = `${testValuesVar}.slice(0)`
        conditionStr = hasNaN
            ? `!Number.isNaN(${valueVar}) && ${testValuesVar}.indexOf(${valueVar}) === -1`
            : `${testValuesVar}.indexOf(${valueVar}) === -1`
    }

    ctx.addCodeFragment(`
        if (${conditionStr}) {
            errors.push({ code: "enum", args: { name: ${nameVar}, values: ${optionsStr} }, depth: ${ctx.depth} });
        }
    `)
}
