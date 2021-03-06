import assert from "assert"
import { assertSnapshot, assertSnapshotThrows } from "mocha-assert-snapshot"
import { Schema, schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertType, Equals } from "./lib/type-util"

describe('{ type: "enum", values: [] }', () => {
    const schema: Schema.Enum<never> = { type: "enum", values: [] }

    it("should fail on compile", () => {
        assertSnapshotThrows(() => createValidationOfSchema(schema))
    })
})

describe("schemas.enum(null)", () => {
    const schema = schemas.enum(null)

    it("should pass null", () => {
        validate(schema, null)
    })

    it("should fail on 0", () => {
        assertSnapshotThrows(() => validate(schema, 0))
    })
    it("should fail on undefined", () => {
        assertSnapshotThrows(() => validate(schema, undefined))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = null
        validate(schema, value)
        assertType<Equals<typeof value, null>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe('schemas.enum(1n, true, 0, null, "foo", undefined)', () => {
    const schema = schemas.enum(
        BigInt("1") as 1n,
        true as true,
        0 as 0,
        null,
        "foo" as "foo",
        undefined,
    )

    it("should pass 1n", () => {
        validate(schema, BigInt("1"))
    })
    it("should pass true", () => {
        validate(schema, true)
    })
    it("should pass 0", () => {
        validate(schema, 0)
    })
    it("should pass null", () => {
        validate(schema, null)
    })
    it('should pass "foo"', () => {
        validate(schema, "foo")
    })
    it("should pass undefined", () => {
        validate(schema, undefined)
    })

    it("should fail on 0n", () => {
        try {
            validate(schema, BigInt("0"))
        } catch (error) {
            assert.strictEqual(
                error.message,
                '"value" must be any of 1n, true, 0, null, "foo", and undefined.',
            )
            return
        }
        assert.fail("Missing expected exception")
    })

    it("should fail on false", () => {
        try {
            validate(schema, false)
        } catch (error) {
            assert.strictEqual(
                error.message,
                '"value" must be any of 1n, true, 0, null, "foo", and undefined.',
            )
            return
        }
        assert.fail("Missing expected exception")
    })

    it("should fail on 1", () => {
        try {
            validate(schema, 1)
        } catch (error) {
            assert.strictEqual(
                error.message,
                '"value" must be any of 1n, true, 0, null, "foo", and undefined.',
            )
            return
        }
        assert.fail("Missing expected exception")
    })

    it("should fail on an object", () => {
        try {
            validate(schema, {})
        } catch (error) {
            assert.strictEqual(
                error.message,
                '"value" must be any of 1n, true, 0, null, "foo", and undefined.',
            )
            return
        }
        assert.fail("Missing expected exception")
    })

    it('should fail on "bar"', () => {
        try {
            validate(schema, "bar")
        } catch (error) {
            assert.strictEqual(
                error.message,
                '"value" must be any of 1n, true, 0, null, "foo", and undefined.',
            )
            return
        }
        assert.fail("Missing expected exception")
    })

    it("should have validation; it uses symbol equality comparison", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets '1n | true | 0 | null | \"foo\" | undefined' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<
            Equals<typeof value, 1n | true | 0 | null | "foo" | undefined>
        >()
    })
})

describe('schemas.enum(true, 0, null, "foo", undefined)', () => {
    const schema = schemas.enum(true, 0, null, "foo", undefined)

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.enum(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)", () => {
    const schema = schemas.enum(
        Number.NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
    )

    it("should pass Number.NaN", () => {
        validate(schema, Number.NaN)
    })
    it("should pass Number.POSITIVE_INFINITY", () => {
        validate(schema, Number.POSITIVE_INFINITY)
    })
    it("should pass Number.NEGATIVE_INFINITY", () => {
        validate(schema, Number.NEGATIVE_INFINITY)
    })

    it("should fail on 0", () => {
        assertSnapshotThrows(() => validate(schema, 0))
    })

    it("should have validation; it can handle NaN correctly", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = Number.NaN
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.enum(Symbol.iterator)", () => {
    const schema = schemas.enum(Symbol.iterator)

    it("should pass Symbol.iterator", () => {
        validate(schema, Symbol.iterator)
    })

    it("should fail on 0", () => {
        assertSnapshotThrows(() => validate(schema, 0))
    })
    it("should fail on undefined", () => {
        assertSnapshotThrows(() => validate(schema, undefined))
    })
    it("should fail on another symbol", () => {
        assertSnapshotThrows(() => validate(schema, Symbol.toStringTag))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'symbol' type", () => {
        const value: unknown = Symbol.iterator
        validate(schema, value)
        assertType<Equals<typeof value, symbol>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.enum(myObj, mySymbol, myFunc)", () => {
    const myObj = {}
    const mySymbol = Symbol("mySymbol")
    const myFunc = () => {}
    const schema = schemas.enum(myObj, mySymbol, myFunc)

    it("should pass myObj", () => {
        validate(schema, myObj)
    })
    it("should pass mySymbol", () => {
        validate(schema, mySymbol)
    })
    it("should pass myFunc", () => {
        validate(schema, myFunc)
    })

    it("should fail on {}", () => {
        assertSnapshotThrows(() => validate(schema, {}))
    })
    it("should fail on another symbol", () => {
        assertSnapshotThrows(() => validate(schema, Symbol("mySymbol")))
    })

    it("should have validation; give 'values' as an argument because it contains references.", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = myObj
        validate(schema, value)
        assertType<Equals<typeof value, {} | typeof mySymbol | (() => void)>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.enum(myObj, Number.NaN)", () => {
    const myObj = {}
    const schema = schemas.enum(myObj, Number.NaN)

    it("should pass myObj", () => {
        validate(schema, myObj)
    })
    it("should pass Number.NaN", () => {
        validate(schema, Number.NaN)
    })

    it("should fail on {}", () => {
        assertSnapshotThrows(() => validate(schema, {}))
    })
    it("should fail on 0", () => {
        assertSnapshotThrows(() => validate(schema, 0))
    })

    it("should have validation; it can handle NaN correctly, along with reference values.", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.null", () => {
    it("should equal to schemas.enum(null)", () => {
        assert.deepStrictEqual(schemas.null, schemas.enum(null))
    })
})
