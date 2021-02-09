import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidationCodeOfSchema } from "./schema"

export function addValidationCodeOfTupleSchema(
    ctx: BuildContext,
    { elements }: Schema.TupleSchema<readonly Schema[]>,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (!Array.isArray(${valueVar})) {
            errors.push({ code: "tuple", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        } else {
            if (${valueVar}.length !== ${elements.length}) {
                errors.push({ code: "tupleLength", args: { name: ${nameVar}, length: ${elements.length} }, depth: ${ctx.depth} });
            }
    `)

    for (let i = 0; i < elements.length; ++i) {
        const elementSchema = elements[i]
        if (elementSchema.type === "any") {
            continue
        }

        ctx.stackLocalScope()
        const elementNameVar = ctx.addLocal("s")
        const elementValueVar = ctx.addLocal("r")
        ctx.addCodeFragment(`
            ${elementNameVar} = ${nameVar} + "[${i}]";
            ${elementValueVar} = ${valueVar}[${i}];
        `)
        addValidationCodeOfSchema(
            ctx,
            elementSchema,
            elementNameVar,
            elementValueVar,
        )
        ctx.popLocalScope()
    }

    ctx.addCodeFragment("}")
}
