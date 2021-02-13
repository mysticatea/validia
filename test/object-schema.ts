import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.object()", () => {
    const schema = schemas.object()

    it("should pass empty object", () => {
        validate(schema, {})
    })

    it("should pass empty array", () => {
        validate(schema, [])
    })

    it("should pass object that has various kinds of properties", () => {
        validate(schema, {
            n: 1,
            s: "str",
            b: true,
            o: {},
            f() {
                // empty
            },
        })
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an object.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "foo"),
            new Error('"value" must be an object.'),
        )
    })

    it("should have no validation for properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'Record<number | string | symbol, any>' type", () => {
        const value: unknown = []
        validate(schema, value)
        assertType<Equals<typeof value, Record<number | string, unknown>>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({})", () => {
    const schema = schemas.object({})

    it("should pass {}", () => {
        validate(schema, {})
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an object.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "/foo/u"),
            new Error('"value" must be an object.'),
        )
    })

    it("should fail on object that has properties", () => {
        assert.throws(
            () => validate(schema, { foo: 1, bar: 2 }),
            new Error('"value" must not have unknown properties: bar,foo.'),
        )
    })

    it("should have validation, only for unknown properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{}' type", () => {
        const value: unknown = {}
        validate(schema, value)
        assertType<Equals<typeof value, {}>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({ one: schemas.any(), two: schemas.any() })", () => {
    const schema = schemas.object({
        one: schemas.any(),
        two: schemas.any(),
    })

    it("should pass {}", () => {
        validate(schema, {})
    })
    it("should pass { one: 1 }", () => {
        validate(schema, { one: 1 })
    })
    it('should pass { two: "two" }', () => {
        validate(schema, { two: "two" })
    })
    it('should pass { one: "one", two: 2 }', () => {
        validate(schema, { one: "one", two: 2 })
    })
    it("should pass { one: null, two: null }", () => {
        validate(schema, { one: null, two: null })
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                }),
            new Error('"value" must not have unknown properties: four,three.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, { one: 1, three: 3 }),
            new Error('"value" must not have unknown property: three.'),
        )
    })

    it("should have validation, but not have validations for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one?: any; two?: any }' type", () => {
        const value: unknown = {}
        validate(schema, value)
        assertType<Equals<typeof value, { one?: any; two?: any }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({ one: schemas.string(), two: schemas.string() })", () => {
    const schema = schemas.object({
        one: schemas.string(),
        two: schemas.string(),
    })

    it("should pass {}", () => {
        validate(schema, {})
    })
    it('should pass { one: "one" }', () => {
        validate(schema, { one: "one" })
    })
    it('should pass { two: "two" }', () => {
        validate(schema, { two: "two" })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, { one: "one", two: "two" })
    })
    it("should pass { one: undefined, two: undefined }", () => {
        validate(schema, { one: undefined, two: undefined })
    })

    it('should fail on { one: 1, two: "two" }', () => {
        assert.throws(
            () => validate(schema, { one: 1, two: "two" }),
            new Error('"value.one" must be a string.'),
        )
    })
    it("should fail on { two: 2 }", () => {
        assert.throws(
            () => validate(schema, { two: 2 }),
            new Error('"value.two" must be a string.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four",
                }),
            new Error('"value" must not have unknown properties: four,three.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, { one: "one", three: "three" }),
            new Error('"value" must not have unknown property: three.'),
        )
    })

    it("should have validation for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one?: string; two?: string }' type", () => {
        const value: unknown = {}
        validate(schema, value)
        assertType<Equals<typeof value, { one?: string; two?: string }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({ one: schemas.any(), two: schemas.any() }, { allowUnknown: true })", () => {
    const schema = schemas.object(
        { one: schemas.any(), two: schemas.any() },
        { allowUnknown: true },
    )

    it("should generate the same code as schemas.object()", () => {
        assert.strictEqual(
            createValidationOfSchema(schema).toString(),
            createValidationOfSchema(schemas.object()).toString(),
        )
    })
})

describe("schemas.object({ one: schemas.any(), two: schemas.string() }, { allowUnknown: true })", () => {
    const schema = schemas.object(
        { one: schemas.any(), two: schemas.string() },
        { allowUnknown: true },
    )

    it("should pass {}", () => {
        validate(schema, {})
    })
    it("should pass { one: 1 }", () => {
        validate(schema, { one: 1 })
    })
    it('should pass { two: "two" }', () => {
        validate(schema, { two: "two" })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, { one: "one", two: "two" })
    })
    it('should pass { one: null, two: "two", three: 3 }', () => {
        validate(schema, { one: null, two: "two", three: 3 })
    })

    it("should fail on { two: 2 }", () => {
        assert.throws(
            () => validate(schema, { two: 2 }),
            new Error('"value.two" must be a string.'),
        )
    })

    it("should have validation, but not have validations for extra properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ [x: string]: unknown; [x: number]: unknown; one?: any; two?: string }' type", () => {
        const value: unknown = {}
        validate(schema, value)
        assertType<
            Equals<
                typeof value,
                {
                    [x: string]: unknown
                    [x: number]: unknown
                    one?: any
                    two?: string
                }
            >
        >()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe('schemas.object({ one: schemas.string(), two: schemas.string() }, { required: ["one"] })', () => {
    const schema = schemas.object(
        { one: schemas.string(), two: schemas.string() },
        { required: ["one"] },
    )

    it('should pass { one: "one" }', () => {
        validate(schema, { one: "one" })
    })
    it('should pass { one: "one", two: undefined }', () => {
        validate(schema, { one: "one", two: undefined })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, { one: "one", two: "two" })
    })

    it("should fail on {}", () => {
        assert.throws(
            () => validate(schema, {}),
            new Error('"value" must have the required property: one.'),
        )
    })
    it('should fail on { two: "two" }', () => {
        assert.throws(
            () => validate(schema, { two: "two" }),
            new Error('"value" must have the required property: one.'),
        )
    })
    it("should fail on { one: null, two: null }", () => {
        assert.throws(
            () => validate(schema, { one: null, two: null }),
            new Error(
                '"value" has 2 validation errors:\n' +
                    '- "value.one" must be a string.\n' +
                    '- "value.two" must be a string.',
            ),
        )
    })
    it('should fail on { one: 1, two: "two" }', () => {
        assert.throws(
            () => validate(schema, { one: 1, two: "two" }),
            new Error('"value.one" must be a string.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four",
                }),
            new Error('"value" must not have unknown properties: four,three.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, { one: "one", three: "three" }),
            new Error('"value" must not have unknown property: three.'),
        )
    })

    it("should have validation for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one: string; two?: string }' type", () => {
        const value: unknown = { one: "one" }
        validate(schema, value)
        assertType<Equals<typeof value, { one: string; two?: string }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe('schemas.object({ one: schemas.string() }, { required: ["two"] })', () => {
    const schema = schemas.object(
        { one: schemas.string() },
        { required: ["two" as any] },
    )

    it("should throw a fatal error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error(
                '"two" was in "$schema.required", so it must exist in "$schema.properties".',
            ),
        )
    })
})

describe("schemas.object({ one: schemas.any(), two: schemas.any() }, { required: true })", () => {
    const schema = schemas.object(
        { one: schemas.any(), two: schemas.any() },
        { required: true },
    )

    it("should pass { one: 1, two: 2 }", () => {
        validate(schema, { one: 1, two: 2 })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, { one: "one", two: "two" })
    })
    it("should pass { one: null, two: null }", () => {
        validate(schema, { one: null, two: null })
    })

    it("should fail on {}", () => {
        assert.throws(
            () => validate(schema, {}),
            new Error('"value" must have the required properties: one,two.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                }),
            new Error('"value" must not have unknown properties: four,three.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, { one: 1, three: 3 }),
            new Error(
                '"value" has 2 validation errors:\n' +
                    '- "value" must have the required property: two.\n' +
                    '- "value" must not have unknown property: three.',
            ),
        )
    })

    it("should have validation, but not have validations for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one: any; two: any }' type", () => {
        const value: unknown = { one: 1, two: 2 }
        validate(schema, value)
        assertType<Equals<typeof value, { one: any; two: any }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true })", () => {
    const schema = schemas.object(
        { one: schemas.string(), two: schemas.string() },
        { required: true },
    )

    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, { one: "one", two: "two" })
    })

    it("should fail on {}", () => {
        assert.throws(
            () => validate(schema, {}),
            new Error('"value" must have the required properties: one,two.'),
        )
    })

    it('should fail on { one: 1, two: "two" }', () => {
        assert.throws(
            () => validate(schema, { one: 1, two: "two" }),
            new Error('"value.one" must be a string.'),
        )
    })

    it('should fail on { one: "one", two: null }', () => {
        assert.throws(
            () => validate(schema, { one: "one", two: null }),
            new Error('"value.two" must be a string.'),
        )
    })

    it('should fail on { one: "one", two: undefined }', () => {
        assert.throws(
            () => validate(schema, { one: "one", two: undefined }),
            new Error('"value.two" must be a string.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four",
                }),
            new Error('"value" must not have unknown properties: four,three.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, { one: "one", three: "three" }),
            new Error(
                '"value" has 2 validation errors:\n' +
                    '- "value" must have the required property: two.\n' +
                    '- "value" must not have unknown property: three.',
            ),
        )
    })

    it("should have validation for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one: string; two: string }' type", () => {
        const value: unknown = { one: "one", two: "two" }
        validate(schema, value)
        assertType<Equals<typeof value, { one: string; two: string }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe('schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: ["one"] })', () => {
    const schema = schemas.object(
        { one: schemas.string(), two: schemas.string() },
        { allowUnknown: true, required: ["one"] },
    )

    it('should pass { one: "one" }', () => {
        validate(schema, { one: "one" })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, { one: "one", two: "two" })
    })
    it('should pass { one: "one", two: "two", three: 3 }', () => {
        validate(schema, { one: "one", two: "two", three: 3 })
    })

    it('should fail on { two: "two" }', () => {
        assert.throws(
            () => validate(schema, { two: "two" }),
            new Error('"value" must have the required property: one.'),
        )
    })

    it('should fail on { two: "two", three: 3 }', () => {
        assert.throws(
            () => validate(schema, { two: "two" }),
            new Error('"value" must have the required property: one.'),
        )
    })

    it("should have validation, but not have validations for extra properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ [x: string]: unknown; [x: number]: unknown; one: any; two?: string }' type", () => {
        const value: unknown = { one: "one" }
        validate(schema, value)
        assertType<
            Equals<
                typeof value,
                {
                    [x: string]: unknown
                    [x: number]: unknown
                    one: string
                    two?: string
                }
            >
        >()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: true })", () => {
    const schema = schemas.object(
        { one: schemas.string(), two: schemas.string() },
        { allowUnknown: true, required: true },
    )

    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, { one: "one", two: "two" })
    })
    it('should pass { one: "one", two: "two", three: 3 }', () => {
        validate(schema, { one: "one", two: "two", three: 3 })
    })

    it('should fail on { one: "one" }', () => {
        assert.throws(
            () => validate(schema, { one: "one" }),
            new Error('"value" must have the required property: two.'),
        )
    })

    it('should fail on { two: "two" }', () => {
        assert.throws(
            () => validate(schema, { two: "two" }),
            new Error('"value" must have the required property: one.'),
        )
    })

    it('should fail on { two: "two", three: 3 }', () => {
        assert.throws(
            () => validate(schema, { two: "two" }),
            new Error('"value" must have the required property: one.'),
        )
    })

    it("should have validation, but not have validations for extra properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ [x: string]: unknown; [x: number]: unknown; one: any; two: string }' type", () => {
        const value: unknown = { one: "one", two: "two" }
        validate(schema, value)
        assertType<
            Equals<
                typeof value,
                {
                    [x: string]: unknown
                    [x: number]: unknown
                    one: string
                    two: string
                }
            >
        >()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
