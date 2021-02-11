import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.object()", () => {
    const schema = schemas.object()

    it("should pass empty object", () => {
        validate(schema, "x", {})
    })

    it("should pass empty array", () => {
        validate(schema, "x", [])
    })

    it("should pass object that has various kinds of properties", () => {
        validate(schema, "x", {
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
            () => validate(schema, "x", null),
            new Error('"x" must be an object.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "x", "foo"),
            new Error('"x" must be an object.'),
        )
    })

    it("should have no validation for properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'Record<number | string | symbol, any>' type", () => {
        const value: unknown = []
        validate(schema, "x", value)
        assertType<
            Equals<typeof value, Record<number | string | symbol, any>>
        >()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({})", () => {
    const schema = schemas.object({})

    it("should pass {}", () => {
        validate(schema, "x", {})
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an object.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "x", "/foo/u"),
            new Error('"x" must be an object.'),
        )
    })

    it("should fail on object that has properties", () => {
        assert.throws(
            () => validate(schema, "x", { foo: 1, bar: 2 }),
            new Error('"x" must not have unknown properties: foo,bar.'),
        )
    })

    it("should have validation, only for unknown properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{}' type", () => {
        const value: unknown = {}
        validate(schema, "x", value)
        assertType<Equals<typeof value, {}>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.object({ one: schemas.any(), two: schemas.any() })", () => {
    const schema = schemas.object({ one: schemas.any(), two: schemas.any() })

    it("should pass { one: 1, two: 2 }", () => {
        validate(schema, "x", { one: 1, two: 2 })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, "x", { one: "one", two: "two" })
    })
    it("should pass { one: null, two: null }", () => {
        validate(schema, "x", { one: null, two: null })
    })

    it("should fail on {}", () => {
        assert.throws(
            () => validate(schema, "x", {}),
            new Error('"x" must have the required properties: one,two.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, "x", {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                }),
            new Error('"x" must not have unknown properties: three,four.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, "x", { one: 1, three: 3 }),
            new Error(
                '"x" has multiple validation errors:\n' +
                    '- "x" must have the required property: two.\n' +
                    '- "x" must not have unknown property: three.',
            ),
        )
    })

    it("should have validation, but not have validations for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one: any; two: any }' type", () => {
        const value: unknown = { one: 1, two: 2 }
        validate(schema, "x", value)
        assertType<Equals<typeof value, { one: any; two: any }>>()
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

    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, "x", { one: "one", two: "two" })
    })

    it("should fail on {}", () => {
        assert.throws(
            () => validate(schema, "x", {}),
            new Error('"x" must have the required properties: one,two.'),
        )
    })

    it('should fail on { one: 1, two: "two" }', () => {
        assert.throws(
            () => validate(schema, "x", { one: 1, two: "two" }),
            new Error('"x.one" must be a string.'),
        )
    })

    it('should fail on { one: "one", two: null }', () => {
        assert.throws(
            () => validate(schema, "x", { one: "one", two: null }),
            new Error('"x.two" must be a string.'),
        )
    })

    it('should fail on { one: "one", two: undefined }', () => {
        assert.throws(
            () => validate(schema, "x", { one: "one", two: undefined }),
            new Error('"x.two" must be a string.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, "x", {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four",
                }),
            new Error('"x" must not have unknown properties: three,four.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, "x", { one: "one", three: "three" }),
            new Error(
                '"x" has multiple validation errors:\n' +
                    '- "x" must have the required property: two.\n' +
                    '- "x" must not have unknown property: three.',
            ),
        )
    })

    it("should have validation for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one: string; two: string }' type", () => {
        const value: unknown = { one: "one", two: "two" }
        validate(schema, "x", value)
        assertType<Equals<typeof value, { one: string; two: string }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.partialObject({ one: schemas.any(), two: schemas.any() })", () => {
    const schema = schemas.partialObject({
        one: schemas.any(),
        two: schemas.any(),
    })

    it("should pass {}", () => {
        validate(schema, "x", {})
    })
    it("should pass { one: 1 }", () => {
        validate(schema, "x", { one: 1 })
    })
    it('should pass { two: "two" }', () => {
        validate(schema, "x", { two: "two" })
    })
    it('should pass { one: "one", two: 2 }', () => {
        validate(schema, "x", { one: "one", two: 2 })
    })
    it("should pass { one: null, two: null }", () => {
        validate(schema, "x", { one: null, two: null })
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, "x", {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                }),
            new Error('"x" must not have unknown properties: three,four.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, "x", { one: 1, three: 3 }),
            new Error('"x" must not have unknown property: three.'),
        )
    })

    it("should have validation, but not have validations for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one?: any; two?: any }' type", () => {
        const value: unknown = {}
        validate(schema, "x", value)
        assertType<Equals<typeof value, { one?: any; two?: any }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.partialObject({ one: schemas.string(), two: schemas.string() })", () => {
    const schema = schemas.partialObject({
        one: schemas.string(),
        two: schemas.string(),
    })

    it("should pass {}", () => {
        validate(schema, "x", {})
    })
    it('should pass { one: "one" }', () => {
        validate(schema, "x", { one: "one" })
    })
    it('should pass { two: "two" }', () => {
        validate(schema, "x", { two: "two" })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, "x", { one: "one", two: "two" })
    })
    it("should pass { one: undefined, two: undefined }", () => {
        validate(schema, "x", { one: undefined, two: undefined })
    })

    it('should fail on { one: 1, two: "two" }', () => {
        assert.throws(
            () => validate(schema, "x", { one: 1, two: "two" }),
            new Error('"x.one" must be a string.'),
        )
    })
    it("should fail on { two: 2 }", () => {
        assert.throws(
            () => validate(schema, "x", { two: 2 }),
            new Error('"x.two" must be a string.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, "x", {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four",
                }),
            new Error('"x" must not have unknown properties: three,four.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, "x", { one: "one", three: "three" }),
            new Error('"x" must not have unknown property: three.'),
        )
    })

    it("should have validation for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one?: string; two?: string }' type", () => {
        const value: unknown = {}
        validate(schema, "x", value)
        assertType<Equals<typeof value, { one?: string; two?: string }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe('schemas.partialObject({ one: schemas.string(), two: schemas.string() }, ["one"])', () => {
    const schema = schemas.partialObject(
        { one: schemas.string(), two: schemas.string() },
        ["one"],
    )

    it('should pass { one: "one" }', () => {
        validate(schema, "x", { one: "one" })
    })
    it('should pass { one: "one", two: undefined }', () => {
        validate(schema, "x", { one: "one", two: undefined })
    })
    it('should pass { one: "one", two: "two" }', () => {
        validate(schema, "x", { one: "one", two: "two" })
    })

    it("should fail on {}", () => {
        assert.throws(
            () => validate(schema, "x", {}),
            new Error('"x" must have the required property: one.'),
        )
    })
    it('should fail on { two: "two" }', () => {
        assert.throws(
            () => validate(schema, "x", { two: "two" }),
            new Error('"x" must have the required property: one.'),
        )
    })
    it("should fail on { one: null, two: null }", () => {
        assert.throws(
            () => validate(schema, "x", { one: null, two: null }),
            new Error(
                '"x" has multiple validation errors:\n' +
                    '- "x.one" must be a string.\n' +
                    '- "x.two" must be a string.',
            ),
        )
    })
    it('should fail on { one: 1, two: "two" }', () => {
        assert.throws(
            () => validate(schema, "x", { one: 1, two: "two" }),
            new Error('"x.one" must be a string.'),
        )
    })

    it("should fail on object that has extra properties", () => {
        assert.throws(
            () =>
                validate(schema, "x", {
                    one: "one",
                    two: "two",
                    three: "three",
                    four: "four",
                }),
            new Error('"x" must not have unknown properties: three,four.'),
        )
    })

    it("should fail on object that has different properties", () => {
        assert.throws(
            () => validate(schema, "x", { one: "one", three: "three" }),
            new Error('"x" must not have unknown property: three.'),
        )
    })

    it("should have validation for property values", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '{ one: string; two?: string }' type", () => {
        const value: unknown = { one: "one" }
        validate(schema, "x", value)
        assertType<Equals<typeof value, { one: string; two?: string }>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe('schemas.partialObject({ one: schemas.string() }, ["two"])', () => {
    const schema = schemas.partialObject({ one: schemas.string() }, [
        "two" as any,
    ])

    it("should throw a fatal error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error(
                '"two" was in "$schema.required", so it must exist in "$schema.properties".',
            ),
        )
    })
})
