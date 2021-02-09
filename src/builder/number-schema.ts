import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfNumberSchema(
    ctx: BuildContext,
    {
        allowNaN = false,
        finiteOnly = false,
        intOnly = false,
        maxValue,
        minValue,
    }: Schema.NumberSchema,
    nameVar: string,
    valueVar: string,
): void {
    if (intOnly) {
        if (finiteOnly) {
            throw new Error(
                '"finiteOnly" and "intOnly" cannot be true at the same time.',
            )
        }
        const nanCheck = allowNaN ? ` && !Number.isNaN(${valueVar})` : ""
        ctx.addCodeFragment(`
            if (!Number.isInteger(${valueVar})${nanCheck}) {
                errors.push({ code: "numberIntOnly", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        `)
    } else if (finiteOnly) {
        const nanCheck = allowNaN ? ` && !Number.isNaN(${valueVar})` : ""
        ctx.addCodeFragment(`
            if (!Number.isFinite(${valueVar})${nanCheck}) {
                errors.push({ code: "numberFiniteOnly", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        `)
    } else {
        const nanCheck = allowNaN ? "" : ` || Number.isNaN(${valueVar})`
        ctx.addCodeFragment(`
            if (typeof ${valueVar} !== "number"${nanCheck}) {
                errors.push({ code: "number", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        `)
    }
    if (maxValue === undefined && minValue === undefined) {
        ctx.addCodeFragment("}")
        return
    }
    ctx.addCodeFragment("} else {")

    if (maxValue !== undefined) {
        if (minValue != null && minValue > maxValue) {
            throw new Error('"maxValue" must be "minValue" or greater than it.')
        }
        ctx.addCodeFragment(`
            if (${valueVar} > ${maxValue}) {
                errors.push({ code: "numberMaxValue", args: { name: ${nameVar}, maxValue: ${maxValue} }, depth: ${ctx.depth} });
            }
        `)
    }
    if (minValue !== undefined) {
        ctx.addCodeFragment(`
            if (${valueVar} < ${minValue}) {
                errors.push({ code: "numberMinValue", args: { name: ${nameVar}, minValue: ${minValue} }, depth: ${ctx.depth} });
            }
        `)
    }

    ctx.addCodeFragment("}")
}
