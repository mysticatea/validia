import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfSymbolSchema(
    ctx: BuildContext,
    _schema: Schema.SymbolSchema,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "symbol") {
            errors.push({ code: "symbol", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        }
    `)
}
