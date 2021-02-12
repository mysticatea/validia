import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfClassSchema(
    ctx: BuildContext,
    schemaKey: string,
    schema: Schema.ClassSchema<any>,
): string {
    return ctx.addValidation((_locals, name, value, depth, errors) => {
        // eslint-disable-next-line no-shadow
        const constructor = ctx.addConstant(
            `${schemaKey}.constructor`,
            schema.constructor,
        )
        return `
            if (!(${value} instanceof ${constructor})) {
                ${errors}.push({ code: "class", args: { name: ${name}, constructor: ${constructor} }, depth: ${depth} });
            }
            return ${errors};
        `
    })
}
