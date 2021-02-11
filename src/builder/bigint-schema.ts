import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfBigIntSchema(
    ctx: BuildContext,
    _key: string,
    { maxValue, minValue }: Schema.BigIntSchema,
): string {
    const code: string[] = []
    code.push(`
        if (typeof value !== "bigint") {
            errors.push({ code: "bigint", args: { name: name }, depth: depth });
    `)

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
                if (value > ${maxValue}n) {
                    errors.push({ code: "bigintMaxValue", args: { name: name, maxValue: ${maxValue}n }, depth: depth });
                }
            `)
        }
        if (minValue !== undefined) {
            code.push(`
                if (value < ${minValue}n) {
                    errors.push({ code: "bigintMinValue", args: { name: name, minValue: ${minValue}n }, depth: depth });
                }
            `)
        }
    }

    code.push("return errors;")
    return ctx.addValidation(code.join("\n"))
}
