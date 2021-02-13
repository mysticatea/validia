import { MaxStringLength } from "../constants"
import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfStringSchema(
    ctx: BuildContext,
    _schemaKey: string,
    { maxLength = MaxStringLength, minLength = 0, pattern }: Schema.String,
): string {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        const shouldCheckContent =
            maxLength < MaxStringLength ||
            minLength > 0 ||
            pattern !== undefined
        yield `
            if (typeof ${value} !== "string") {
                ${errors}.push({ code: "string", args: { name: ${name} }, depth: ${depth} });
        `

        if (!shouldCheckContent) {
            yield "}"
        } else {
            yield `
                    return ${errors};
                }
            `

            let countChars = ""
            if (maxLength < MaxStringLength || minLength > 0) {
                countChars = addCountChars(ctx)
            }
            if (maxLength < MaxStringLength) {
                const end = maxLength + 1
                if (minLength > 0) {
                    if (minLength > maxLength) {
                        throw new Error(
                            '"maxLength" must be "minLength" or greater than it.',
                        )
                    }
                    const count = locals.add("0")
                    yield `
                        ${count} = ${countChars}(${value}, ${end});
                        if (${count} > ${maxLength}) {
                            ${errors}.push({ code: "stringMaxLength", args: { name: ${name}, maxLength: ${maxLength} }, depth: ${depth} });
                        }
                        if (${count} < ${minLength}) {
                            ${errors}.push({ code: "stringMinLength", args: { name: ${name}, minLength: ${minLength} }, depth: ${depth} });
                        }
                    `
                } else {
                    yield `
                        if (${countChars}(${value}, ${end}) > ${maxLength}) {
                            ${errors}.push({ code: "stringMaxLength", args: { name: ${name}, maxLength: ${maxLength} }, depth: ${depth} });
                        }
                    `
                }
            } else if (minLength > 0) {
                yield `
                    if (${countChars}(${value}, ${minLength}) < ${minLength}) {
                        ${errors}.push({ code: "stringMinLength", args: { name: ${name}, minLength: ${minLength} }, depth: ${depth} });
                    }
                `
            }

            if (pattern !== undefined) {
                yield `
                    if (!${pattern}.test(${value})) {
                        ${errors}.push({ code: "stringPattern", args: { name: ${name}, pattern: ${pattern} }, depth: ${depth} });
                    }
                `
            }
        }

        yield `return ${errors};`
    })
}

function addCountChars(ctx: BuildContext): string {
    return ctx.addFunction((locals, str, end) => {
        const count = locals.add("0")
        const code = locals.add("0")
        const i = locals.add("0")
        const length = locals.add(`${str}.length`)
        return `
            while (${i} < ${length}) {
                ${count} += 1;
                if (${count} >= ${end}) {
                    return ${count};
                }
                ${i} += (${code} = ${str}.charCodeAt(${i})) >= 0xd800 && ${code} <= 0xdbff ? 2 : 1;
            }
            return ${count}
        `
    })
}
