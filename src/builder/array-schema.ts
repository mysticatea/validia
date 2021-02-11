import { MaxArrayLength } from "../constants"
import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfArraySchema(
    ctx: BuildContext,
    key: string,
    {
        elements,
        maxLength = MaxArrayLength,
        minLength = 0,
        unique = false,
    }: Schema.ArraySchema<Schema>,
): string {
    const locals: string[] = []
    const code: string[] = []
    code.push(`
        if (!Array.isArray(value)) {
            errors.push({ code: "array", args: { name: name }, depth: depth });
    `)

    if (
        elements.type === "any" &&
        maxLength >= MaxArrayLength &&
        minLength <= 0 &&
        !unique
    ) {
        code.push("}")
    } else {
        locals.push("length = 0")
        code.push(`
                return errors;
            }
            length = value.length;
        `)

        if (maxLength < MaxArrayLength) {
            code.push(`
                if (length > ${maxLength}) {
                    errors.push({ code: "arrayMaxLength", args: { name: name, maxLength: ${maxLength} }, depth: depth });
                }
            `)
        }
        if (minLength > 0) {
            code.push(`
                if (length < ${minLength}) {
                    errors.push({ code: "arrayMinLength", args: { name: name, minLength: ${minLength} }, depth: depth });
                }
            `)
        }
        if (unique) {
            const isUniqueVar = ctx.addFunction(
                ["xs", "length"],
                `
                    var i = 0, j = 0, x = null;
                    for (i = 1; i < length; ++i) {
                        x = xs[i];
                        for (j = 0; j < i; ++j) {
                            if (x === xs[j]) {
                                return false;
                            }
                        }
                    }
                    return true;
                `,
            )
            code.push(`
                if (!${isUniqueVar}(value, length)) {
                    errors.push({ code: "arrayUnique", args: { name: name }, depth: depth });
                }
            `)
        }
        if (elements.type !== "any") {
            const validateId = addValidation(ctx, `${key}.elements`, elements)
            locals.push("i = 0")
            code.push(`
                for (i = 0; i < length; ++i) {
                    ${validateId}(name + "[" + i + "]", value[i], depth + 1, errors);
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
