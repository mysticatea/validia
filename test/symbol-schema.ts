import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.symbol()", () => {
    const schema = schemas.symbol()

    it("should return the same instance always", () => {
        assert.strictEqual(schema, schemas.symbol())
    })

    it("should pass Symbol.iterator", () => {
        validate(schema, "x", Symbol.iterator)
    })

    it("should pass Symbol(foo)", () => {
        validate(schema, "x", Symbol("foo"))
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a symbol.'),
        )
    })

    it("should fail on number", () => {
        assert.throws(
            () => validate(schema, "x", 0),
            new Error('"x" must be a symbol.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "x", "0"),
            new Error('"x" must be a symbol.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'symbol' type", () => {
        const value: unknown = Symbol("foo")
        validate(schema, "x", value)
        assertType<Equals<typeof value, symbol>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
