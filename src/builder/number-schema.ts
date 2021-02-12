import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfNumberSchema(
    ctx: BuildContext,
    _schemaKey: string,
    {
        allowNaN = false,
        finiteOnly = false,
        intOnly = false,
        maxValue,
        minValue,
    }: Schema.NumberSchema,
): string {
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        if (intOnly) {
            if (finiteOnly) {
                throw new Error(
                    '"finiteOnly" and "intOnly" cannot be true at the same time.',
                )
            }
            const nanCheck = allowNaN ? ` && !Number.isNaN(${value})` : ""
            yield `
                if (!Number.isInteger(${value})${nanCheck}) {
                    ${errors}.push({ code: "numberIntOnly", args: { name: ${name} }, depth: ${depth} });
            `
        } else if (finiteOnly) {
            const nanCheck = allowNaN ? ` && !Number.isNaN(${value})` : ""
            yield `
                if (!Number.isFinite(${value})${nanCheck}) {
                    ${errors}.push({ code: "numberFiniteOnly", args: { name: ${name} }, depth: ${depth} });
            `
        } else {
            const nanCheck = allowNaN ? "" : ` || Number.isNaN(${value})`
            yield `
                if (typeof ${value} !== "number"${nanCheck}) {
                    ${errors}.push({ code: "number", args: { name: ${name} }, depth: ${depth} });
            `
        }

        if (maxValue === undefined && minValue === undefined) {
            yield "}"
        } else {
            yield `
                    return ${errors};
                }
            `

            if (maxValue !== undefined) {
                if (minValue !== undefined && minValue > maxValue) {
                    throw new Error(
                        '"maxValue" must be "minValue" or greater than it.',
                    )
                }
                yield `
                    if (${value} > ${maxValue}) {
                        ${errors}.push({ code: "numberMaxValue", args: { name: ${name}, maxValue: ${maxValue} }, depth: ${depth} });
                    }
                `
            }
            if (minValue !== undefined) {
                yield `
                    if (${value} < ${minValue}) {
                        ${errors}.push({ code: "numberMinValue", args: { name: ${name}, minValue: ${minValue} }, depth: ${depth} });
                    }
                `
            }
        }

        yield `return ${errors};`
    })
}
