import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfClassSchema(
    ctx: BuildContext,
    key: string,
    { constructor: ctor }: Schema.ClassSchema<any>,
): string {
    const ctorVar = ctx.addLocal(`${key}.constructor`, ctor)
    return ctx.addValidation(`
        if (!(value instanceof ${ctorVar})) {
            errors.push({ code: "class", args: { name: name, constructor: ${ctorVar} }, depth: depth });
        }
        return errors;
    `)
}
