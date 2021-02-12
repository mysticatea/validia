import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfFunctionSchema(
    ctx: BuildContext,
    _schemaKey: string,
    _schema: Schema.FunctionSchema,
): string {
    return ctx.addValidation(
        (_locals, name, value, depth, errors) => `
            if (typeof ${value} !== "function") {
                ${errors}.push({ code: "function", args: { name: ${name} }, depth: ${depth} });
            }
            return ${errors};
        `,
    )
}
