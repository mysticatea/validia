import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.array()", () => {
    const schema = schemas.array()

    it("should pass empty array", () => {
        validate(schema, "x", [])
    })

    it("should pass array that includes various kinds of values", () => {
        validate(schema, "x", [1, "str", true, {}, () => {}])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an array.'),
        )
    })

    it("should fail on object", () => {
        assert.throws(
            () => validate(schema, "x", { 0: 1, length: 1 }),
            new Error('"x" must be an array.'),
        )
    })

    it("should have no validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'any[]' type", () => {
        const value: unknown = []
        validate(schema, "x", value)
        assertType<Equals<typeof value, any[]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.array(schemas.string())", () => {
    const schema = schemas.array(schemas.string())

    it("should pass empty array", () => {
        validate(schema, "x", [])
    })

    it("should pass array that includes strings", () => {
        validate(schema, "x", ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an array.'),
        )
    })

    it("should fail on array that includes null", () => {
        assert.throws(
            () => validate(schema, "x", ["foo", null]),
            new Error('"x[1]" must be a string.'),
        )
    })

    it("should have validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string[]' type", () => {
        const value: unknown = []
        validate(schema, "x", value)
        assertType<Equals<typeof value, string[]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.array(schemas.any(), { maxLength: 2 })", () => {
    const schema = schemas.array(schemas.any(), { maxLength: 2 })

    it("should pass empty array", () => {
        validate(schema, "x", [])
    })

    it("should pass array that includes two strings", () => {
        validate(schema, "x", ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an array.'),
        )
    })

    it("should fail on array that includes three strings", () => {
        assert.throws(
            () => validate(schema, "x", ["foo", "bar", "three"]),
            new Error('The length of "x" must be 2 or less than it.'),
        )
    })

    it("should have validation for maxLength", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.array(schemas.any(), { minLength: 2 })", () => {
    const schema = schemas.array(schemas.any(), { minLength: 2 })

    it("should pass array that includes two strings", () => {
        validate(schema, "x", ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an array.'),
        )
    })

    it("should fail on empty array", () => {
        assert.throws(
            () => validate(schema, "x", []),
            new Error('The length of "x" must be 2 or greater than it.'),
        )
    })

    it("should have validation for minLength", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.array(schemas.any(), { unique: true })", () => {
    const schema = schemas.array(schemas.any(), { unique: true })

    it("should pass empty array", () => {
        validate(schema, "x", [])
    })

    it("should pass array that includes two different strings", () => {
        validate(schema, "x", ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an array.'),
        )
    })

    it("should fail on array that includes two same strings", () => {
        assert.throws(
            () => validate(schema, "x", ["foo", "foo"]),
            new Error('"x" must not contain duplicate values.'),
        )
    })

    it("should report once even if array included many same strings", () => {
        assert.throws(
            () => validate(schema, "x", ["foo", "foo", "foo", "bar", "bar"]),
            new Error('"x" must not contain duplicate values.'),
        )
    })

    it("should have validation for unique", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true })", () => {
    const schema = schemas.array(schemas.string(), {
        maxLength: 2,
        minLength: 1,
        unique: true,
    })

    it("should pass array that includes a string", () => {
        validate(schema, "x", ["foo"])
    })

    it("should pass array that includes two different strings", () => {
        validate(schema, "x", ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an array.'),
        )
    })

    it("should fail on empty array", () => {
        assert.throws(
            () => validate(schema, "x", []),
            new Error('The length of "x" must be 1 or greater than it.'),
        )
    })

    it("should fail on array that includes two numbers", () => {
        assert.throws(
            () => validate(schema, "x", ["foo", 1]),
            new Error('"x[1]" must be a string.'),
        )
    })

    it("should fail on array that includes two same string", () => {
        assert.throws(
            () => validate(schema, "x", ["foo", "foo"]),
            new Error('"x" must not contain duplicate values.'),
        )
    })

    it("should fail on array that has many errors", () => {
        assert.throws(
            () => validate(schema, "x", [0, "foo", "foo"]),
            new Error(
                '"x" has multiple validation errors:\n' +
                    '- The length of "x" must be 2 or less than it.\n' +
                    '- "x" must not contain duplicate values.\n' +
                    '- "x[0]" must be a string.',
            ),
        )
    })

    it("should have validation for all options", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
