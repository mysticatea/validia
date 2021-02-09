import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfClassSchema(
    ctx: BuildContext,
    { constructor: ctor }: Schema.ClassSchema<any>,
    nameVar: string,
    valueVar: string,
): void {
    const ctorVar = ctx.addArgument(ctor)
    ctx.addCodeFragment(`
        if (!(${valueVar} instanceof ${ctorVar})) {
            errors.push({ code: "class", args: { name: ${nameVar}, constructor: ${ctorVar} }, depth: ${ctx.depth} });
        }
    `)
}
