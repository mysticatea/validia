import assert from "assert"
import { Schema, schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot, assertThrows } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.anyOf(schemas.number(), schemas.string())", () => {
    const schema = schemas.anyOf(schemas.number(), schemas.string())

    it("should pass 1", () => {
        validate(schema, 1)
    })

    it('should pass "foo"', () => {
        validate(schema, "foo")
    })

    it("should fail on null", () => {
        assertThrows(() => validate(schema, null))
    })

    it("should fail on object", () => {
        assertThrows(() => validate(schema, {}))
    })

    it("should fail on boolean", () => {
        assertThrows(() => validate(schema, true))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number | string' type", () => {
        const value: unknown = 0
        validate(schema, value)
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
        validate(schema, 1)
    })
    it('should pass "auto"', () => {
        validate(schema, "auto")
    })
    it('should pass "none"', () => {
        validate(schema, "none")
    })

    it("should fail on null", () => {
        assertThrows(() => validate(schema, null))
    })

    it('should fail on "foo"', () => {
        assertThrows(() => validate(schema, "foo"))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number | string' type", () => {
        const value: unknown = 0
        validate(schema, value)
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
        schemas.object({ value: schemas.number() }, { required: true }),
    )

    it("should pass 1", () => {
        validate(schema, 1)
    })
    it('should pass "foo"', () => {
        validate(schema, "foo")
    })
    it("should pass { value: 1 }", () => {
        validate(schema, { value: 1 })
    })

    it("should fail on null", () => {
        assertThrows(() => validate(schema, null))
    })

    it('should fail on { value: "foo" }, with the error message of the nearest choice', () => {
        assertThrows(() => validate(schema, { value: "foo" }))
    })

    it('should fail on { valu: "foo" }, with the error message of the nearest choice', () => {
        assertThrows(() => validate(schema, { vale: "foo" }))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number | string' type", () => {
        const value: unknown = 0
        validate(schema, value)
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
    const schema: Schema.Union<never> = { type: "union", schemas: [] }

    it("should throw a fatail error on compile", () => {
        assertThrows(() => createValidationOfSchema(schema))
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
        schemas.object({ string: schemas.string() }, { required: true }),
        schemas.object({ number: schemas.number() }, { required: true }),
        schemas.anyOf(schemas.string(), schemas.symbol(), schemas.tuple()),
    )

    it("should print the name of schemas if failed", () => {
        assertThrows(() => validate(schema, {}))
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
        schemas.object({ value: schemas.string() }, { required: true }),
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

describe("schemas.anyOf(/* includes the same schema */)", () => {
    const schema = schemas.anyOf(
        schemas.anyOf(schemas.array(), schemas.bigInt(), schemas.boolean()),
        schemas.anyOf(schemas.array(), schemas.number(), schemas.string()),
    )

    it("should check once for the same schema", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})
