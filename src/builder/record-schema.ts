import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidationCodeOfSchema } from "./schema"

export function addValidationCodeOfRecordSchema(
    ctx: BuildContext,
    { properties }: Schema.RecordSchema<Schema>,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "object" || ${valueVar} === null) {
            errors.push({ code: "object", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `)
    if (properties.type === "any") {
        ctx.addCodeFragment("}")
        return
    }
    ctx.addCodeFragment("} else {")

    const keysVar = ctx.addLocal("r")
    const iVar = ctx.addLocal("i")
    ctx.stackLocalScope()
    const propertyNameVar = ctx.addLocal("s")
    const propertyValueVar = ctx.addLocal("r")
    ctx.addCodeFragment(`
        ${keysVar} = Object.keys(${valueVar})
        for (${iVar} = 0; ${iVar} < ${keysVar}.length; ++${iVar}) {
            ${propertyNameVar} = ${keysVar}[${iVar}];
            ${propertyValueVar} = ${valueVar}[${propertyNameVar}];
            ${propertyNameVar} = ${nameVar} + "." + ${propertyNameVar};
    `)
    addValidationCodeOfSchema(
        ctx,
        properties,
        propertyNameVar,
        propertyValueVar,
    )
    ctx.popLocalScope()
    ctx.addCodeFragment("}")
    ctx.addCodeFragment("}")
}
