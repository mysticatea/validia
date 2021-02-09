import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.tuple()", () => {
    const schema = schemas.tuple()

    it("should pass empty array", () => {
        validate(schema, "x", [])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a tuple.'),
        )
    })

    it("should fail on { length: 0 }", () => {
        assert.throws(
            () => validate(schema, "x", { length: 0 }),
            new Error('"x" must be a tuple.'),
        )
    })

    it("should fail on [0]", () => {
        assert.throws(
            () => validate(schema, "x", [0]),
            new Error('The length of "x" must be 0.'),
        )
    })

    it("should have no validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '[]' type", () => {
        const value: unknown = []
        validate(schema, "x", value)
        assertType<Equals<typeof value, []>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.tuple(schemas.any())", () => {
    const schema = schemas.tuple(schemas.any())

    it("should pass [0]", () => {
        validate(schema, "x", [0])
    })
    it('should pass ["foo"]', () => {
        validate(schema, "x", ["foo"])
    })
    it("should pass [null]", () => {
        validate(schema, "x", [null])
    })
    it("should pass [undefined]", () => {
        validate(schema, "x", [undefined])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a tuple.'),
        )
    })

    it("should fail on { length: 1 }", () => {
        assert.throws(
            () => validate(schema, "x", { length: 1 }),
            new Error('"x" must be a tuple.'),
        )
    })

    it("should fail on []", () => {
        assert.throws(
            () => validate(schema, "x", []),
            new Error('The length of "x" must be 1.'),
        )
    })

    it("should have no validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '[any]' type", () => {
        const value: unknown = [0]
        validate(schema, "x", value)
        assertType<Equals<typeof value, [any]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.tuple(schemas.string(), schemas.string())", () => {
    const schema = schemas.tuple(schemas.string(), schemas.string())

    it('should pass ["a", "b"]', () => {
        validate(schema, "x", ["a", "b"])
    })

    it("should fail on []", () => {
        assert.throws(
            () => validate(schema, "x", []),
            new Error(
                '"x" has multiple validation errors:\n' +
                    '- The length of "x" must be 2.\n' +
                    '- "x[0]" must be a string.\n' +
                    '- "x[1]" must be a string.',
            ),
        )
    })

    it("should fail on [1, 2]", () => {
        assert.throws(
            () => validate(schema, "x", [1, 2]),
            new Error(
                '"x" has multiple validation errors:\n' +
                    '- "x[0]" must be a string.\n' +
                    '- "x[1]" must be a string.',
            ),
        )
    })

    it('should fail on ["a", null]', () => {
        assert.throws(
            () => validate(schema, "x", ["a", null]),
            new Error('"x[1]" must be a string.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '[string, string]' type", () => {
        const value: unknown = ["a", "b"]
        validate(schema, "x", value)
        assertType<Equals<typeof value, [string, string]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
