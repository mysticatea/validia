// Generated by dts-bundle-generator v5.6.0

/**
 * All schema.
 */
export declare type Schema = Schema.AnySchema | Schema.ArraySchema<Schema> | Schema.BigIntSchema | Schema.BooleanSchema | Schema.ClassSchema<any> | Schema.CustomSchema<any> | Schema.EnumSchema<any> | Schema.FunctionSchema | Schema.NumberSchema | Schema.ObjectSchema<Record<string, Schema>, any, boolean> | Schema.RecordSchema<Schema> | Schema.StringSchema | Schema.SymbolSchema | Schema.TupleSchema<readonly Schema[]> | Schema.UnionSchema<Schema>;
export declare namespace Schema {
	/**
	 * The schema that allows any values.
	 */
	interface AnySchema {
		/** The schema type. */
		readonly type: "any";
	}
	/**
	 * The schema for arrays.
	 */
	interface ArraySchema<T extends Schema> {
		/** The schema type. */
		readonly type: "array";
		/** The schema of elements. */
		readonly elements: T;
		/** The maximum length. */
		readonly maxLength?: number;
		/** The minimum length. */
		readonly minLength?: number;
		/** The flag to disallow duplicated values. */
		readonly unique?: boolean;
	}
	/**
	 * The schema for bigint values.
	 */
	interface BigIntSchema {
		/** The schema type. */
		readonly type: "bigint";
		/** The maximum value. */
		readonly maxValue?: bigint;
		/** The minimum value. */
		readonly minValue?: bigint;
	}
	/**
	 * The schema for arrays.
	 */
	interface BooleanSchema {
		/** The schema type. */
		readonly type: "boolean";
	}
	/**
	 * The schema for class instances.
	 */
	interface ClassSchema<T> {
		/** The schema type. */
		readonly type: "class";
		/** The constructor of allowed instances. */
		readonly constructor: {
			new (...args: any[]): T;
			prototype: T;
			name: string;
		};
	}
	/**
	 * The schema for user-defined checks.
	 */
	interface CustomSchema<T> {
		/** The schema type. */
		readonly type: "custom";
		/** The name to show in error messages. */
		readonly name: string;
		/** The check logic. */
		readonly check: (x: unknown) => x is T;
	}
	/**
	 * The schema for any of listed values.
	 */
	interface EnumSchema<T> {
		/** The schema type. */
		readonly type: "enum";
		/** The allowed values. */
		readonly values: readonly T[];
	}
	/**
	 * The schema for functions.
	 */
	interface FunctionSchema {
		/** The schema type. */
		readonly type: "function";
	}
	/**
	 * The schema for numbers.
	 */
	interface NumberSchema {
		/** The schema type. */
		readonly type: "number";
		/** The flag to allow `Infinity` and `-Infinity`. Infinities are disallowed by default. */
		readonly allowInfinity?: boolean;
		/** The flag to allow `NaN`. `NaN` is disallowed by default. */
		readonly allowNaN?: boolean;
		/** The flag to disallow non-integer values. */
		readonly intOnly?: boolean;
		/** The maximum value. */
		readonly maxValue?: number;
		/** The minimum value. */
		readonly minValue?: number;
	}
	/**
	 * The schema for plain objects.
	 */
	interface ObjectSchema<TProperties extends Record<string | number, Schema>, TRequired extends keyof TProperties, TAllowUnknown extends boolean> {
		/** The schema type. */
		readonly type: "object";
		/** The flag to allow unknown properties. */
		readonly allowUnknown?: TAllowUnknown;
		/** The schema of known properties. */
		readonly properties: TProperties;
		/** The name of required properties. */
		readonly required?: readonly TRequired[];
	}
	/**
	 * The schema for record objects.
	 */
	interface RecordSchema<T extends Schema> {
		/** The schema type. */
		readonly type: "record";
		/** The schema of known properties. */
		readonly properties: T;
	}
	/**
	 * The schema for strings.
	 */
	interface StringSchema {
		/** The schema type. */
		readonly type: "string";
		/** The maximum length. */
		readonly maxLength?: number;
		/** The minimum length. */
		readonly minLength?: number;
		/** The allowed pattern. */
		readonly pattern?: RegExp;
	}
	/**
	 * The schema for symbols.
	 */
	interface SymbolSchema {
		/** The schema type. */
		readonly type: "symbol";
	}
	/**
	 * The schema for tuples.
	 */
	interface TupleSchema<T extends readonly Schema[]> {
		/** The schema type. */
		readonly type: "tuple";
		/** The schema of elements */
		readonly elements: T;
	}
	/**
	 * The schema for satisfying any of listed schemas.
	 */
	interface UnionSchema<T extends Schema> {
		/** The schema type. */
		readonly type: "union";
		/** The schemas of allowed values. */
		readonly schemas: readonly T[];
	}
}
export interface Message {
	array(vars: {
		name: string;
	}): string;
	arrayMaxLength(vars: {
		name: string;
		maxLength: number;
	}): string;
	arrayMinLength(vars: {
		name: string;
		minLength: number;
	}): string;
	arrayUnique(vars: {
		name: string;
	}): string;
	bigint(vars: {
		name: string;
	}): string;
	bigintMaxValue(vars: {
		name: string;
		maxValue: bigint;
	}): string;
	bigintMinValue(vars: {
		name: string;
		minValue: bigint;
	}): string;
	boolean(vars: {
		name: string;
	}): string;
	class(vars: {
		name: string;
		constructor: Function;
	}): string;
	custom(vars: {
		name: string;
		checkFunc: Function;
		checkName: string;
	}): string;
	enum(vars: {
		name: string;
		values: readonly any[];
	}): string;
	function(vars: {
		name: string;
	}): string;
	number(vars: {
		name: string;
	}): string;
	numberDisallowInfinity(vars: {
		name: string;
	}): string;
	numberDisallowNaN(vars: {
		name: string;
	}): string;
	numberIntOnly(vars: {
		name: string;
	}): string;
	numberMaxValue(vars: {
		name: string;
		maxValue: number;
	}): string;
	numberMinValue(vars: {
		name: string;
		minValue: number;
	}): string;
	object(vars: {
		name: string;
	}): string;
	objectRequiredKeys(vars: {
		name: string;
		keys: readonly string[];
	}): string;
	objectUnknownKeys(vars: {
		name: string;
		keys: readonly string[];
	}): string;
	string(vars: {
		name: string;
	}): string;
	stringMaxLength(vars: {
		name: string;
		maxLength: number;
	}): string;
	stringMinLength(vars: {
		name: string;
		minLength: number;
	}): string;
	stringPattern(vars: {
		name: string;
		pattern: RegExp;
	}): string;
	symbol(vars: {
		name: string;
	}): string;
	tuple(vars: {
		name: string;
	}): string;
	tupleLength(vars: {
		name: string;
		length: number;
	}): string;
	union(vars: {
		name: string;
		schemas: readonly Exclude<Schema, Schema.AnySchema | Schema.UnionSchema<any>>[];
	}): string;
	validation(vars: {
		name: string;
		errors: readonly string[];
	}): string;
}
export declare const DefaultMessage: Message;
/**
 * The type function to derive the type of schemas.
 */
