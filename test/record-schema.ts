import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.record()", () => {
    const schema = schemas.record()

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

describe("schemas.record(schemas.string())", () => {
    const schema = schemas.record(schemas.string())

    it("should pass empty object", () => {
        validate(schema, "x", {})
    })
    it("should pass object that has string properties", () => {
        validate(schema, "x", { one: "one", two: "two" })
    })
    it("should pass empty array", () => {
        validate(schema, "x", [])
    })
    it("should pass array that includes strings", () => {
        validate(schema, "x", ["foo", "bar"])
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an object.'),
        )
    })

    it("should fail on object that has null property", () => {
        assert.throws(
            () => validate(schema, "x", { foo: null }),
            new Error('"x.foo" must be a string.'),
        )
    })

    it("should fail on array that includes null", () => {
        assert.throws(
            () => validate(schema, "x", ["foo", null]),
            new Error('"x.1" must be a string.'),
        )
    })

    it("should have validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'Record<number | string | symbol, string>' type", () => {
        const value: unknown = {}
        validate(schema, "x", value)
        assertType<
            Equals<typeof value, Record<number | string | symbol, string>>
        >()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
