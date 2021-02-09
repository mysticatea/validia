import { MaxStringLength } from "../constants"
import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfStringSchema(
    ctx: BuildContext,
    {
        maxLength = MaxStringLength,
        minLength = 0,
        pattern,
    }: Schema.StringSchema,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "string") {
            errors.push({ code: "string", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `)
    if (
        maxLength >= MaxStringLength &&
        minLength <= 0 &&
        pattern === undefined
    ) {
        ctx.addCodeFragment("}")
        return
    }
    ctx.addCodeFragment("} else {")

    if (maxLength < MaxStringLength) {
        const countCharsVar = ctx.addArgument(countChars)
        const depth = ctx.depth
        if (minLength > 0) {
            if (minLength > maxLength) {
                throw new Error(
                    '"maxLength" must be "minLength" or greater than it.',
                )
            }
            const countVar = ctx.addLocal("i")
            ctx.addCodeFragment(`
                ${countVar} = ${countCharsVar}(${valueVar}, ${maxLength + 1});
                if (${countVar} > ${maxLength}) {
                    errors.push({ code: "stringMaxLength", args: { name: ${nameVar}, maxLength: ${maxLength} }, depth: ${depth} });
                }
                if (${countVar} < ${minLength}) {
                    errors.push({ code: "stringMinLength", args: { name: ${nameVar}, minLength: ${minLength} }, depth: ${depth} });
                }
            `)
        } else {
            const end = maxLength + 1
            ctx.addCodeFragment(`
                if (${countCharsVar}(${valueVar}, ${end}) > ${maxLength}) {
                    errors.push({ code: "stringMaxLength", args: { name: ${nameVar}, maxLength: ${maxLength} }, depth: ${depth} });
                }
            `)
        }
    } else if (minLength > 0) {
        const countCharsVar = ctx.addArgument(countChars)
        ctx.addCodeFragment(`
            if (${countCharsVar}(${valueVar}, ${minLength}) < ${minLength}) {
                errors.push({ code: "stringMinLength", args: { name: ${nameVar}, minLength: ${minLength} }, depth: ${ctx.depth} });
            }
        `)
    }

    if (pattern !== undefined) {
        ctx.addCodeFragment(`
            if (!${pattern}.test(${valueVar})) {
                errors.push({ code: "stringPattern", args: { name: ${nameVar}, pattern: ${pattern} }, depth: ${ctx.depth} });
            }
        `)
    }

    ctx.addCodeFragment("}")
}

function countChars(s: string, max: number): number {
    let count = 0
    let code = 0
    for (
        let i = 0, end = s.length;
        i < end;
        i += (code = s.charCodeAt(i)) >= 0xd800 && code <= 0xdbff ? 2 : 1
    ) {
        count += 1
        if (count >= max) {
            return count
        }
    }
    return count
}
