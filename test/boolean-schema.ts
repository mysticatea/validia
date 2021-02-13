import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot, assertThrows } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.boolean()", () => {
    const schema = schemas.boolean()

    it("should pass true", () => {
        validate(schema, true)
    })

    it("should pass false", () => {
        validate(schema, false)
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

    it("should the value gets 'boolean' type", () => {
        const value: unknown = true
        validate(schema, value)
        assertType<Equals<typeof value, boolean>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
