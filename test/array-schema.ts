import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.array()", () => {
    const schema = schemas.array()

    it("should pass empty array", () => {
        validate(schema, [])
    })

    it("should pass array that includes various kinds of values", () => {
        validate(schema, [1, "str", true, {}, () => {}])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an array.'),
        )
    })

    it("should fail on object", () => {
        assert.throws(
            () => validate(schema, { 0: 1, length: 1 }),
            new Error('"value" must be an array.'),
        )
    })

    it("should have no validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'any[]' type", () => {
        const value: unknown = []
        validate(schema, value)
        assertType<Equals<typeof value, any[]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.array(schemas.string())", () => {
    const schema = schemas.array(schemas.string())

    it("should pass empty array", () => {
        validate(schema, [])
    })

    it("should pass array that includes strings", () => {
        validate(schema, ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an array.'),
        )
    })

    it("should fail on array that includes null", () => {
        assert.throws(
            () => validate(schema, ["foo", null]),
            new Error('"value[1]" must be a string.'),
        )
    })

    it("should have validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string[]' type", () => {
        const value: unknown = []
        validate(schema, value)
        assertType<Equals<typeof value, string[]>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.array(schemas.any(), { maxLength: 2 })", () => {
    const schema = schemas.array(schemas.any(), { maxLength: 2 })

    it("should pass empty array", () => {
        validate(schema, [])
    })

    it("should pass array that includes two strings", () => {
        validate(schema, ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an array.'),
        )
    })

    it("should fail on array that includes three strings", () => {
        assert.throws(
            () => validate(schema, ["foo", "bar", "three"]),
            new Error('"value" must contain less than or equal to 2 items.'),
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
        validate(schema, ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an array.'),
        )
    })

    it("should fail on empty array", () => {
        assert.throws(
            () => validate(schema, []),
            new Error('"value" must contain more than or equal to 2 items.'),
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
        validate(schema, [])
    })

    it("should pass array that includes two different strings", () => {
        validate(schema, ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an array.'),
        )
    })

    it("should fail on array that includes two same strings", () => {
        assert.throws(
            () => validate(schema, ["foo", "foo"]),
            new Error('"value" must not contain duplicate values.'),
        )
    })

    it("should report once even if array included many same strings", () => {
        assert.throws(
            () => validate(schema, ["foo", "foo", "foo", "bar", "bar"]),
            new Error('"value" must not contain duplicate values.'),
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
        validate(schema, ["foo"])
    })

    it("should pass array that includes two different strings", () => {
        validate(schema, ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be an array.'),
        )
    })

    it("should fail on empty array", () => {
        assert.throws(
            () => validate(schema, []),
            new Error('"value" must not be empty.'),
        )
    })

    it("should fail on array that includes two numbers", () => {
        assert.throws(
            () => validate(schema, ["foo", 1]),
            new Error('"value[1]" must be a string.'),
        )
    })

    it("should fail on array that includes two same string", () => {
        assert.throws(
            () => validate(schema, ["foo", "foo"]),
            new Error('"value" must not contain duplicate values.'),
        )
    })

    it("should fail on array that has many errors", () => {
        assert.throws(
            () => validate(schema, [0, "foo", "foo"]),
            new Error(
                '"value" has 3 validation errors:\n' +
                    '- "value" must contain less than or equal to 2 items.\n' +
                    '- "value" must not contain duplicate values.\n' +
                    '- "value[0]" must be a string.',
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

describe("schemas.array(schemas.any(), { maxLength: 1, minLength: 2 })", () => {
    it("should throw a fatal error on compile", () => {
        assert.throws(
            () =>
                createValidationOfSchema(
                    schemas.array(schemas.any(), {
                        maxLength: 1,
                        minLength: 2,
                    }),
                ),
            new Error('"maxLength" must be "minLength" or greater than it.'),
        )
    })
})
