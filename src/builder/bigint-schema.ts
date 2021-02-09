import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfBigIntSchema(
    ctx: BuildContext,
    { maxValue, minValue }: Schema.BigIntSchema,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "bigint") {
            errors.push({ code: "bigint", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `)
    if (maxValue == null && minValue == null) {
        ctx.addCodeFragment("}")
        return
    }
    ctx.addCodeFragment("} else {")

    if (maxValue != null) {
        if (minValue != null && minValue > maxValue) {
            throw new Error('"maxValue" must be "minValue" or greater than it.')
        }
        ctx.addCodeFragment(`
            if (${valueVar} > ${maxValue}n) {
                errors.push({ code: "bigintMaxValue", args: { name: ${nameVar}, maxValue: ${maxValue}n }, depth: ${ctx.depth} });
            }
        `)
    }
    if (minValue != null) {
        ctx.addCodeFragment(`
            if (${valueVar} < ${minValue}n) {
                errors.push({ code: "bigintMinValue", args: { name: ${nameVar}, minValue: ${minValue}n }, depth: ${ctx.depth} });
            }
        `)
    }

    ctx.addCodeFragment("}")
}
