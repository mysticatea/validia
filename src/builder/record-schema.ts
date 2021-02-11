import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfRecordSchema(
    ctx: BuildContext,
    key: string,
    { properties }: Schema.RecordSchema<Schema>,
): string {
    const locals: string[] = []
    const code: string[] = []
    code.push(`
        if (typeof value !== "object" || value === null) {
            errors.push({ code: "object", args: { name: name }, depth: depth });
    `)
    if (properties.type === "any") {
        code.push("}")
    } else {
        const validateVar = addValidation(ctx, `${key}.properties`, properties)
        locals.push("keys = null", 'key = ""', "i = 0")
        code.push(`
                return errors;
            }
            keys = Object.keys(value);
            for (i = 0; i < keys.length; ++i) {
                key = keys[i]
                ${validateVar}(name + "." + key, value[key], depth + 1, errors);
            }
        `)
    }

    code.push("return errors;")
    if (locals.length > 0) {
        code.unshift(`var ${locals.join(", ")};`)
    }
    return ctx.addValidation(code.join("\n"))
}
