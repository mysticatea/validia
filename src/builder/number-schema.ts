import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfNumberSchema(
    ctx: BuildContext,
    _schemaKey: string,
    {
        allowInfinity = false,
        allowNaN = false,
        intOnly = false,
        maxValue,
        minValue,
    }: Schema.Number,
): string {
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        const checker = intOnly ? "isInteger" : "isFinite"
        const code = intOnly ? "numberIntOnly" : "number"

        yield `
            if (!Number.${checker}(${value})) {
                if (${value} === Number.POSITIVE_INFINITY || ${value} === Number.NEGATIVE_INFINITY) {
        `
        if (!allowInfinity) {
            yield `${errors}.push({ code: "numberDisallowInfinity", args: { name: ${name} }, depth: ${depth} });`
        }
        yield `} else if (Number.isNaN(${value})) {`
        if (!allowNaN) {
            yield `${errors}.push({ code: "numberDisallowNaN", args: { name: ${name} }, depth: ${depth} });`
        }
        yield `
            } else {
                ${errors}.push({ code: "${code}", args: { name: ${name} }, depth: ${depth} });
            }
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

        yield `
            }
            return ${errors};
        `
    })
}