export declare type TypeOf<T extends Schema> = TypeOf.AnySchema<T> | TypeOf.ArraySchema<T> | TypeOf.BigIntSchema<T> | TypeOf.BooleanSchema<T> | TypeOf.ClassSchema<T> | TypeOf.CustomSchema<T> | TypeOf.EnumSchema<T> | TypeOf.FunctionSchema<T> | TypeOf.NumberSchema<T> | TypeOf.ObjectSchema<T> | TypeOf.RecordSchema<T> | TypeOf.StringSchema<T> | TypeOf.SymbolSchema<T> | TypeOf.TupleSchema<T> | TypeOf.UnionSchema<T>;
export declare namespace TypeOf {
	/**
	 * The type function to derive the type of schemas.
	 */
	type AnySchema<T extends Schema> = T extends Schema.AnySchema ? any : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type ArraySchema<T extends Schema> = T extends Schema.ArraySchema<infer U> ? TypeOf<U>[] : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type BigIntSchema<T extends Schema> = T extends Schema.BigIntSchema ? bigint : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type BooleanSchema<T extends Schema> = T extends Schema.BooleanSchema ? boolean : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type ClassSchema<T extends Schema> = T extends Schema.ClassSchema<infer U> ? U : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type CustomSchema<T extends Schema> = T extends Schema.CustomSchema<infer U> ? U : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type EnumSchema<T extends Schema> = T extends Schema.EnumSchema<infer U> ? U : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type FunctionSchema<T extends Schema> = T extends Schema.FunctionSchema ? (...args: any[]) => any : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type NumberSchema<T extends Schema> = T extends Schema.NumberSchema ? number : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type ObjectSchema<T extends Schema> = T extends Schema.ObjectSchema<infer P, infer R, infer A> ? ObjectSchema.Flatten<ObjectSchema.KnownProperties<P, R> & ObjectSchema.UnknownProperties<A>> : never;
	namespace ObjectSchema {
		type KnownProperties<P extends Record<string | number, Schema>, R extends keyof P> = {
			[K in Extract<keyof P, R>]: TypeOf<P[K]>;
		} & {
			[K in Exclude<keyof P, R>]?: TypeOf<P[K]> | undefined;
		};
		type UnknownProperties<A extends boolean> = A extends true ? Record<string | number, unknown> : {};
		type Flatten<T> = T extends any ? {
			[P in keyof T]: T[P];
		} : never;
	}
	/**
	 * The type function to derive the type of schemas.
	 */
	type RecordSchema<T extends Schema> = T extends Schema.RecordSchema<infer U> ? Record<number | string | symbol, TypeOf<U>> : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type StringSchema<T extends Schema> = T extends Schema.StringSchema ? string : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type SymbolSchema<T extends Schema> = T extends Schema.SymbolSchema ? symbol : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type TupleSchema<T extends Schema> = T extends Schema.TupleSchema<infer U> ? U extends readonly any[] ? {
		[P in keyof U]: TypeOf<U[P]>;
	} : never : never;
	/**
	 * The type function to derive the type of schemas.
	 */
	type UnionSchema<T extends Schema> = T extends Schema.UnionSchema<infer U> ? TypeOf<U> : never;
}
export declare type Validate<T extends Schema> = (name: string, value: any) => asserts value is TypeOf<T>;
export declare function createValidation<T extends Schema>(schema: T, { messages }?: createValidation.Options): Validate<T>;
export declare namespace createValidation {
	type Options = {
		messages?: Message;
	};
}
declare class SchemaFactories {
	/**
	 * The schema for any values.
	 */
	any(): Schema.AnySchema;
	/**
	 * The schema for array instances.
	 * @param elements The schema of element types.
	 * @param options The options.
	 */
	array(): Schema.ArraySchema<Schema.AnySchema>;
	/**
	 * The schema for array instances.
	 * @param elements The schema of element types.
	 * @param options The options.
	 */
	array<T extends Schema>(elements: T, options?: Omit<Schema.ArraySchema<T>, "type" | "elements">): Schema.ArraySchema<T>;
	/**
	 * The schema for bigint values.
	 * @param options The options.
	 */
	bigInt({ maxValue, minValue, }?: Omit<Schema.BigIntSchema, "type">): Schema.BigIntSchema;
	/**
	 * The schema for 64 bits signed integers.
	 */
	bigInt64: Schema.BigIntSchema;
	/**
	 * The schema for 64 bits unsigned integers.
	 */
	bigUint64: Schema.BigIntSchema;
	/**
	 * The schema for true or false.
	 */
	boolean(): Schema.BooleanSchema;
	/**
	 * The schema for specific class instances.
	 * @param constructor The constructor to use `instanceof` operations.
	 */
	instanceOf<T>(constructor: Schema.ClassSchema<T>["constructor"]): Schema.ClassSchema<T>;
	/**
	 * The schema for user-defined checks.
	 * @param name The name of the valid values. This name will be shown in error messages.
	 * @param check The check.
	 */
	custom<T>(name: string, check: (x: any) => x is T): Schema.CustomSchema<T>;
	/**
	 * The schema for any of listed values.
	 * @param firstValue One of allowed values.
	 * @param restValues Rest of allowed values.
	 */
	enum<T, U extends readonly any[]>(firstValue: T, ...restValues: U): Schema.EnumSchema<T | U[number]>;
	/**
	 * The schema for null.
	 * Equivalent to `schemas.enum(null)`.
	 */
	null: Schema.EnumSchema<null>;
	/**
	 * The schema for any functions.
	 */
	function(): Schema.FunctionSchema;
	/**
	 * The schema for numbers.
	 * @param options The options.
	 */
	number({ allowInfinity, allowNaN, intOnly, maxValue, minValue, }?: Omit<Schema.NumberSchema, "type">): Schema.NumberSchema;
	/**
	 * The schema for 8 bits signed integers.
	 */
	int8: Schema.NumberSchema;
	/**
	 * The schema for 16 bits signed integers.
	 */
	int16: Schema.NumberSchema;
	/**
	 * The schema for 32 bits signed integers.
	 */
	int32: Schema.NumberSchema;
	/**
	 * The schema for 8 bits unsigned integers.
	 */
	uint8: Schema.NumberSchema;
	/**
	 * The schema for 16 bits unsigned integers.
	 */
	uint16: Schema.NumberSchema;
	/**
	 * The schema for 32 bits unsigned integers.
	 */
	uint32: Schema.NumberSchema;
	/**
	 * The schema for any objects.
	 */
	object(): Schema.ObjectSchema<{}, never, true>;
	/**
	 * The schema for plain objects. All known properties are optional.
	 * @param properties The schema of known properties.
	 */
	object<TProperties extends Record<string | number, Schema>>(properties: TProperties): Schema.ObjectSchema<TProperties, never, false>;
	/**
	 * The schema for plain objects. All known properties are optional.
	 * @param properties The schema of known properties.
	 * @param options The options.
	 */
	object<TProperties extends Record<string | number, Schema>>(properties: TProperties, options: Record<string | number | symbol, never>): Schema.ObjectSchema<TProperties, never, false>;
	/**
	 * The schema for plain objects. All known properties are optional.
	 * @param properties The schema of known properties.
	 * @param options The options.
	 */
	object<TProperties extends Record<string | number, Schema>, TAllowUnknown extends boolean>(properties: TProperties, options: {
		allowUnknown: TAllowUnknown;
	}): Schema.ObjectSchema<TProperties, never, TAllowUnknown>;
	/**
	 * The schema for plain objects. All known properties are required.
	 * @param properties The schema of known properties.
	 * @param options The options.
	 */
	object<TProperties extends Record<string | number, Schema>>(properties: TProperties, options: {
		required: true;
	}): Schema.ObjectSchema<TProperties, keyof TProperties, false>;
	/**
	 * The schema for plain objects. Specified known properties are required.
	 * @param properties The schema of known properties.
	 * @param options The options.
	 */
	object<TProperties extends Record<string | number, Schema>, TRequired extends keyof TProperties>(properties: TProperties, options: {
		required: readonly TRequired[];
	}): Schema.ObjectSchema<TProperties, TRequired, false>;
	/**
	 * The schema for plain objects. All known properties are required.
	 * @param properties The schema of known properties.
	 * @param options The options.
	 */
	object<TProperties extends Record<string | number, Schema>, TAllowUnknown extends boolean>(properties: TProperties, options: {
		allowUnknown: TAllowUnknown;
		required: true;
	}): Schema.ObjectSchema<TProperties, keyof TProperties, TAllowUnknown>;
	/**
	 * The schema for plain objects. Specific properties are required.
	 * @param properties The schema of known properties.
	 * @param options The options.
	 */
	object<TProperties extends Record<string | number, Schema>, TRequired extends keyof TProperties, TAllowUnknown extends boolean>(properties: TProperties, options: {
		allowUnknown: TAllowUnknown;
		required: readonly TRequired[];
	}): Schema.ObjectSchema<TProperties, TRequired, TAllowUnknown>;
	/**
	 * The schema for any objects.
	 */
	record(): Schema.RecordSchema<Schema.AnySchema>;
	/**
	 * The schema for plain objects.
	 * @param properties The schema of properties.
	 */
	record<T extends Schema>(properties: T): Schema.RecordSchema<T>;
	/**
	 * The schema for strings.
	 * @param options The options.
	 */
	string({ maxLength, minLength, pattern, }?: Omit<Schema.StringSchema, "type">): Schema.StringSchema;
	/**
	 * The schema for any symbols.
	 */
	symbol(): Schema.SymbolSchema;
	/**
	 * The schema for tuples.
	 * @param elements The schema of elements.
	 */
	tuple<T extends readonly Schema[]>(...elements: T): Schema.TupleSchema<T>;
	/**
	 * The schema for any of listed schemas.
	 * @param firstSchema One of allowed schemas.
	 * @param restSchemas Rest of allowed schemas.
	 */
	anyOf<T extends Schema, U extends readonly Schema[]>(firstSchema: T, ...restSchemas: U): Schema.UnionSchema<T | U[number]>;
}
/**
 * The schema factories.
 */
export declare const schemas: Readonly<SchemaFactories>;
export declare function validate<T extends Schema>(schema: T, name: string, value: any, { messages }?: validate.Options): asserts value is TypeOf<T>;
export declare namespace validate {
	type Options = {
		messages?: Message;
	};
}
export declare class ValidationError extends Error {
	readonly errors: readonly ValidationError.ErrorInfo[];
	constructor(message: Message, name: string, errors: ValidationError.ErrorInfo[]);
}
export declare namespace ValidationError {
	type ErrorCode = Exclude<keyof Message, "validation">;
	type ErrorInfo = {
		[P in ErrorCode]: {
			code: P;
			args: Parameters<Message[P]>[0];
			depth: number;
		};
	}[ErrorCode];
}

export {};
