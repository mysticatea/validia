import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfAnySchema(
    ctx: BuildContext,
    _key: string,
    _schema: Schema.AnySchema,
): string {
    return ctx.addValidation("return errors;")
}
