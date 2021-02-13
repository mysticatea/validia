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
    // eslint-disable-next-line complexity
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        if (
            allowInfinity &&
            allowNaN &&
            !intOnly &&
            maxValue === undefined &&
            minValue === undefined
        ) {
            yield `
                if (typeof ${value} !== "number") {
                    ${errors}.push({ code: "number", args: { name: ${name} }, depth: ${depth} });
            `
        } else {
            const checker = intOnly ? "isInteger" : "isFinite"
            const code = intOnly ? "numberIntOnly" : "number"

            yield `if (!Number.${checker}(${value})) {`
            if (allowInfinity) {
                if (allowNaN) {
                    yield `if (${value} !== Number.POSITIVE_INFINITY && ${value} !== Number.NEGATIVE_INFINITY && !Number.isNaN(${value})) {`
                } else {
                    yield `
                        if (Number.isNaN(${value})) {
                            ${errors}.push({ code: "numberDisallowNaN", args: { name: ${name} }, depth: ${depth} });
                        } else if (${value} !== Number.POSITIVE_INFINITY && ${value} !== Number.NEGATIVE_INFINITY) {
                    `
                }
            } else if (allowNaN) {
                yield `
                    if (${value} === Number.POSITIVE_INFINITY || ${value} === Number.NEGATIVE_INFINITY) {
                        ${errors}.push({ code: "numberDisallowInfinity", args: { name: ${name} }, depth: ${depth} });
                    } else if (!Number.isNaN(${value})) {
                `
            } else {
                yield `
                    if (${value} === Number.POSITIVE_INFINITY || ${value} === Number.NEGATIVE_INFINITY) {
                        ${errors}.push({ code: "numberDisallowInfinity", args: { name: ${name} }, depth: ${depth} });
                    } else if (Number.isNaN(${value})) {
                        ${errors}.push({ code: "numberDisallowNaN", args: { name: ${name} }, depth: ${depth} });
                    } else {
                `
            }
            yield `
                    ${errors}.push({ code: "${code}", args: { name: ${name} }, depth: ${depth} });
                }
            `

            if (maxValue !== undefined || minValue !== undefined) {
                yield "} else {"

                if (maxValue !== undefined) {
                    if (minValue !== undefined) {
                        if (minValue > maxValue) {
                            throw new Error(
                                '"maxValue" must be "minValue" or greater than it.',
                            )
                        }
                        yield `
                            if (${value} > ${maxValue}) {
                                ${errors}.push({ code: "numberMaxValue", args: { name: ${name}, maxValue: ${maxValue} }, depth: ${depth} + 1 });
                            } else if (${value} < ${minValue}) {
                                ${errors}.push({ code: "numberMinValue", args: { name: ${name}, minValue: ${minValue} }, depth: ${depth} + 1 });
                            }
                        `
                    } else {
                        yield `
                            if (${value} > ${maxValue}) {
                                ${errors}.push({ code: "numberMaxValue", args: { name: ${name}, maxValue: ${maxValue} }, depth: ${depth} + 1 });
                            }
                        `
                    }
                } else if (minValue !== undefined) {
                    yield `
                        if (${value} < ${minValue}) {
                            ${errors}.push({ code: "numberMinValue", args: { name: ${name}, minValue: ${minValue} }, depth: ${depth} + 1 });
                        }
                    `
                }
            }
        }

        yield `
            }
            return ${errors};
        `
    })
}
