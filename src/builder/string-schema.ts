import { MaxStringLength } from "../constants"
import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfStringSchema(
    ctx: BuildContext,
    _key: string,
    {
        maxLength = MaxStringLength,
        minLength = 0,
        pattern,
    }: Schema.StringSchema,
): string {
    const locals: string[] = []
    const code: string[] = []
    code.push(`
        if (typeof value !== "string") {
            errors.push({ code: "string", args: { name: name }, depth: depth });
    `)

    if (
        maxLength >= MaxStringLength &&
        minLength <= 0 &&
        pattern === undefined
    ) {
        code.push("}")
    } else {
        code.push(`
                return errors;
            }
        `)

        let countVar = ""
        if (maxLength < MaxStringLength || minLength > 0) {
            countVar = ctx.addFunction(
                ["str", "end"],
                `
                    var count = 0, code = 0, i = 0, length = str.length;
                    while (i < length) {
                        count += 1;
                        if (count >= end) {
                            return count;
                        }
                        i += (code = str.charCodeAt(i)) >= 0xd800 && code <= 0xdbff ? 2 : 1;
                    }
                    return count
                `,
            )
        }
        if (maxLength < MaxStringLength) {
            const end = maxLength + 1
            if (minLength > 0) {
                if (minLength > maxLength) {
                    throw new Error(
                        '"maxLength" must be "minLength" or greater than it.',
                    )
                }
                locals.push("count = 0")
                code.push(`
                    count = ${countVar}(value, ${end});
                    if (count > ${maxLength}) {
                        errors.push({ code: "stringMaxLength", args: { name: name, maxLength: ${maxLength} }, depth: depth });
                    }
                    if (count < ${minLength}) {
                        errors.push({ code: "stringMinLength", args: { name: name, minLength: ${minLength} }, depth: depth });
                    }
                `)
            } else {
                code.push(`
                    if (${countVar}(value, ${end}) > ${maxLength}) {
                        errors.push({ code: "stringMaxLength", args: { name: name, maxLength: ${maxLength} }, depth: depth });
                    }
                `)
            }
        } else if (minLength > 0) {
            code.push(`
                if (${countVar}(value, ${minLength}) < ${minLength}) {
                    errors.push({ code: "stringMinLength", args: { name: name, minLength: ${minLength} }, depth: depth });
                }
            `)
        }

        if (pattern !== undefined) {
            code.push(`
                if (!${pattern}.test(value)) {
                    errors.push({ code: "stringPattern", args: { name: name, pattern: ${pattern} }, depth: depth });
                }
            `)
        }
    }

    code.push("return errors;")
    if (locals.length > 0) {
        code.unshift(`var ${locals.join(", ")};`)
    }
    return ctx.addValidation(code.join("\n"))
}
