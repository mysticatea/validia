import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfBooleanSchema(
    ctx: BuildContext,
    _schemaKey: string,
    _schema: Schema.BooleanSchema,
): string {
    return ctx.addValidation(
        (_locals, name, value, depth, errors) => `
            if (typeof ${value} !== "boolean") {
                ${errors}.push({ code: "boolean", args: { name: ${name} }, depth: ${depth} });
            }
            return ${errors};
        `,
    )
}
