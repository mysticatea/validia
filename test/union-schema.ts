import assert from "assert"
import { Schema, schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.anyOf(schemas.number(), schemas.string())", () => {
    const schema = schemas.anyOf(schemas.number(), schemas.string())

    it("should pass 1", () => {
        validate(schema, "x", 1)
    })

    it('should pass "foo"', () => {
        validate(schema, "x", "foo")
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a number or a string.'),
        )
    })

    it("should fail on object", () => {
        assert.throws(
            () => validate(schema, "x", {}),
            new Error('"x" must be a number or a string.'),
        )
    })

    it("should fail on boolean", () => {
        assert.throws(
            () => validate(schema, "x", true),
            new Error('"x" must be a number or a string.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number | string' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number | string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe('schemas.anyOf(schemas.number(), schemas.enum("auto", "none"))', () => {
    const schema = schemas.anyOf(
        schemas.number(),
        schemas.enum("auto" as const, "none" as const),
    )

    it("should pass 1", () => {
        validate(schema, "x", 1)
    })
    it('should pass "auto"', () => {
        validate(schema, "x", "auto")
    })
    it('should pass "none"', () => {
        validate(schema, "x", "none")
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be any of a number, "auto", and "none".'),
        )
    })

    it('should fail on "foo"', () => {
        assert.throws(
            () => validate(schema, "x", "foo"),
            new Error('"x" must be any of a number, "auto", and "none".'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number | string' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number | "auto" | "none">>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() }))", () => {
    const schema = schemas.anyOf(
        schemas.number(),
        schemas.string(),
        schemas.object({ value: schemas.number() }),
    )

    it("should pass 1", () => {
        validate(schema, "x", 1)
    })
    it('should pass "foo"', () => {
        validate(schema, "x", "foo")
    })
    it("should pass { value: 1 }", () => {
        validate(schema, "x", { value: 1 })
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be any of a number, a string, and an object.'),
        )
    })

    it('should fail on { value: "foo" }', () => {
        assert.throws(
            () => validate(schema, "x", { value: "foo" }),
            new Error('"x.value" must be a number.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number | string' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number | string | { value: number }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.anyOf(schemas.number())", () => {
    const schema = schemas.anyOf(schemas.number())

    it("should equal to schemas.number()", () => {
        assert.strictEqual(
            createValidationOfSchema(schema).toString(),
            createValidationOfSchema(schemas.number()).toString(),
        )
    })
})

describe('{ type: "union", schemas: [] }', () => {
    const schema: Schema.UnionSchema<never> = { type: "union", schemas: [] }

    it("should throw a fatail error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error("UnionSchema must have 1 or more schemas."),
        )
    })
})

describe("schemas.anyOf(/* all kinds of schema except any */)", () => {
    const schema = schemas.anyOf(
        schemas.array(),
        schemas.bigInt(),
        schemas.boolean(),
        schemas.instanceOf(RegExp),
        schemas.custom("xxxx-check", (x: unknown): x is never => false),
        schemas.enum(
            BigInt("1"),
            function myFunc() {
                myFunc()
            },
            () => {},
            2,
            "foo",
        ),
        schemas.function(),
        schemas.number(),
        schemas.object({ value: schemas.string() }),
        schemas.anyOf(schemas.string(), schemas.symbol(), schemas.tuple()),
    )

    it("should print the name of schemas if failed", () => {
        assert.throws(
            () => validate(schema, "x", {}),
            new Error(
                '"x" must be any of an array, a bigint value, a boolean value, a RegExp instance, xxxx-check, 1n, [function myFunc], [function (anonymous)], 2, "foo", a function, a number, an object, a string, a symbol, and a tuple.',
            ),
        )
    })
})

describe("schemas.anyOf(/* all kinds of schema */)", () => {
    const schema = schemas.anyOf(
        schemas.anyOf(
            schemas.any(),
            schemas.array(),
            schemas.bigInt(),
            schemas.boolean(),
        ),
        schemas.instanceOf(RegExp),
        schemas.custom("xxxx-check", (x: unknown): x is never => false),
        schemas.enum(
            BigInt("1"),
            function myFunc() {
                myFunc()
            },
            () => {},
            2,
            "foo",
        ),
        schemas.function(),
        schemas.number(),
        schemas.object({ value: schemas.string() }),
        schemas.string(),
        schemas.symbol(),
        schemas.tuple(),
    )

    it("should generate the same code as schemas.any()", () => {
        assert.strictEqual(
            createValidationOfSchema(schema).toString(),
            createValidationOfSchema(schemas.any()).toString(),
        )
    })
})
