import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.string()", () => {
    const schema = schemas.string()

    it('should pass ""', () => {
        validate(schema, "")
    })
    it('should pass "foo"', () => {
        validate(schema, "foo")
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, null),
            new Error('"value" must be a string.'),
        )
    })

    it("should fail on number", () => {
        assert.throws(
            () => validate(schema, 0),
            new Error('"value" must be a string.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = ""
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 2 })", () => {
    const schema = schemas.string({ maxLength: 2 })

    it('should pass ""', () => {
        validate(schema, "")
    })
    it('should pass "f"', () => {
        validate(schema, "f")
    })
    it('should pass "fo"', () => {
        validate(schema, "fo")
    })
    it('should fail on "foo"', () => {
        assert.throws(
            () => validate(schema, "foo"),
            new Error('"value" must be less than or equal to 2 characters.'),
        )
    })

    it('should pass "👍👍"', () => {
        validate(schema, "👍👍")
    })
    it('should fail on "👍👍1"', () => {
        assert.throws(
            () => validate(schema, "👍👍1"),
            new Error('"value" must be less than or equal to 2 characters.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = ""
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ minLength: 2 })", () => {
    const schema = schemas.string({ minLength: 2 })

    it('should pass "foo"', () => {
        validate(schema, "foo")
    })
    it('should pass "fo"', () => {
        validate(schema, "fo")
    })
    it('should fail on "f"', () => {
        assert.throws(
            () => validate(schema, "f"),
            new Error('"value" must be more than or equal to 2 characters.'),
        )
    })

    it('should pass "👍👍"', () => {
        validate(schema, "👍👍")
    })
    it('should fail on "👍"', () => {
        assert.throws(
            () => validate(schema, "👍"),
            new Error('"value" must be more than or equal to 2 characters.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "two"
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 2, minLength: 1 })", () => {
    const schema = schemas.string({ maxLength: 2, minLength: 1 })

    it('should pass "f"', () => {
        validate(schema, "f")
    })
    it('should pass "fo"', () => {
        validate(schema, "fo")
    })

    it('should fail on ""', () => {
        assert.throws(
            () => validate(schema, ""),
            new Error('"value" must not be empty.'),
        )
    })
    it('should fail on "foo"', () => {
        assert.throws(
            () => validate(schema, "foo"),
            new Error('"value" must be less than or equal to 2 characters.'),
        )
    })

    it('should pass "👍"', () => {
        validate(schema, "👍")
    })
    it('should pass "👍👍"', () => {
        validate(schema, "👍👍")
    })
    it('should fail on "👍👍👍"', () => {
        assert.throws(
            () => validate(schema, "👍👍👍"),
            new Error('"value" must be less than or equal to 2 characters.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "s"
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 1, minLength: 2 })", () => {
    const schema = schemas.string({ maxLength: 1, minLength: 2 })

    it("should throw a fatal error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error('"maxLength" must be "minLength" or greater than it.'),
        )
    })
})

describe("schemas.string({ pattern: /^\\d+$/ })", () => {
    // eslint-disable-next-line require-unicode-regexp
    const schema = schemas.string({ pattern: /^\d+$/ })

    it('should pass "0"', () => {
        validate(schema, "0")
    })
    it('should pass "999"', () => {
        validate(schema, "999")
    })

    it('should fail on ""', () => {
        assert.throws(
            () => validate(schema, ""),
            new Error('"value" must match the pattern /^\\d+$/.'),
        )
    })
    it('should fail on "foo"', () => {
        assert.throws(
            () => validate(schema, "foo"),
            new Error('"value" must match the pattern /^\\d+$/.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "0"
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
