'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function addValidationOfAnySchema(ctx, _schemaKey, _schema) {
    return ctx.addValidation((_locals, _name, _value, _depth, errors) => `return ${errors};`);
}

const MaxInt8 = 127;
const MaxInt16 = 32767;
const MaxInt32 = 2147483647;
const MaxInt64 = BigInt("9223372036854775807");
const MaxUint8 = 255;
const MaxUint16 = 65535;
const MaxUint32 = 4294967295;
const MaxUint64 = BigInt("18446744073709551615");
const MinInt8 = -128;
const MinInt16 = -32768;
const MinInt32 = -2147483648;
const MinInt64 = BigInt("-9223372036854775808");
const MaxArrayLength = MaxUint32;
const MaxStringLength = 9007199254740991;

function addValidationOfArraySchema(ctx, schemaKey, { elements, maxLength = MaxArrayLength, minLength = 0, unique = false, }) {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        const shouldCheckElements = elements.type !== "any" ||
            maxLength < MaxArrayLength ||
            minLength > 0 ||
            unique;
        yield `
            if (!Array.isArray(${value})) {
                ${errors}.push({ code: "array", args: { name: ${name} }, depth: ${depth} });
        `;
        if (!shouldCheckElements) {
            yield "}";
        }
        else {
            const length = locals.add("0");
            yield `
                    return ${errors};
                }
                ${length} = ${value}.length;
            `;
            if (maxLength < MaxArrayLength) {
                yield `
                    if (${length} > ${maxLength}) {
                        ${errors}.push({ code: "arrayMaxLength", args: { name: ${name}, maxLength: ${maxLength} }, depth: ${depth} });
                    }
                `;
            }
            if (minLength > 0) {
                yield `
                    if (${length} < ${minLength}) {
                        ${errors}.push({ code: "arrayMinLength", args: { name: ${name}, minLength: ${minLength} }, depth: ${depth} });
                    }
                `;
            }
            if (unique) {
                const isUnique = addIsUnique(ctx);
                yield `
                    if (!${isUnique}(${value}, ${length})) {
                        ${errors}.push({ code: "arrayUnique", args: { name: ${name} }, depth: ${depth} });
                    }
                `;
            }
            if (elements.type !== "any") {
                const validate = addValidation(ctx, `${schemaKey}.elements`, elements);
                const i = locals.add("0");
                yield `
                    for (${i} = 0; ${i} < ${length}; ++${i}) {
                        ${validate}(${name} + "[" + ${i} + "]", ${value}[${i}], ${depth} + 1, ${errors});
                    }
                `;
            }
        }
        yield `return ${errors};`;
    });
}
function addIsUnique(ctx) {
    return ctx.addFunction((locals, xs, length) => {
        const i = locals.add("0");
        const j = locals.add("0");
        const x = locals.add("null");
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
        `;
    });
}

function addValidationOfBigIntSchema(ctx, _schemaKey, { maxValue, minValue }) {
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        yield `
            if (typeof ${value} !== "bigint") {
                ${errors}.push({ code: "bigint", args: { name: ${name} }, depth: ${depth} });
        `;
        if (maxValue === undefined && minValue === undefined) {
            yield "}";
        }
        else {
            yield `
                    return ${errors};
                }
            `;
            if (maxValue !== undefined) {
                if (minValue !== undefined && minValue > maxValue) {
                    throw new Error('"maxValue" must be "minValue" or greater than it.');
                }
                yield `
                    if (${value} > ${maxValue}n) {
                        ${errors}.push({ code: "bigintMaxValue", args: { name: ${name}, maxValue: ${maxValue}n }, depth: ${depth} });
                    }
                `;
            }
            if (minValue !== undefined) {
                yield `
                    if (${value} < ${minValue}n) {
                        ${errors}.push({ code: "bigintMinValue", args: { name: ${name}, minValue: ${minValue}n }, depth: ${depth} });
                    }
                `;
            }
        }
        yield `return ${errors};`;
    });
}

function addValidationOfBooleanSchema(ctx, _schemaKey, _schema) {
    return ctx.addValidation((_locals, name, value, depth, errors) => `
            if (typeof ${value} !== "boolean") {
                ${errors}.push({ code: "boolean", args: { name: ${name} }, depth: ${depth} });
            }
            return ${errors};
        `);
}

function addValidationOfClassSchema(ctx, schemaKey, schema) {
    return ctx.addValidation((_locals, name, value, depth, errors) => {
        // eslint-disable-next-line no-shadow
        const constructor = ctx.addConstant(`${schemaKey}.constructor`, schema.constructor);
        return `
            if (!(${value} instanceof ${constructor})) {
                ${errors}.push({ code: "class", args: { name: ${name}, constructor: ${constructor} }, depth: ${depth} });
            }
            return ${errors};
        `;
    });
}

class BuildContext {
    constructor() {
        this.constants = [];
        this.functionMap = new Map();
        this.flyweightMap = new Map();
        this.code = ['"use strict";'];
        this.indent = 0;
    }
    addValidation(createBody) {
        return this.addFunction(createBody);
    }
    addFunction(createBody) {
        const numArgs = Math.max(0, createBody.length - 1);
        const locals = new Locals();
        const params = Array.from({ length: numArgs }, () => locals.addArgs());
        const bodyGen = createBody(locals, ...params);
        const body = typeof bodyGen === "string" ? bodyGen : [...bodyGen].join("\n");
        const code = locals.getVariableDeclaration() + body;
        let id = this.functionMap.get(code);
        if (id === undefined) {
            id = constantId(this.constants.length);
            this.constants.push({});
            this.addCodeFragment(`function ${id}(${params.join(", ")}) {`);
            this.addCodeFragment(code);
            this.addCodeFragment("}");
            this.functionMap.set(code, id);
        }
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
    mapSchema(validationId, schemaKey) {
        let ref = this.flyweightMap.get(validationId);
        if (!ref) {
            ref = {};
            this.flyweightMap.set(validationId, ref);
        }
        return this.addConstant(schemaKey, ref);
    }
    addConstant(valueExpr, valueRef) {
        const i = this.constants.indexOf(valueRef);
        if (i !== -1) {
            return constantId(i);
        }
        const id = constantId(this.constants.length);
        this.addCodeFragment(`var ${id} = ${valueExpr};`);
        this.constants.push(valueRef);
        return id;
    }
    build(schema, validationId) {
        this.addCodeFragment(`
            return function validate(name, value) {
                return ${validationId}(name, value, 0, []);
            };
        `);
        const code = this.code.join("\n");
        const func = new Function("$schema", code)(schema);
        /* #IF !PROD
        func.toString = () => {
            const bodyStr = code
                .split("\n")
                .map(line => `  ${line}`)
                .join("\n");
            return `var validate = (function($schema) {\n${bodyStr}\n})({});`;
        };
        // */
        return func;
    }
}
const Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Locals {
    constructor() {
        this.numArgs = 0;
        this.localInits = [];
    }
    addArgs() {
        return localId(this.numArgs++);
    }
    add(initExpr) {
        const id = localId(this.numArgs + this.localInits.length);
        this.localInits.push(`${id} = ${initExpr}`);
        return id;
    }
    getVariableDeclaration() {
        if (this.localInits.length > 0) {
            return `var ${this.localInits.join(", ")};\n`;
        }
        return "";
    }
}
function constantId(i) {
    return `_${i.toString(36)}`;
}
function localId(i) {
    if (i >= Chars.length) {
        throw new Error("Too many locals");
    }
    return Chars[i];
}

function addValidationOfCustomSchema(ctx, schemaKey, schema) {
    return ctx.addValidation((_locals, name, value, depth, errors) => {
        const checkName = JSON.stringify(schema.name);
        const checkFunc = ctx.addConstant(`${schemaKey}.check`, schema.check);
        return `
            if (!${checkFunc}(${value})) {
                ${errors}.push({ code: "custom", args: { name: ${name}, checkFunc: ${checkFunc}, checkName: ${checkName} }, depth: ${depth} });
            }
            return ${errors};
        `;
    });
}

function addValidationOfEnumSchema(ctx, schemaKey, { values }) {
    if (values.length === 0) {
        throw new Error("EnumSchema must have 1 or more values.");
    }
    return ctx.addValidation((_locals, name, value, depth, errors) => {
        const valueStrs = values.map(valueToString(ctx, schemaKey));
        const conditionStr = valueStrs
            .map(stringToCondition(value))
            .join(" && ");
        const optionsStr = valueStrs.join(", ");
        return `
            if (${conditionStr}) {
                ${errors}.push({ code: "enum", args: { name: ${name}, values: [${optionsStr}] }, depth: ${depth} });
            }
            return ${errors};
        `;
    });
}
function valueToString(ctx, key) {
    return (value, i) => {
        switch (typeof value) {
            case "bigint":
                return `${value}n`;
            case "boolean":
                return String(value);
            case "function":
            case "symbol":
                return ctx.addConstant(`${key}.values[${i}]`, value);
            case "number":
                return Number.isNaN(value)
                    ? "Number.NaN"
                    : value === Number.POSITIVE_INFINITY
                        ? "Number.POSITIVE_INFINITY"
                        : value === Number.NEGATIVE_INFINITY
                            ? "Number.NEGATIVE_INFINITY"
                            : String(value);
            case "object":
                return value === null
                    ? "null"
                    : ctx.addConstant(`${key}.values[${i}]`, value);
            case "string":
                return JSON.stringify(value);
            case "undefined":
                return "undefined";
            //istanbul ignore next
            default:
                throw new Error(`Unknown type: ${typeof value}`);
        }
    };
}
function stringToCondition(value) {
    return criteria => criteria === "Number.NaN"
        ? `!Number.isNaN(${value})`
        : `${value} !== ${criteria}`;
}

function addValidationOfFunctionSchema(ctx, _schemaKey, _schema) {
    return ctx.addValidation((_locals, name, value, depth, errors) => `
            if (typeof ${value} !== "function") {
                ${errors}.push({ code: "function", args: { name: ${name} }, depth: ${depth} });
            }
            return ${errors};
        `);
}

function addValidationOfNumberSchema(ctx, _schemaKey, { allowInfinity = false, allowNaN = false, intOnly = false, maxValue, minValue, }) {
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        const checker = intOnly ? "isInteger" : "isFinite";
        const code = intOnly ? "numberIntOnly" : "number";
        yield `
            if (!Number.${checker}(${value})) {
                if (${value} === Number.POSITIVE_INFINITY || ${value} === Number.NEGATIVE_INFINITY) {
        `;
        if (!allowInfinity) {
            yield `${errors}.push({ code: "numberDisallowInfinity", args: { name: ${name} }, depth: ${depth} });`;
        }
        yield `} else if (Number.isNaN(${value})) {`;
        if (!allowNaN) {
            yield `${errors}.push({ code: "numberDisallowNaN", args: { name: ${name} }, depth: ${depth} });`;
        }
        yield `
            } else {
                ${errors}.push({ code: "${code}", args: { name: ${name} }, depth: ${depth} });
            }
        `;
        if (maxValue === undefined && minValue === undefined) {
            yield "}";
        }
        else {
            yield `
                    return ${errors};
                }
            `;
            if (maxValue !== undefined) {
                if (minValue !== undefined && minValue > maxValue) {
                    throw new Error('"maxValue" must be "minValue" or greater than it.');
                }
                yield `
                    if (${value} > ${maxValue}) {
                        ${errors}.push({ code: "numberMaxValue", args: { name: ${name}, maxValue: ${maxValue} }, depth: ${depth} });
                    }
                `;
            }
            if (minValue !== undefined) {
                yield `
                    if (${value} < ${minValue}) {
                        ${errors}.push({ code: "numberMinValue", args: { name: ${name}, minValue: ${minValue} }, depth: ${depth} });
                    }
                `;
            }
        }
        yield `return ${errors};`;
    });
}

function addValidationOfObjectSchema(ctx, schemaKey, { allowUnknown = false, properties, required = [], }) {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        const requiredKeys = Array.from(new Set(required)).sort(undefined);
        const optionalKeys = Object.keys(properties).sort(undefined);
        yield `
            if (typeof ${value} !== "object" || ${value} === null) {
                ${errors}.push({ code: "object", args: { name: ${name} }, depth: ${depth} });
        `;
        if (allowUnknown && optionalKeys.length === 0) {
            yield "}";
        }
        else {
            yield `
                    return ${errors};
                }
            `;
            const collectKeys = addCollectKeys(ctx);
            const remainKeys = locals.add("null");
            yield `${remainKeys} = ${collectKeys}(${value});`;
            let missingKeys = "";
            if (requiredKeys.length > 0) {
                missingKeys = locals.add("null");
                yield `${missingKeys} = [];`;
                for (const propertyName of requiredKeys) {
                    const i = optionalKeys.indexOf(propertyName);
                    if (i === -1) {
                        throw new Error(`"${propertyName}" was in "${schemaKey}.required", so it must exist in "${schemaKey}.properties".`);
                    }
                    else {
                        optionalKeys.splice(i, 1);
                    }
                    const propertySchema = properties[propertyName];
                    const propertyNameStr = JSON.stringify(propertyName).slice(1, -1);
                    if (propertySchema.type === "any") {
                        yield `
                            if (!${remainKeys}.delete("${propertyNameStr}")) {
                                ${missingKeys}.push("${propertyNameStr}");
                            }
                        `;
                    }
                    else {
                        const validationId = addValidation(ctx, `${schemaKey}.properties["${propertyNameStr}"]`, propertySchema);
                        yield `
                            if (${remainKeys}.delete("${propertyNameStr}")) {
                                ${validationId}(${name} + ".${propertyNameStr}", ${value}["${propertyNameStr}"], ${depth} + 1, ${errors});
                            } else {
                                ${missingKeys}.push("${propertyNameStr}");
                            }
                        `;
                    }
                }
            }
            if (optionalKeys.length > 0) {
                const propValue = locals.add("null");
                for (const propertyName of optionalKeys) {
                    const propertySchema = properties[propertyName];
                    const propertyNameStr = JSON.stringify(propertyName).slice(1, -1);
                    if (propertySchema.type === "any") {
                        if (!allowUnknown) {
                            yield `${remainKeys}.delete("${propertyNameStr}");`;
                        }
                    }
                    else {
                        const validationId = addValidation(ctx, `${schemaKey}.properties["${propertyNameStr}"]`, propertySchema);
                        yield `
                            if (${remainKeys}.delete("${propertyNameStr}") && (${propValue} = ${value}["${propertyNameStr}"]) !== undefined) {
                                ${validationId}(${name} + ".${propertyNameStr}", ${propValue}, ${depth} + 1, ${errors});
                            }
                        `;
                    }
                }
            }
            if (missingKeys) {
                yield `
                    if (${missingKeys}.length > 0) {
                        ${errors}.push({ code: "objectRequiredKeys", args: { name: ${name}, keys: ${missingKeys} }, depth: ${depth} });
                    }
                `;
            }
            if (!allowUnknown) {
                const setToArray = addSetToArray(ctx);
                yield `
                    if (${remainKeys}.size > 0) {
                        ${errors}.push({ code: "objectUnknownKeys", args: { name: ${name}, keys: ${setToArray}(${remainKeys}) }, depth: ${depth} });
                    }
                `;
            }
        }
        yield `return ${errors};`;
    });
}
function addCollectKeys(ctx) {
    return ctx.addFunction((locals, obj) => {
        const keys = locals.add("new Set()");
        const key = locals.add('""');
        return `
            for (${key} in ${obj}) ${keys}.add(${key});
            return ${keys};
        `;
    });
}
function addSetToArray(ctx) {
    return ctx.addFunction((locals, set) => {
        const retv = locals.add("[]");
        return `
            ${set}.forEach(function(x) { ${retv}.push(x) });
            return ${retv}.sort(undefined);
        `;
    });
}

function addValidationOfRecordSchema(ctx, schemaKey, { properties }) {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        yield `
            if (typeof ${value} !== "object" || ${value} === null) {
                ${errors}.push({ code: "object", args: { name: ${name} }, depth: ${depth} });
        `;
        if (properties.type === "any") {
            yield "}";
        }
        else {
            const validate = addValidation(ctx, `${schemaKey}.properties`, properties);
            const keys = locals.add("null");
            const key = locals.add('""');
            const i = locals.add("0");
            yield `
                    return ${errors};
                }
                ${keys} = Object.keys(${value}).sort(undefined);
                for (${i} = 0; ${i} < ${keys}.length; ++${i}) {
                    ${key} = ${keys}[${i}]
                    ${validate}(${name} + "." + ${key}, ${value}[${key}], ${depth} + 1, ${errors});
                }
            `;
        }
        yield `return ${errors};`;
    });
}

function addValidationOfStringSchema(ctx, _schemaKey, { maxLength = MaxStringLength, minLength = 0, pattern, }) {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        const shouldCheckContent = maxLength < MaxStringLength ||
            minLength > 0 ||
            pattern !== undefined;
        yield `
            if (typeof ${value} !== "string") {
                ${errors}.push({ code: "string", args: { name: ${name} }, depth: ${depth} });
        `;
        if (!shouldCheckContent) {
            yield "}";
        }
        else {
            yield `
                    return ${errors};
                }
            `;
            let countChars = "";
            if (maxLength < MaxStringLength || minLength > 0) {
                countChars = addCountChars(ctx);
            }
            if (maxLength < MaxStringLength) {
                const end = maxLength + 1;
                if (minLength > 0) {
                    if (minLength > maxLength) {
                        throw new Error('"maxLength" must be "minLength" or greater than it.');
                    }
                    const count = locals.add("0");
                    yield `
                        ${count} = ${countChars}(${value}, ${end});
                        if (${count} > ${maxLength}) {
                            ${errors}.push({ code: "stringMaxLength", args: { name: ${name}, maxLength: ${maxLength} }, depth: ${depth} });
                        }
                        if (${count} < ${minLength}) {
                            ${errors}.push({ code: "stringMinLength", args: { name: ${name}, minLength: ${minLength} }, depth: ${depth} });
                        }
                    `;
                }
                else {
                    yield `
                        if (${countChars}(${value}, ${end}) > ${maxLength}) {
                            ${errors}.push({ code: "stringMaxLength", args: { name: ${name}, maxLength: ${maxLength} }, depth: ${depth} });
                        }
                    `;
                }
            }
            else if (minLength > 0) {
                yield `
                    if (${countChars}(${value}, ${minLength}) < ${minLength}) {
                        ${errors}.push({ code: "stringMinLength", args: { name: ${name}, minLength: ${minLength} }, depth: ${depth} });
                    }
                `;
            }
            if (pattern !== undefined) {
                yield `
                    if (!${pattern}.test(${value})) {
                        ${errors}.push({ code: "stringPattern", args: { name: ${name}, pattern: ${pattern} }, depth: ${depth} });
                    }
                `;
            }
        }
        yield `return ${errors};`;
    });
}
function addCountChars(ctx) {
    return ctx.addFunction((locals, str, end) => {
        const count = locals.add("0");
        const code = locals.add("0");
        const i = locals.add("0");
        const length = locals.add(`${str}.length`);
        return `
            while (${i} < ${length}) {
                ${count} += 1;
                if (${count} >= ${end}) {
                    return ${count};
                }
                ${i} += (${code} = ${str}.charCodeAt(${i})) >= 0xd800 && ${code} <= 0xdbff ? 2 : 1;
            }
            return ${count}
        `;
    });
}

function addValidationOfSymbolSchema(ctx, _schemaKey, _schema) {
    return ctx.addValidation((_locals, name, value, depth, errors) => `
            if (typeof ${value} !== "symbol") {
                ${errors}.push({ code: "symbol", args: { name: ${name} }, depth: ${depth} });
            }
            return ${errors};
        `);
}

function addValidationOfTupleSchema(ctx, schemaKey, { elements }) {
    return ctx.addValidation(function* (_locals, name, value, depth, errors) {
        const length = elements.length;
        yield `
            if (!Array.isArray(${value})) {
                ${errors}.push({ code: "tuple", args: { name: ${name} }, depth: ${depth} });
                return ${errors};
            }
            if (${value}.length !== ${length}) {
                ${errors}.push({ code: "tupleLength", args: { name: ${name}, length: ${length} }, depth: ${depth} });
            }
        `;
        for (let i = 0; i < length; ++i) {
            const elementSchema = elements[i];
            if (elementSchema.type === "any") {
                continue;
            }
            const validate = addValidation(ctx, `${schemaKey}.elements[${i}]`, elementSchema);
            yield `
                ${validate}(${name} + "[${i}]", ${value}[${i}], ${depth} + 1, ${errors});
            `;
        }
        yield `return ${errors};`;
    });
}

function addValidationOfUnionSchema(ctx, schemaKey, { schemas }) {
    const flattened = flatten(`${schemaKey}.schemas`, schemas);
    if (flattened.length === 0) {
        throw new Error("UnionSchema must have 1 or more schemas.");
    }
    if (flattened.length === 1) {
        return addValidation(ctx, flattened[0].childSchemaKey, flattened[0].childSchema);
    }
    const validationIds = [];
    const schemaIds = [];
    for (const { childSchemaKey, childSchema } of flattened) {
        const validationId = addValidation(ctx, childSchemaKey, childSchema);
        if (validationIds.includes(validationId)) {
            continue;
        }
        const schemaId = ctx.mapSchema(validationId, childSchemaKey);
        validationIds.push(validationId);
        schemaIds.push(schemaId);
    }
    const validateUnion = addValidateUnion(ctx);
    const validationsStr = validationIds.join(", ");
    const schemasStr = schemaIds.join(", ");
    return ctx.addValidation((_locals, name, value, depth, errors) => `return ${validateUnion}(${name}, ${value}, ${depth}, ${errors}, [${schemasStr}], [${validationsStr}]);`);
}
function flatten(key, schemas, flattened = []) {
    for (let i = 0; i < schemas.length; ++i) {
        const childSchema = schemas[i];
        const childSchemaKey = `${key}[${i}]`;
        if (childSchema.type === "any") {
            return [{ childSchemaKey, childSchema }];
        }
        if (childSchema.type === "union") {
            const retv = flatten(`${childSchemaKey}.schemas`, childSchema.schemas, flattened);
            if (retv !== flattened) {
                return retv;
            }
        }
        else {
            flattened.push({ childSchemaKey, childSchema });
        }
    }
    return flattened;
}
function addValidateUnion(ctx) {
    return ctx.addFunction((locals, name, value, depth, errors, schemas, validates) => {
        const maxDepth = MaxInt32 >> 1;
        const reduceMinDepthVar = addReduceMinDepth(ctx);
        const currentErrorsList = locals.add("[]");
        const thisErrors = locals.add("null");
        const currentMaxDepth = locals.add("-1");
        const thisDepth = locals.add("0");
        const i = locals.add("0");
        return `
                for (${i} = 0; ${i} < ${validates}.length; ++${i}) {
                    ${thisErrors} = ${validates}[${i}](${name}, ${value}, ${depth}, []);
                    if (${thisErrors}.length === 0) {
                        return ${errors};
                    }
                    ${thisDepth} = ${thisErrors}.reduce(${reduceMinDepthVar}, ${maxDepth})
                    if (${thisDepth} > ${currentMaxDepth}) {
                        ${currentErrorsList} = [${thisErrors}];
                        ${currentMaxDepth} = ${thisDepth};
                    } else if (${thisDepth} === ${currentMaxDepth}) {
                        ${currentErrorsList}.push(${thisErrors});
                    }
                }
                if (${currentErrorsList}.length === 1) {
                    ${currentErrorsList} = ${currentErrorsList}[0];
                    for (${i} = 0; ${i} < ${currentErrorsList}.length; ++${i}) {
                        ${errors}.push(${currentErrorsList}[${i}]);
                    }
                } else if (${currentErrorsList}.length >= 2) {
                    ${errors}.push({ code: "union", args: { name: ${name}, schemas: ${schemas} }, depth: ${depth} });
                }
                return ${errors};
            `;
    });
}
function addReduceMinDepth(ctx) {
    return ctx.addFunction((_locals, minDepth, error) => `
            return ${minDepth} <= ${error}.depth ? ${minDepth} : ${error}.depth;
        `);
}

const cache = new WeakMap();
function createValidationOfSchema(schema) {
    let validation = cache.get(schema);
    if (!validation) {
        const ctx = new BuildContext();
        const id = addValidation(ctx, "$schema", schema);
        validation = ctx.build(schema, id);
        cache.set(schema, validation);
    }
    return validation;
}
function addValidation(ctx, key, schema) {
    switch (schema.type) {
        case "any":
            return addValidationOfAnySchema(ctx);
        case "array":
            return addValidationOfArraySchema(ctx, key, schema);
        case "bigint":
            return addValidationOfBigIntSchema(ctx, key, schema);
        case "boolean":
            return addValidationOfBooleanSchema(ctx);
        case "class":
            return addValidationOfClassSchema(ctx, key, schema);
        case "custom":
            return addValidationOfCustomSchema(ctx, key, schema);
        case "enum":
            return addValidationOfEnumSchema(ctx, key, schema);
        case "function":
            return addValidationOfFunctionSchema(ctx);
        case "number":
            return addValidationOfNumberSchema(ctx, key, schema);
        case "object":
            return addValidationOfObjectSchema(ctx, key, schema);
        case "record":
            return addValidationOfRecordSchema(ctx, key, schema);
        case "string":
            return addValidationOfStringSchema(ctx, key, schema);
        case "symbol":
            return addValidationOfSymbolSchema(ctx);
        case "tuple":
            return addValidationOfTupleSchema(ctx, key, schema);
        case "union":
            return addValidationOfUnionSchema(ctx, key, schema);
        //istanbul ignore next
        default:
            throw new Error(`Unknown Schema: ${schema}`);
    }
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
        ? `"${name}" must be ${valueToString$1(values[0])}.`
        : `"${name}" must be any of ${listToString(values, "and", valueToString$1)}.`,
    function: ({ name }) => `"${name}" must be a function.`,
    number: ({ name }) => `"${name}" must be a number.`,
    numberDisallowInfinity: ({ name }) => `"${name}" must not be Infinity.`,
    numberDisallowNaN: ({ name }) => `"${name}" must not be NaN.`,
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
function valueToString$1(value) {
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
            return schema.values.map(valueToString$1);
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

/* eslint-disable class-methods-use-this */
class SchemaFactories {
    constructor() {
        /**
         * The schema for 64 bits signed integers.
         */
        this.bigInt64 = {
            type: "bigint",
            minValue: MinInt64,
            maxValue: MaxInt64,
        };
        /**
         * The schema for 64 bits unsigned integers.
         */
        this.bigUint64 = {
            type: "bigint",
            minValue: BigInt("0"),
            maxValue: MaxUint64,
        };
        /**
         * The schema for null.
         * Equivalent to `schemas.enum(null)`.
         */
        this.null = { type: "enum", values: [null] };
        /**
         * The schema for 8 bits signed integers.
         */
        this.int8 = {
            type: "number",
            allowInfinity: false,
            allowNaN: false,
            intOnly: true,
            maxValue: MaxInt8,
            minValue: MinInt8,
        };
        /**
         * The schema for 16 bits signed integers.
         */
        this.int16 = {
            type: "number",
            allowInfinity: false,
            allowNaN: false,
            intOnly: true,
            maxValue: MaxInt16,
            minValue: MinInt16,
        };
        /**
         * The schema for 32 bits signed integers.
         */
        this.int32 = {
            type: "number",
            allowInfinity: false,
            allowNaN: false,
            intOnly: true,
            maxValue: MaxInt32,
            minValue: MinInt32,
        };
        /**
         * The schema for 8 bits unsigned integers.
         */
        this.uint8 = {
            type: "number",
            allowInfinity: false,
            allowNaN: false,
            intOnly: true,
            maxValue: MaxUint8,
            minValue: 0,
        };
        /**
         * The schema for 16 bits unsigned integers.
         */
        this.uint16 = {
            type: "number",
            allowInfinity: false,
            allowNaN: false,
            intOnly: true,
            maxValue: MaxUint16,
            minValue: 0,
        };
        /**
         * The schema for 32 bits unsigned integers.
         */
        this.uint32 = {
            type: "number",
            allowInfinity: false,
            allowNaN: false,
            intOnly: true,
            maxValue: MaxUint32,
            minValue: 0,
        };
    }
    /**
     * The schema for any values.
     */
    any() {
        return { type: "any" };
    }
    // Implementation
    array(elements = { type: "any" }, { maxLength = MaxArrayLength, minLength = 0, unique = false, } = {}) {
        return { type: "array", elements, maxLength, minLength, unique };
    }
    /**
     * The schema for bigint values.
     * @param options The options.
     */
    bigInt({ maxValue, minValue, } = {}) {
        return { type: "bigint", maxValue, minValue };
    }
    /**
     * The schema for true or false.
     */
    boolean() {
        return { type: "boolean" };
    }
    /**
     * The schema for specific class instances.
     * @param constructor The constructor to use `instanceof` operations.
     */
    instanceOf(
    // eslint-disable-next-line no-shadow
    constructor) {
        return { type: "class", constructor };
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
        return { type: "enum", values };
    }
    /**
     * The schema for any functions.
     */
    function() {
        return { type: "function" };
    }
    /**
     * The schema for numbers.
     * @param options The options.
     */
    number({ allowInfinity = false, allowNaN = false, intOnly = false, maxValue, minValue, } = {}) {
        return {
            type: "number",
            allowInfinity,
            allowNaN,
            intOnly,
            maxValue,
            minValue,
        };
    }
    // Implementation
    object(properties, { allowUnknown = false, required = [], } = {}) {
        if (properties === undefined) {
            return {
                type: "object",
                allowUnknown: true,
                properties: {},
                required: [],
            };
        }
        return {
            type: "object",
            allowUnknown,
            properties,
            required: required === true ? Object.keys(properties) : required,
        };
    }
    // Implementation
    record(properties = { type: "any" }) {
        return { type: "record", properties };
    }
    /**
     * The schema for strings.
     * @param options The options.
     */
    string({ maxLength = MaxStringLength, minLength = 0, pattern, } = {}) {
        return { type: "string", maxLength, minLength, pattern };
    }
    /**
     * The schema for any symbols.
     */
    symbol() {
        return { type: "symbol" };
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
