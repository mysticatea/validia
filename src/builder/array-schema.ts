import { MaxArrayLength } from "../constants"
import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidationCodeOfSchema } from "./schema"

export function addValidationCodeOfArraySchema(
    ctx: BuildContext,
    {
        elements,
        maxLength = MaxArrayLength,
        minLength = 0,
        unique = false,
    }: Schema.ArraySchema<Schema>,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (!Array.isArray(${valueVar})) {
            errors.push({ code: "array", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `)

    if (
        elements.type === "any" &&
        maxLength >= MaxArrayLength &&
        minLength <= 0 &&
        !unique
    ) {
        ctx.addCodeFragment("}")
        return
    }
    ctx.addCodeFragment("} else {")

    const lengthVar = ctx.addLocal("i")
    ctx.addCodeFragment(`${lengthVar} = ${valueVar}.length;`)

    if (maxLength < MaxArrayLength) {
        ctx.addCodeFragment(`
            if (${lengthVar} > ${maxLength}) {
                errors.push({ code: "arrayMaxLength", args: { name: ${nameVar}, maxLength: ${maxLength} }, depth: ${ctx.depth} });
            }
        `)
    }
    if (minLength > 0) {
        ctx.addCodeFragment(`
            if (${lengthVar} < ${minLength}) {
                errors.push({ code: "arrayMinLength", args: { name: ${nameVar}, minLength: ${minLength} }, depth: ${ctx.depth} });
            }
        `)
    }
    if (unique) {
        const isUniqueVar = ctx.addArgument(isUnique)
        ctx.addCodeFragment(`
            if (!${isUniqueVar}(${valueVar}, ${lengthVar})) {
                errors.push({ code: "arrayUnique", args: { name: ${nameVar} }, depth: ${ctx.depth} });
            }
        `)
    }
    if (elements.type !== "any") {
        const iVar = ctx.addLocal("i")
        ctx.stackLocalScope()
        const elementNameVar = ctx.addLocal("s")
        const elementValueVar = ctx.addLocal("r")
        ctx.addCodeFragment(`
            for (${iVar} = 0; ${iVar} < ${lengthVar}; ++${iVar}) {
                ${elementNameVar} = ${nameVar} + "[" + ${iVar} + "]";
                ${elementValueVar} = ${valueVar}[${iVar}];
        `)
        addValidationCodeOfSchema(
            ctx,
            elements,
            elementNameVar,
            elementValueVar,
        )
        ctx.popLocalScope()
        ctx.addCodeFragment("}")
    }

    ctx.addCodeFragment("}")
}

function isUnique(xs: any[], length: number): boolean {
    for (let i = 1; i < length; ++i) {
        const x = xs[i]
        for (let j = 0; j < i; ++j) {
            if (x === xs[j]) {
                return false
            }
        }
    }
    return true
}
