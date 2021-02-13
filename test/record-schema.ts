import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot, assertThrows } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.record()", () => {
    const schema = schemas.record()

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
        assertThrows(() => validate(schema, null))
    })

    it("should fail on string", () => {
        assertThrows(() => validate(schema, "foo"))
    })

    it("should have no validation for properties", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'Record<number | string | symbol, any>' type", () => {
        const value: unknown = []
        validate(schema, value)
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
        validate(schema, {})
    })
    it("should pass object that has string properties", () => {
        validate(schema, { one: "one", two: "two" })
    })
    it("should pass empty array", () => {
        validate(schema, [])
    })
    it("should pass array that includes strings", () => {
        validate(schema, ["foo", "bar"])
    })

    it("should fail on null", () => {
        assertThrows(() => validate(schema, null))
    })

    it("should fail on object that has null property", () => {
        assertThrows(() => validate(schema, { foo: null }))
    })

    it("should fail on array that includes null", () => {
        assertThrows(() => validate(schema, ["foo", null]))
    })

    it("should have validation for elements", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'Record<number | string | symbol, string>' type", () => {
        const value: unknown = {}
        validate(schema, value)
        assertType<
            Equals<typeof value, Record<number | string | symbol, string>>
        >()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
