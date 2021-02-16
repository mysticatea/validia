import { assertSnapshot, assertSnapshotThrows } from "mocha-assert-snapshot"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.symbol()", () => {
    const schema = schemas.symbol()

    it("should pass Symbol.iterator", () => {
        validate(schema, Symbol.iterator)
    })

    it("should pass Symbol(foo)", () => {
        validate(schema, Symbol("foo"))
    })

    it("should fail on null", () => {
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on number", () => {
        assertSnapshotThrows(() => validate(schema, 0))
    })

    it("should fail on string", () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'symbol' type", () => {
        const value: unknown = Symbol("foo")
        validate(schema, value)
        assertType<Equals<typeof value, symbol>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
