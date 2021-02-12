import { MaxArrayLength } from "../constants"
import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfArraySchema(
    ctx: BuildContext,
    schemaKey: string,
    {
        elements,
        maxLength = MaxArrayLength,
        minLength = 0,
        unique = false,
    }: Schema.ArraySchema<Schema>,
): string {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        const shouldCheckElements =
            elements.type !== "any" ||
            maxLength < MaxArrayLength ||
            minLength > 0 ||
            unique

        yield `
            if (!Array.isArray(${value})) {
                ${errors}.push({ code: "array", args: { name: ${name} }, depth: ${depth} });
        `
        if (!shouldCheckElements) {
            yield "}"
        } else {
            const length = locals.add("0")
            yield `
                    return ${errors};
                }
                ${length} = ${value}.length;
            `

            if (maxLength < MaxArrayLength) {
                yield `
                    if (${length} > ${maxLength}) {
                        ${errors}.push({ code: "arrayMaxLength", args: { name: ${name}, maxLength: ${maxLength} }, depth: ${depth} });
                    }
                `
            }
            if (minLength > 0) {
                yield `
                    if (${length} < ${minLength}) {
                        ${errors}.push({ code: "arrayMinLength", args: { name: ${name}, minLength: ${minLength} }, depth: ${depth} });
                    }
                `
            }
            if (unique) {
                const isUnique = addIsUnique(ctx)
                yield `
                    if (!${isUnique}(${value}, ${length})) {
                        ${errors}.push({ code: "arrayUnique", args: { name: ${name} }, depth: ${depth} });
                    }
                `
            }
            if (elements.type !== "any") {
                const validate = addValidation(
                    ctx,
                    `${schemaKey}.elements`,
                    elements,
                )
                const i = locals.add("0")
                yield `
                    for (${i} = 0; ${i} < ${length}; ++${i}) {
                        ${validate}(${name} + "[" + ${i} + "]", ${value}[${i}], ${depth} + 1, ${errors});
                    }
                `
            }
        }

        yield `return ${errors};`
    })
}

function addIsUnique(ctx: BuildContext): string {
    return ctx.addFunction((locals, xs, length) => {
        const i = locals.add("0")
        const j = locals.add("0")
        const x = locals.add("null")
        return `
            for (; ${i} < ${length}; ++${i}) {
                ${x} = ${xs}[${i}];
                for (${j} = 0; ${j} < ${i}; ++${j}) {
                    if (${x} === ${xs}[${j}]) {
                        return false;
                    }
                }
            }
            return true;
        `
    })
}
