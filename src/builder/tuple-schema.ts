import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfTupleSchema(
    ctx: BuildContext,
    schemaKey: string,
    { elements }: Schema.TupleSchema<readonly Schema[]>,
): string {
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        const length = elements.length
        yield `
            if (!Array.isArray(${value})) {
                ${errors}.push({ code: "tuple", args: { name: ${name} }, depth: ${depth} });
                return ${errors};
            }
            if (${value}.length !== ${length}) {
                ${errors}.push({ code: "tupleLength", args: { name: ${name}, length: ${length} }, depth: ${depth} });
            }
        `

        for (let i = 0; i < length; ++i) {
            const elementSchema = elements[i]
            if (elementSchema.type === "any") {
                continue
            }

            const validate = addValidation(
                ctx,
                `${schemaKey}.elements[${i}]`,
                elementSchema,
            )
            yield `
                ${validate}(${name} + "[${i}]", ${value}[${i}], ${depth} + 1, ${errors});
            `
        }

        yield `return ${errors};`
    })
}
