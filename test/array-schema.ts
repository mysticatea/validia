import { assertSnapshot, assertSnapshotThrows } from "mocha-assert-snapshot"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
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
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on object", () => {
        assertSnapshotThrows(() => validate(schema, { 0: 1, length: 1 }))
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
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on array that includes null", () => {
        assertSnapshotThrows(() => validate(schema, ["foo", null]))
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
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on array that includes three strings", () => {
        assertSnapshotThrows(() => validate(schema, ["foo", "bar", "three"]))
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
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on empty array", () => {
        assertSnapshotThrows(() => validate(schema, []))
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
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on array that includes two same strings", () => {
        assertSnapshotThrows(() => validate(schema, ["foo", "foo"]))
    })

    it("should report once even if array included many same strings", () => {
        assertSnapshotThrows(() =>
            validate(schema, ["foo", "foo", "foo", "bar", "bar"]),
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
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on empty array", () => {
        assertSnapshotThrows(() => validate(schema, []))
    })

    it("should fail on array that includes two numbers", () => {
        assertSnapshotThrows(() => validate(schema, ["foo", 1]))
    })

    it("should fail on array that includes two same string", () => {
        assertSnapshotThrows(() => validate(schema, ["foo", "foo"]))
    })

    it("should fail on array that has many errors", () => {
        assertSnapshotThrows(() => validate(schema, [0, "foo", "foo"]))
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
        assertSnapshotThrows(() =>
            createValidationOfSchema(
                schemas.array(schemas.any(), {
                    maxLength: 1,
                    minLength: 2,
                }),
            ),
        )
    })
})
