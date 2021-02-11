import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfTupleSchema(
    ctx: BuildContext,
    key: string,
    { elements }: Schema.TupleSchema<readonly Schema[]>,
): string {
    const code: string[] = []
    code.push(`
        if (!Array.isArray(value)) {
            errors.push({ code: "tuple", args: { name: name }, depth: depth });
            return errors;
        }
        if (value.length !== ${elements.length}) {
            errors.push({ code: "tupleLength", args: { name: name, length: ${elements.length} }, depth: depth });
        }
    `)

    for (let i = 0; i < elements.length; ++i) {
        const elementSchema = elements[i]
        if (elementSchema.type === "any") {
            continue
        }

        const validateVar = addValidation(
            ctx,
            `${key}.elements[${i}]`,
            elementSchema,
        )
        code.push(`
            ${validateVar}(name + "[${i}]", value[${i}], depth + 1, errors);
        `)
    }

    code.push("return errors;")
    return ctx.addValidation(code.join("\n"))
}
