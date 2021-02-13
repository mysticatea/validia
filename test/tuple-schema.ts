import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot, assertThrows } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.tuple()", () => {
    const schema = schemas.tuple()

    it("should pass empty array", () => {
        validate(schema, [])
    })

    it("should fail on null", () => {
        assertThrows(() => validate(schema, null))
    })

    it("should fail on { length: 0 }", () => {
        assertThrows(() => validate(schema, { length: 0 }))
    })

    it("should fail on [0]", () => {
        assertThrows(() => validate(schema, [0]))
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
        assertThrows(() => validate(schema, null))
    })

    it("should fail on { length: 1 }", () => {
        assertThrows(() => validate(schema, { length: 1 }))
    })

    it("should fail on []", () => {
        assertThrows(() => validate(schema, []))
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
        assertThrows(() => validate(schema, []))
    })

    it("should fail on [1, 2]", () => {
        assertThrows(() => validate(schema, [1, 2]))
    })

    it('should fail on ["a", null]', () => {
        assertThrows(() => validate(schema, ["a", null]))
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
