import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfNumberSchema(
    ctx: BuildContext,
    _key: string,
    {
        allowNaN = false,
        finiteOnly = false,
        intOnly = false,
        maxValue,
        minValue,
    }: Schema.NumberSchema,
): string {
    const code: string[] = []

    if (intOnly) {
        if (finiteOnly) {
            throw new Error(
                '"finiteOnly" and "intOnly" cannot be true at the same time.',
            )
        }
        const nanCheck = allowNaN ? " && !Number.isNaN(value)" : ""
        code.push(`
            if (!Number.isInteger(value)${nanCheck}) {
                errors.push({ code: "numberIntOnly", args: { name: name }, depth: depth });
        `)
    } else if (finiteOnly) {
        const nanCheck = allowNaN ? " && !Number.isNaN(value)" : ""
        code.push(`
            if (!Number.isFinite(value)${nanCheck}) {
                errors.push({ code: "numberFiniteOnly", args: { name: name }, depth: depth });
        `)
    } else {
        const nanCheck = allowNaN ? "" : " || Number.isNaN(value)"
        code.push(`
            if (typeof value !== "number"${nanCheck}) {
                errors.push({ code: "number", args: { name: name }, depth: depth });
        `)
    }

    if (maxValue === undefined && minValue === undefined) {
        code.push("}")
    } else {
        code.push(`
                return errors;
            }
        `)

        if (maxValue !== undefined) {
            if (minValue !== undefined && minValue > maxValue) {
                throw new Error(
                    '"maxValue" must be "minValue" or greater than it.',
                )
            }
            code.push(`
                if (value > ${maxValue}) {
                    errors.push({ code: "numberMaxValue", args: { name: name, maxValue: ${maxValue} }, depth: depth });
                }
            `)
        }
        if (minValue !== undefined) {
            code.push(`
                if (value < ${minValue}) {
                    errors.push({ code: "numberMinValue", args: { name: name, minValue: ${minValue} }, depth: depth });
                }
            `)
        }
    }

    code.push("return errors;")
    return ctx.addValidation(code.join("\n"))
}
