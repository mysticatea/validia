import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfBigIntSchema(
    ctx: BuildContext,
    _schemaKey: string,
    { maxValue, minValue }: Schema.BigInt,
): string {
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        yield `
            if (typeof ${value} !== "bigint") {
                ${errors}.push({ code: "bigint", args: { name: ${name} }, depth: ${depth} });
        `

        if (maxValue !== undefined || minValue !== undefined) {
            yield "} else {"

            if (maxValue !== undefined) {
                if (minValue !== undefined && minValue > maxValue) {
                    throw new Error(
                        '"maxValue" must be "minValue" or greater than it.',
                    )
                }
                yield `
                    if (${value} > ${maxValue}n) {
                        ${errors}.push({ code: "bigintMaxValue", args: { name: ${name}, maxValue: ${maxValue}n }, depth: ${depth} });
                    }
                `
            }
            if (minValue !== undefined) {
                yield `
                    if (${value} < ${minValue}n) {
                        ${errors}.push({ code: "bigintMinValue", args: { name: ${name}, minValue: ${minValue}n }, depth: ${depth} });
                    }
                `
            }
        }

        yield `
            }
            return ${errors};
        `
    })
}
