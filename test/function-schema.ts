import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot, assertThrows } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.function()", () => {
    const schema = schemas.function()

    it("should pass Object", () => {
        validate(schema, Object)
    })

    it("should pass parseInt", () => {
        validate(schema, parseInt)
    })

    it("should pass () => {}", () => {
        validate(schema, () => {})
    })

    it("should fail on null", () => {
        assertThrows(() => validate(schema, null))
    })

    it("should fail on number", () => {
        assertThrows(() => validate(schema, 0))
    })

    it("should fail on string", () => {
        assertThrows(() => validate(schema, "0"))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '(...args: any[]) => any' type", () => {
        const value: unknown = () => {}
        validate(schema, value)
        assertType<Equals<typeof value, (...args: any[]) => any>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
