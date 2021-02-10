'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const MaxInt8 = 127;
const MaxInt16 = 32767;
const MaxInt32 = 2147483647;
BigInt("9223372036854775807");
const MaxUint8 = 255;
const MaxUint16 = 65535;
const MaxUint32 = 4294967295;
BigInt("18446744073709551615");
const MinInt8 = -128;
const MinInt16 = -32768;
const MinInt32 = -2147483648;
BigInt("9223372036854775807");
const MaxArrayLength = MaxUint32;
const MaxStringLength = 9007199254740991;

function addValidationCodeOfArraySchema(ctx, { elements, maxLength = MaxArrayLength, minLength = 0, unique = false, }, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (!Array.isArray(${valueVar})) {
            errors.push({ code: "array", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `);
    if (elements.type === "any" &&
        maxLength >= MaxArrayLength &&
        minLength <= 0 &&
        !unique) {
        ctx.addCodeFragment("}");
        return;
    }
    ctx.addCodeFragment("} else {");
    const lengthVar = ctx.addLocal("i");
    ctx.addCodeFragment(`${lengthVar} = ${valueVar}.length;`);
    if (maxLength < MaxArrayLength) {
        ctx.addCodeFragment(`
            if (${lengthVar} > ${maxLength}) {
                errors.push({ code: "arrayMaxLength", args: { name: ${nameVar}, maxLength: ${maxLength} }, depth: ${ctx.depth} });
            }
        `);
    }
    if (minLength > 0) {
        ctx.addCodeFragment(`
            if (${lengthVar} < ${minLength}) {
                errors.push({ code: "arrayMinLength", args: { name: ${nameVar}, minLength: ${minLength} }, depth: ${ctx.depth} });
            }
        `);
    }
    if (unique) {
        const isUniqueVar = ctx.addArgument(isUnique);
        ctx.addCodeFragment(`
            if (!${isUniqueVar}(${valueVar}, ${lengthVar})) {
                errors.push({ code: "arrayUnique", args: { name: ${nameVar} }, depth: ${ctx.depth} });
            }
        `);
    }
    if (elements.type !== "any") {
        const iVar = ctx.addLocal("i");
        ctx.stackLocalScope();
        const elementNameVar = ctx.addLocal("s");
        const elementValueVar = ctx.addLocal("r");
        ctx.addCodeFragment(`
            for (${iVar} = 0; ${iVar} < ${lengthVar}; ++${iVar}) {
                ${elementNameVar} = ${nameVar} + "[" + ${iVar} + "]";
                ${elementValueVar} = ${valueVar}[${iVar}];
        `);
        addValidationCodeOfSchema(ctx, elements, elementNameVar, elementValueVar);
        ctx.popLocalScope();
        ctx.addCodeFragment("}");
    }
    ctx.addCodeFragment("}");
}
function isUnique(xs, length) {
    for (let i = 1; i < length; ++i) {
        const x = xs[i];
        for (let j = 0; j < i; ++j) {
            if (x === xs[j]) {
                return false;
            }
        }
    }
    return true;
}

function addValidationCodeOfBigIntSchema(ctx, { maxValue, minValue }, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "bigint") {
            errors.push({ code: "bigint", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `);
    if (maxValue == null && minValue == null) {
        ctx.addCodeFragment("}");
        return;
    }
    ctx.addCodeFragment("} else {");
    if (maxValue != null) {
        if (minValue != null && minValue > maxValue) {
            throw new Error('"maxValue" must be "minValue" or greater than it.');
        }
        ctx.addCodeFragment(`
            if (${valueVar} > ${maxValue}n) {
                errors.push({ code: "bigintMaxValue", args: { name: ${nameVar}, maxValue: ${maxValue}n }, depth: ${ctx.depth} });
            }
        `);
    }
    if (minValue != null) {
        ctx.addCodeFragment(`
            if (${valueVar} < ${minValue}n) {
                errors.push({ code: "bigintMinValue", args: { name: ${nameVar}, minValue: ${minValue}n }, depth: ${ctx.depth} });
            }
        `);
    }
    ctx.addCodeFragment("}");
}

function addValidationCodeOfBooleanSchema(ctx, _schema, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "boolean") {
            errors.push({ code: "boolean", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        }
    `);
}

function addValidationCodeOfClassSchema(ctx, { constructor: ctor }, nameVar, valueVar) {
    const ctorVar = ctx.addArgument(ctor);
    ctx.addCodeFragment(`
        if (!(${valueVar} instanceof ${ctorVar})) {
            errors.push({ code: "class", args: { name: ${nameVar}, constructor: ${ctorVar} }, depth: ${ctx.depth} });
        }
    `);
}

class BuildContext {
    constructor() {
        this.args = [];
        this.code = ['"use strict";', "var errors = [];"];
        /* #IF !PROD
        this.indent = 0;
        // */
        this.locals = [{ i: 0, r: 0, s: 0 }];
        this.localsMax = { i: -1, r: -1, s: -1 };
    }
    get depth() {
        return this.locals.length;
    }
    addArgument(value) {
        const i = this.args.indexOf(value);
        if (i !== -1) {
            return argumentId(i);
        }
        const id = argumentId(this.args.length);
        this.args.push(value);
        return id;
    }
    addCodeFragment(code) {
        for (const line0 of code.split("\n")) {
            const line = line0.trim();
            if (line.length === 0) {
                continue;
            }
            // eslint-disable-next-line multiline-comment-style
            // #IF PROD
            this.code.push(line);
            // */
            /* #IF !PROD
            if (line.startsWith("}")) {
                this.indent -= 2;
            }
            this.code.push(" ".repeat(this.indent) + line);
            if (line.endsWith("{")) {
                this.indent += 2;
            }
            // */
        }
    }
    addLocal(type) {
        return localId(type, this.locals[this.locals.length - 1][type]++);
    }
    stackLocalScope() {
        this.locals.push({ ...this.locals[this.locals.length - 1] });
    }
    popLocalScope() {
        const locals = this.locals.pop();
        const max = this.localsMax;
        for (const type of ["i", "s", "r"]) {
            if (locals[type] > max[type]) {
                max[type] = locals[type];
            }
        }
    }
    createFunction() {
        this.popLocalScope();
        this.code.push("return errors;");
        const locals = [];
        for (let i = 0; i < this.localsMax.i; ++i) {
            locals.push(`${localId("i", i)} = 0`);
        }
        for (let i = 0; i < this.localsMax.s; ++i) {
            locals.push(`${localId("s", i)} = ""`);
        }
        for (let i = 0; i < this.localsMax.r; ++i) {
            locals.push(`${localId("r", i)} = null`);
        }
        if (locals.length > 0) {
            this.code[1] = `var errors = [], ${locals.join(", ")};`;
        }
        const params = this.args.map((_, i) => argumentId(i));
        const code = this.code.join("\n");
        const func = new Function(...params, BuildContext.NameVar, BuildContext.ValueVar, code).bind(null, ...this.args);
        /* #IF !PROD
        func.toString = () => {
            const paramsStr = [
                ...params,
                BuildContext.NameVar,
                BuildContext.ValueVar,
            ].join(", ");
            const bodyStr = code
                .split("\n")
                .map(line => `  ${line}`)
                .join("\n");
            return `function validate(${paramsStr}) {\n${bodyStr}\n}`;
        };
        // */
        return func;
    }
}
BuildContext.NameVar = "name";
BuildContext.ValueVar = "value";
function argumentId(i) {
    return `a${i.toString(36)}`;
}
function localId(type, i) {
    return `${type}${i.toString(36)}`;
}

function addValidationCodeOfCustomSchema(ctx, { check, name }, nameVar, valueVar) {
    const checkName = JSON.stringify(name);
    const checkVar = ctx.addArgument(check);
    ctx.addCodeFragment(`
        if (!${checkVar}(${valueVar})) {
            errors.push({ code: "custom", args: { name: ${nameVar}, checkFunc: ${checkVar}, checkName: ${checkName} }, depth: ${ctx.depth} });
        }
    `);
}

function addValidationCodeOfEnumSchema(ctx, { values }, nameVar, valueVar) {
    if (values.length === 0) {
        throw new Error("EnumSchema must have 1 or more values.");
    }
    const simple = values.length < 10 &&
        values.every(value => typeof value !== "function" &&
            (typeof value !== "object" || value === null) &&
            typeof value !== "symbol");
    let conditionStr;
    let optionsStr;
    if (simple) {
        const valueStrs = values.map(value => {
            switch (typeof value) {
                case "bigint":
                    return `${value}n`;
                case "boolean":
                case "object":
                case "string":
                    return JSON.stringify(value);
                case "number":
                    return Number.isNaN(value)
                        ? "Number.NaN"
                        : value === Number.POSITIVE_INFINITY
                            ? "Number.POSITIVE_INFINITY"
                            : value === Number.NEGATIVE_INFINITY
                                ? "Number.NEGATIVE_INFINITY"
                                : String(value);
                case "undefined":
                    return "undefined";
                //istanbul ignore next
                default:
                    throw new Error(`Unknown type: ${typeof value}`);
            }
        });
        conditionStr = valueStrs
            .map(s => s === "Number.NaN"
            ? `!Number.isNaN(${valueVar})`
            : `${valueVar} !== ${s}`)
            .join(" && ");
        optionsStr = `[${valueStrs.join(", ")}]`;
    }
    else if (values.length === 1) {
        const testValueVar = ctx.addArgument(values[0]);
        optionsStr = `[${testValueVar}]`;
        conditionStr = `${valueVar} !== ${testValueVar}`;
    }
    else {
        const hasNaN = values.some(value => Number.isNaN(value));
        const testValuesVar = ctx.addArgument([...values]);
        optionsStr = `${testValuesVar}.slice(0)`;
        conditionStr = hasNaN
            ? `!Number.isNaN(${valueVar}) && ${testValuesVar}.indexOf(${valueVar}) === -1`
            : `${testValuesVar}.indexOf(${valueVar}) === -1`;
    }
    ctx.addCodeFragment(`
        if (${conditionStr}) {
            errors.push({ code: "enum", args: { name: ${nameVar}, values: ${optionsStr} }, depth: ${ctx.depth} });
        }
    `);
}

function addValidationCodeOfFunctionSchema(ctx, _schema, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "function") {
            errors.push({ code: "function", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        }
    `);
}

function addValidationCodeOfNumberSchema(ctx, { allowNaN = false, finiteOnly = false, intOnly = false, maxValue, minValue, }, nameVar, valueVar) {
    if (intOnly) {
        if (finiteOnly) {
            throw new Error('"finiteOnly" and "intOnly" cannot be true at the same time.');
        }
        const nanCheck = allowNaN ? ` && !Number.isNaN(${valueVar})` : "";
        ctx.addCodeFragment(`
            if (!Number.isInteger(${valueVar})${nanCheck}) {
                errors.push({ code: "numberIntOnly", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        `);
    }
    else if (finiteOnly) {
        const nanCheck = allowNaN ? ` && !Number.isNaN(${valueVar})` : "";
        ctx.addCodeFragment(`
            if (!Number.isFinite(${valueVar})${nanCheck}) {
                errors.push({ code: "numberFiniteOnly", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        `);
    }
    else {
        const nanCheck = allowNaN ? "" : ` || Number.isNaN(${valueVar})`;
        ctx.addCodeFragment(`
            if (typeof ${valueVar} !== "number"${nanCheck}) {
                errors.push({ code: "number", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        `);
    }
    if (maxValue === undefined && minValue === undefined) {
        ctx.addCodeFragment("}");
        return;
    }
    ctx.addCodeFragment("} else {");
    if (maxValue !== undefined) {
        if (minValue != null && minValue > maxValue) {
            throw new Error('"maxValue" must be "minValue" or greater than it.');
        }
        ctx.addCodeFragment(`
            if (${valueVar} > ${maxValue}) {
                errors.push({ code: "numberMaxValue", args: { name: ${nameVar}, maxValue: ${maxValue} }, depth: ${ctx.depth} });
            }
        `);
    }
    if (minValue !== undefined) {
        ctx.addCodeFragment(`
            if (${valueVar} < ${minValue}) {
                errors.push({ code: "numberMinValue", args: { name: ${nameVar}, minValue: ${minValue} }, depth: ${ctx.depth} });
            }
        `);
    }
    ctx.addCodeFragment("}");
}

function addValidationCodeOfObjectSchema(ctx, { properties, required = [], }, nameVar, valueVar) {
    const remainingKeysVar = ctx.addLocal("r");
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "object" || ${valueVar} === null) {
            errors.push({ code: "object", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        } else {
            ${remainingKeysVar} = Object.keys(${valueVar});
    `);
    const keys = Object.keys(properties).sort(undefined);
    if (keys.length > 0) {
        const iVar = ctx.addLocal("i");
        const missingKeysVar = required.length > 0 ? ctx.addLocal("r") : undefined;
        if (missingKeysVar) {
            ctx.addCodeFragment(`${missingKeysVar} = [];`);
        }
        for (const propertyName of keys) {
            const propertySchema = properties[propertyName];
            const propertyNameStr = JSON.stringify(propertyName).slice(1, -1);
            const isRequired = required.includes(propertyName);
            ctx.addCodeFragment(`
                ${iVar} = ${remainingKeysVar}.indexOf("${propertyNameStr}");
                if (${iVar} !== -1) {
                    ${remainingKeysVar}.splice(${iVar}, 1);
            `);
            if (propertySchema.type !== "any") {
                ctx.stackLocalScope();
                const propertyNameVar = ctx.addLocal("s");
                const propertyValueVar = ctx.addLocal("r");
                ctx.addCodeFragment(`
                    ${propertyNameVar} = ${nameVar} + ".${propertyNameStr}";
                    ${propertyValueVar} = ${valueVar}["${propertyNameStr}"];
                `);
                if (!isRequired) {
                    ctx.addCodeFragment(`if (${propertyValueVar} !== undefined) {`);
                }
                addValidationCodeOfSchema(ctx, propertySchema, propertyNameVar, propertyValueVar);
                if (!isRequired) {
                    ctx.addCodeFragment("}");
                }
                ctx.popLocalScope();
            }
            if (missingKeysVar && isRequired) {
                ctx.addCodeFragment(`
                    } else {
                        ${missingKeysVar}.push("${propertyNameStr}")
                    }
                `);
            }
            else {
                ctx.addCodeFragment("}");
            }
        }
        if (missingKeysVar) {
            ctx.addCodeFragment(`
                if (${missingKeysVar}.length > 0) {
                    errors.push({ code: "objectRequiredKeys", args: { name: ${nameVar}, keys: ${missingKeysVar} }, depth: ${ctx.depth} });
                }
            `);
        }
    }
    ctx.addCodeFragment(`
        if (${remainingKeysVar}.length > 0) {
            errors.push({ code: "objectUnknownKeys", args: { name: ${nameVar}, keys: ${remainingKeysVar} }, depth: ${ctx.depth} });
        }
    `);
    ctx.addCodeFragment("}");
}

function addValidationCodeOfRecordSchema(ctx, { properties }, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "object" || ${valueVar} === null) {
            errors.push({ code: "object", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `);
    if (properties.type === "any") {
        ctx.addCodeFragment("}");
        return;
    }
    ctx.addCodeFragment("} else {");
    const keysVar = ctx.addLocal("r");
    const iVar = ctx.addLocal("i");
    ctx.stackLocalScope();
    const propertyNameVar = ctx.addLocal("s");
    const propertyValueVar = ctx.addLocal("r");
    ctx.addCodeFragment(`
        ${keysVar} = Object.keys(${valueVar})
        for (${iVar} = 0; ${iVar} < ${keysVar}.length; ++${iVar}) {
            ${propertyNameVar} = ${keysVar}[${iVar}];
            ${propertyValueVar} = ${valueVar}[${propertyNameVar}];
            ${propertyNameVar} = ${nameVar} + "." + ${propertyNameVar};
    `);
    addValidationCodeOfSchema(ctx, properties, propertyNameVar, propertyValueVar);
    ctx.popLocalScope();
    ctx.addCodeFragment("}");
    ctx.addCodeFragment("}");
}

function addValidationCodeOfStringSchema(ctx, { maxLength = MaxStringLength, minLength = 0, pattern, }, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "string") {
            errors.push({ code: "string", args: { name: ${nameVar} }, depth: ${ctx.depth} });
    `);
    if (maxLength >= MaxStringLength &&
        minLength <= 0 &&
        pattern === undefined) {
        ctx.addCodeFragment("}");
        return;
    }
    ctx.addCodeFragment("} else {");
    if (maxLength < MaxStringLength) {
        const countCharsVar = ctx.addArgument(countChars);
        const depth = ctx.depth;
        if (minLength > 0) {
            if (minLength > maxLength) {
                throw new Error('"maxLength" must be "minLength" or greater than it.');
            }
            const countVar = ctx.addLocal("i");
            ctx.addCodeFragment(`
                ${countVar} = ${countCharsVar}(${valueVar}, ${maxLength + 1});
                if (${countVar} > ${maxLength}) {
                    errors.push({ code: "stringMaxLength", args: { name: ${nameVar}, maxLength: ${maxLength} }, depth: ${depth} });
                }
                if (${countVar} < ${minLength}) {
                    errors.push({ code: "stringMinLength", args: { name: ${nameVar}, minLength: ${minLength} }, depth: ${depth} });
                }
            `);
        }
        else {
            const end = maxLength + 1;
            ctx.addCodeFragment(`
                if (${countCharsVar}(${valueVar}, ${end}) > ${maxLength}) {
                    errors.push({ code: "stringMaxLength", args: { name: ${nameVar}, maxLength: ${maxLength} }, depth: ${depth} });
                }
            `);
        }
    }
    else if (minLength > 0) {
        const countCharsVar = ctx.addArgument(countChars);
        ctx.addCodeFragment(`
            if (${countCharsVar}(${valueVar}, ${minLength}) < ${minLength}) {
                errors.push({ code: "stringMinLength", args: { name: ${nameVar}, minLength: ${minLength} }, depth: ${ctx.depth} });
            }
        `);
    }
    if (pattern !== undefined) {
        ctx.addCodeFragment(`
            if (!${pattern}.test(${valueVar})) {
                errors.push({ code: "stringPattern", args: { name: ${nameVar}, pattern: ${pattern} }, depth: ${ctx.depth} });
            }
        `);
    }
    ctx.addCodeFragment("}");
}
function countChars(s, max) {
    let count = 0;
    let code = 0;
    for (let i = 0, end = s.length; i < end; i += (code = s.charCodeAt(i)) >= 0xd800 && code <= 0xdbff ? 2 : 1) {
        count += 1;
        if (count >= max) {
            return count;
        }
    }
    return count;
}

function addValidationCodeOfSymbolSchema(ctx, _schema, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "symbol") {
            errors.push({ code: "symbol", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        }
    `);
}

function addValidationCodeOfTupleSchema(ctx, { elements }, nameVar, valueVar) {
    ctx.addCodeFragment(`
        if (!Array.isArray(${valueVar})) {
            errors.push({ code: "tuple", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        } else {
            if (${valueVar}.length !== ${elements.length}) {
                errors.push({ code: "tupleLength", args: { name: ${nameVar}, length: ${elements.length} }, depth: ${ctx.depth} });
            }
    `);
    for (let i = 0; i < elements.length; ++i) {
        const elementSchema = elements[i];
        if (elementSchema.type === "any") {
            continue;
        }
        ctx.stackLocalScope();
        const elementNameVar = ctx.addLocal("s");
        const elementValueVar = ctx.addLocal("r");
        ctx.addCodeFragment(`
            ${elementNameVar} = ${nameVar} + "[${i}]";
            ${elementValueVar} = ${valueVar}[${i}];
        `);
        addValidationCodeOfSchema(ctx, elementSchema, elementNameVar, elementValueVar);
        ctx.popLocalScope();
    }
    ctx.addCodeFragment("}");
}

function addValidationCodeOfUnionSchema(ctx, { schemas: givenSchemas }, nameVar, valueVar) {
    const schemas = flat(givenSchemas);
    if (schemas.length === 0) {
        throw new Error("UnionSchema must have 1 or more schemas.");
    }
    if (schemas.length === 1) {
        addValidationCodeOfSchema(ctx, schemas[0], nameVar, valueVar);
        return;
    }
    const validateUnionVar = ctx.addArgument(validateUnion);
    const validationsVar = ctx.addArgument(schemas.map(createValidationOfSchema));
    const schemasVar = ctx.addArgument(schemas);
    const errorsVar = ctx.addLocal("r");
    const iVar = ctx.addLocal("i");
    ctx.addCodeFragment(`
        ${errorsVar} = ${validateUnionVar}(${validationsVar}, ${nameVar}, ${valueVar})
        if (${errorsVar}.length >= 2) {
            errors.push({ code: "union", args: { name: ${nameVar}, schemas: ${schemasVar} }, depth: ${ctx.depth} });
        }
        if (${errorsVar}.length === 1) {
            for (${iVar} = 0; ${iVar} < ${errorsVar}[0].length; ++${iVar}) {
                errors.push(${errorsVar}[0][${iVar}])
            }
        }
    `);
}
const Any = Object.freeze([Object.freeze({ type: "any" })]);
function flat(schemas, retv = []) {
    for (const schema of schemas) {
        if (schema.type === "any") {
            return Any;
        }
        if (schema.type === "union") {
            if (flat(schema.schemas, retv) === Any) {
                return Any;
            }
        }
        else {
            retv.push(schema);
        }
    }
    return retv;
}
function validateUnion(validations, name, value) {
    const retv = [];
    let maxDepth = -1;
    for (const validate of validations) {
        const errors = validate(name, value);
        if (errors.length === 0) {
            return [];
        }
        const depth = errors.reduce((d, e) => Math.min(d, e.depth), Number.MAX_SAFE_INTEGER);
        if (depth > maxDepth) {
            retv.length = 1;
            retv[0] = errors;
            maxDepth = depth;
        }
        else if (depth === maxDepth) {
            retv.push(errors);
        }
    }
    return retv;
}

const cache = new WeakMap();
function createValidationOfSchema(schema) {
    let validation = cache.get(schema);
    if (!validation) {
        validation = addValidationCodeOfSchema(new BuildContext(), schema, BuildContext.NameVar, BuildContext.ValueVar).createFunction();
        cache.set(schema, validation);
    }
    return validation;
}
function addValidationCodeOfSchema(ctx, schema, nameVar, valueVar) {
    switch (schema.type) {
        case "any":
            break;
        case "array":
            addValidationCodeOfArraySchema(ctx, schema, nameVar, valueVar);
            break;
        case "bigint":
            addValidationCodeOfBigIntSchema(ctx, schema, nameVar, valueVar);
            break;
        case "boolean":
            addValidationCodeOfBooleanSchema(ctx, schema, nameVar, valueVar);
            break;
        case "class":
            addValidationCodeOfClassSchema(ctx, schema, nameVar, valueVar);
            break;
        case "custom":
            addValidationCodeOfCustomSchema(ctx, schema, nameVar, valueVar);
            break;
        case "enum":
            addValidationCodeOfEnumSchema(ctx, schema, nameVar, valueVar);
            break;
        case "function":
            addValidationCodeOfFunctionSchema(ctx, schema, nameVar, valueVar);
            break;
        case "number":
            addValidationCodeOfNumberSchema(ctx, schema, nameVar, valueVar);
            break;
        case "object":
            addValidationCodeOfObjectSchema(ctx, schema, nameVar, valueVar);
            break;
        case "record":
            addValidationCodeOfRecordSchema(ctx, schema, nameVar, valueVar);
            break;
        case "string":
            addValidationCodeOfStringSchema(ctx, schema, nameVar, valueVar);
            break;
        case "symbol":
            addValidationCodeOfSymbolSchema(ctx, schema, nameVar, valueVar);
            break;
        case "tuple":
            addValidationCodeOfTupleSchema(ctx, schema, nameVar, valueVar);
            break;
        case "union":
            addValidationCodeOfUnionSchema(ctx, schema, nameVar, valueVar);
            break;
        //istanbul ignore next
        default:
            throw new Error(`Unknown Schema: ${schema}`);
    }
    return ctx;
}

const DefaultMessage = {
    array: ({ name }) => `"${name}" must be an array.`,
    arrayMaxLength: ({ name, maxLength }) => `The length of "${name}" must be ${maxLength} or less than it.`,
    arrayMinLength: ({ name, minLength }) => `The length of "${name}" must be ${minLength} or greater than it.`,
    arrayUnique: ({ name }) => `"${name}" must not contain duplicate values.`,
    bigint: ({ name }) => `"${name}" must be a bigint value.`,
    bigintMaxValue: ({ name, maxValue }) => `"${name}" must be ${maxValue}n or less than it.`,
    bigintMinValue: ({ name, minValue }) => `"${name}" must be ${minValue}n or greater than it.`,
    boolean: ({ name }) => `"${name}" must be a boolean value.`,
    class: ({ name, constructor: ctor }) => `"${name}" must be an instance of ${ctor.name}.`,
    custom: ({ name, checkName }) => `"${name}" must be ${checkName}.`,
    enum: ({ name, values }) => values.length === 1
        ? `"${name}" must be ${valueToString(values[0])}.`
        : `"${name}" must be any of ${listToString(values, "and", valueToString)}.`,
    function: ({ name }) => `"${name}" must be a function.`,
    number: ({ name }) => `"${name}" must be a number.`,
    numberFiniteOnly: ({ name }) => `"${name}" must be a finite number.`,
    numberIntOnly: ({ name }) => `"${name}" must be an integer.`,
    numberMaxValue: ({ name, maxValue }) => `"${name}" must be ${maxValue} or less than it.`,
    numberMinValue: ({ name, minValue }) => `"${name}" must be ${minValue} or greater than it.`,
    object: ({ name }) => `"${name}" must be an object.`,
    objectRequiredKeys: ({ name, keys }) => keys.length === 1
        ? `"${name}" must have the required property: ${keys[0]}.`
        : `"${name}" must have the required properties: ${keys.join(",")}.`,
    objectUnknownKeys: ({ name, keys }) => keys.length === 1
        ? `"${name}" must not have unknown property: ${keys[0]}.`
        : `"${name}" must not have unknown properties: ${keys.join(",")}.`,
    string: ({ name }) => `"${name}" must be a string.`,
    stringMaxLength: ({ name, maxLength }) => `The cheracters of "${name}" must be ${maxLength} or less than it.`,
    stringMinLength: ({ name, minLength }) => `The cheracters of "${name}" must be ${minLength} or more than it.`,
    stringPattern: ({ name, pattern }) => `"${name}" must match the pattern ${pattern}.`,
    symbol: ({ name }) => `"${name}" must be a symbol.`,
    tuple: ({ name }) => `"${name}" must be a tuple.`,
    tupleLength: ({ name, length }) => `The length of "${name}" must be ${length}.`,
    union({ name, schemas }) {
        const options = [].concat(...schemas.map(schemaToString));
        return options.length === 2
            ? `"${name}" must be ${listToString(options, "or")}.`
            : `"${name}" must be any of ${listToString(options, "and")}.`;
    },
    validation({ name, errors }) {
        if (errors.length === 1) {
            return errors[0];
        }
        return `"${name}" has multiple validation errors:\n${errors
            .map(e => `- ${e}`)
            .join("\n")}`;
    },
};
function valueToString(value) {
    switch (typeof value) {
        case "bigint":
            return `${value}n`;
        case "function":
            return `[function ${value.name || "(anonymous)"}]`;
        case "string":
            return JSON.stringify(value);
        default:
            return String(value);
    }
}
function schemaToString(schema) {
    switch (schema.type) {
        case "array":
            return "an array";
        case "bigint":
            return "a bigint value";
        case "boolean":
            return "a boolean value";
        case "class":
            return `a ${schema.constructor.name} instance`;
        case "custom":
            return schema.name;
        case "enum":
            return schema.values.map(valueToString);
        case "function":
            return "a function";
        case "number":
            return "a number";
        case "object":
        case "record":
            return "an object";
        case "string":
            return "a string";
        case "symbol":
            return "a symbol";
        case "tuple":
            return "a tuple";
        //istanbul ignore next
        default:
            return "an unknown value";
    }
}
function listToString(xs, kind, select = String) {
    switch (xs.length) {
        case 0:
            return "";
        case 1:
            return select(xs[0]);
        case 2:
            return `${select(xs[0])} ${kind} ${select(xs[1])}`;
        default: {
            const ys = xs.map(select);
            const last = ys.pop();
            return `${ys.join(", ")}, ${kind} ${last}`;
        }
    }
}

class ValidationError extends Error {
    constructor(message, name, errors) {
        var _a, _b;
        super(toMessage(message, name, errors));
        this.errors = errors;
        (_b = (_a = Error).captureStackTrace) === null || _b === void 0 ? void 0 : _b.call(_a, this, ValidationError);
    }
}
function toMessage(message, name, errors) {
    return message.validation({
        name,
        errors: errors.map(e => message[e.code](e.args)),
    });
}

function createValidation(schema, { messages = DefaultMessage } = {}) {
    const validate = createValidationOfSchema(schema);
    return (name, value) => {
        const errors = validate(name, value);
        if (errors.length > 0) {
            throw new ValidationError(messages, name, errors);
        }
    };
}

class Cache {
    constructor(factory) {
        this.map = new WeakMap();
        this.factory = factory;
    }
    get(key) {
        if (this.map.has(key)) {
            return this.map.get(key);
        }
        const value = this.factory(key);
        this.map.set(key, value);
        return value;
    }
}

const any = { type: "any" };
const anyBigInt = {
    type: "bigint",
    minValue: undefined,
    maxValue: undefined,
};
const bigInt64 = {
    type: "bigint",
    minValue: BigInt("-9223372036854775808"),
    maxValue: BigInt("9223372036854775807"),
};
const bigUint64 = {
    type: "bigint",
    minValue: BigInt("0"),
    maxValue: BigInt("18446744073709551615"),
};
const anyBoolean = { type: "boolean" };
const constantNull = { type: "enum", values: [null] };
const anyFunction = { type: "function" };
const anyNumber = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: false,
    maxValue: undefined,
    minValue: undefined,
};
const anyFiniteNumber = {
    type: "number",
    allowNaN: false,
    finiteOnly: true,
    intOnly: false,
    maxValue: undefined,
    minValue: undefined,
};
const anyInteger = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: undefined,
    minValue: undefined,
};
const int8 = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxInt8,
    minValue: MinInt8,
};
const int16 = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxInt16,
    minValue: MinInt16,
};
const int32 = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxInt32,
    minValue: MinInt32,
};
const uint8 = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxUint8,
    minValue: 0,
};
const uint16 = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxUint16,
    minValue: 0,
};
const uint32 = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxUint32,
    minValue: 0,
};
const anyObject = {
    type: "record",
    properties: any,
};
const anyString = {
    type: "string",
    maxLength: MaxStringLength,
    minLength: 0,
    pattern: undefined,
};
const anySymbol = { type: "symbol" };
const anyArrayCache = new Cache((elements) => ({
    type: "array",
    elements,
    maxLength: MaxArrayLength,
    minLength: 0,
    unique: false,
}));
const classCache = new Cache((
// eslint-disable-next-line no-shadow
constructor) => ({
    type: "class",
    constructor,
}));
/* eslint-disable class-methods-use-this */
class SchemaFactories {
    constructor() {
        /**
         * The schema for 64 bits signed integers.
         */
        this.bigInt64 = bigInt64;
        /**
         * The schema for 64 bits unsigned integers.
         */
        this.bigUint64 = bigUint64;
        /**
         * The schema for null.
         * Equivalent to `schemas.const(null)` and `schemas.enum(null)`.
         */
        this.null = constantNull;
        /**
         * The schema for 8 bits signed integers.
         */
        this.int8 = int8;
        /**
         * The schema for 16 bits signed integers.
         */
        this.int16 = int16;
        /**
         * The schema for 32 bits signed integers.
         */
        this.int32 = int32;
        /**
         * The schema for 8 bits unsigned integers.
         */
        this.uint8 = uint8;
        /**
         * The schema for 16 bits unsigned integers.
         */
        this.uint16 = uint16;
        /**
         * The schema for 32 bits unsigned integers.
         */
        this.uint32 = uint32;
    }
    /**
     * The schema for any values.
     */
    any() {
        return any;
    }
    // Implementation
    array(elements = any, { maxLength = MaxArrayLength, minLength = 0, unique = false, } = {}) {
        if (maxLength >= MaxArrayLength && minLength <= 0 && !unique) {
            return anyArrayCache.get(elements);
        }
        return { type: "array", elements, maxLength, minLength, unique };
    }
    /**
     * The schema for bigint values.
     * @param options The options.
     */
    bigInt({ maxValue, minValue, } = {}) {
        if (maxValue === undefined && minValue === undefined) {
            return anyBigInt;
        }
        return { type: "bigint", maxValue, minValue };
    }
    /**
     * The schema for true or false.
     */
    boolean() {
        return anyBoolean;
    }
    /**
     * The schema for specific class instances.
     * @param constructor The constructor to use `instanceof` operations.
     */
    instanceOf(
    // eslint-disable-next-line no-shadow
    constructor) {
        return classCache.get(constructor);
    }
    /**
     * The schema for user-defined checks.
     * @param name The name of the valid values. This name will be shown in error messages.
     * @param check The check.
     */
    custom(name, check) {
        return { type: "custom", check, name };
    }
    // Implementation
    enum(...values) {
        if (values.length === 1 && values[0] === null) {
            return constantNull;
        }
        return { type: "enum", values };
    }
    /**
     * The schema for any functions.
     */
    function() {
        return anyFunction;
    }
    /**
     * The schema for numbers.
     * @param options The options.
     */
    number({ allowNaN = false, finiteOnly = false, intOnly = false, maxValue, minValue, } = {}) {
        if (!allowNaN && maxValue === undefined && minValue === undefined) {
            if (intOnly) {
                if (!finiteOnly) {
                    return anyInteger;
                }
            }
            else if (finiteOnly) {
                return anyFiniteNumber;
            }
            else {
                return anyNumber;
            }
        }
        return {
            type: "number",
            allowNaN,
            finiteOnly,
            intOnly,
            maxValue,
            minValue,
        };
    }
    // Implementation
    object(properties) {
        if (properties === undefined) {
            return anyObject;
        }
        return { type: "object", properties, required: Object.keys(properties) };
    }
    // Implementation
    partialObject(properties, required) {
        if (required && required.length > 0) {
            return { type: "object", properties, required };
        }
        return { type: "object", properties };
    }
    // Implementation
    record(properties = any) {
        if (properties.type === "any") {
            return anyObject;
        }
        return { type: "record", properties };
    }
    /**
     * The schema for strings.
     * @param options The options.
     */
    string({ maxLength = MaxStringLength, minLength = 0, pattern, } = {}) {
        if (maxLength >= MaxStringLength && minLength <= 0 && pattern == null) {
            return anyString;
        }
        return { type: "string", maxLength, minLength, pattern };
    }
    /**
     * The schema for any symbols.
     */
    symbol() {
        return anySymbol;
    }
    /**
     * The schema for tuples.
     * @param elements The schema of elements.
     */
    tuple(...elements) {
        return { type: "tuple", elements };
    }
    // Implementation
    anyOf(...schemas) {
        return { type: "union", schemas };
    }
}
/* eslint-enable class-methods-use-this */
/**
 * The schema factories.
 */
const schemas = Object.freeze(new SchemaFactories());

function validate(schema, name, value, { messages = DefaultMessage } = {}) {
    const errors = createValidationOfSchema(schema)(name, value);
    if (errors.length > 0) {
        throw new ValidationError(messages, name, errors);
    }
}

exports.DefaultMessage = DefaultMessage;
exports.ValidationError = ValidationError;
exports.createValidation = createValidation;
exports.schemas = schemas;
exports.validate = validate;
//# sourceMappingURL=index.js.map
