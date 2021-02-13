import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.tuple()", () => {
    const schema = schemas.tuple()

    it("should pass empty array", () => {
        validate(schema, [])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be a tuple.'),
        )
    })

    it("should fail on { length: 0 }", () => {
        assert.throws(
            () => validate(schema, { length: 0 }),
            new Error('"value" must be a tuple.'),
        )
    })

    it("should fail on [0]", () => {
        assert.throws(
            () => validate(schema, [0]),
            new Error('"value" must contain exactly 0 items.'),
        )
    })

    it("should have no validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '[]' type", () => {
        const value: unknown = []
        validate(schema, value)
        assertType<Equals<typeof value, []>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.tuple(schemas.any())", () => {
    const schema = schemas.tuple(schemas.any())

    it("should pass [0]", () => {
        validate(schema, [0])
    })
    it('should pass ["foo"]', () => {
        validate(schema, ["foo"])
    })
    it("should pass [null]", () => {
        validate(schema, [null])
    })
    it("should pass [undefined]", () => {
        validate(schema, [undefined])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be a tuple.'),
        )
    })

    it("should fail on { length: 1 }", () => {
        assert.throws(
            () => validate(schema, { length: 1 }),
            new Error('"value" must be a tuple.'),
        )
    })

    it("should fail on []", () => {
        assert.throws(
            () => validate(schema, []),
            new Error('"value" must contain exactly 1 item.'),
        )
    })

    it("should have no validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '[any]' type", () => {
        const value: unknown = [0]
        validate(schema, value)
        assertType<Equals<typeof value, [any]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.tuple(schemas.string(), schemas.string())", () => {
    const schema = schemas.tuple(schemas.string(), schemas.string())

    it('should pass ["a", "b"]', () => {
        validate(schema, ["a", "b"])
    })

    it("should fail on []", () => {
        assert.throws(
            () => validate(schema, []),
            new Error(
                '"value" has 3 validation errors:\n' +
                    '- "value" must contain exactly 2 items.\n' +
                    '- "value[0]" must be a string.\n' +
                    '- "value[1]" must be a string.',
            ),
        )
    })

    it("should fail on [1, 2]", () => {
        assert.throws(
            () => validate(schema, [1, 2]),
            new Error(
                '"value" has 2 validation errors:\n' +
                    '- "value[0]" must be a string.\n' +
                    '- "value[1]" must be a string.',
            ),
        )
    })

    it('should fail on ["a", null]', () => {
        assert.throws(
            () => validate(schema, ["a", null]),
            new Error('"value[1]" must be a string.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '[string, string]' type", () => {
        const value: unknown = ["a", "b"]
        validate(schema, value)
        assertType<Equals<typeof value, [string, string]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
