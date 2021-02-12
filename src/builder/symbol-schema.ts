import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfSymbolSchema(
    ctx: BuildContext,
    _schemaKey: string,
    _schema: Schema.SymbolSchema,
): string {
    return ctx.addValidation(
        (_locals, name, value, depth, errors) => `
            if (typeof ${value} !== "symbol") {
                ${errors}.push({ code: "symbol", args: { name: ${name} }, depth: ${depth} });
            }
            return ${errors};
        `,
    )
}
