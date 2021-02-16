import { assertSnapshot, assertSnapshotThrows } from "mocha-assert-snapshot"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.number()", () => {
    const schema = schemas.number()

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass 1.79E+308", () => {
        validate(schema, Number.MAX_VALUE)
    })

    it("should pass -1.79E+308", () => {
        validate(schema, -Number.MAX_VALUE)
    })

    it("should fail on null", () => {
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.POSITIVE_INFINITY))
    })

    it("should fail on -Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.NEGATIVE_INFINITY))
    })

    it("should fail on NaN", () => {
        assertSnapshotThrows(() => validate(schema, Number.NaN))
    })

    it("should fail on bigint", () => {
        assertSnapshotThrows(() => validate(schema, BigInt("0")))
    })

    it("should fail on string", () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have no validation for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ allowInfinity: true })", () => {
    const schema = schemas.number({ allowInfinity: true })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass Infinity", () => {
        validate(schema, Number.POSITIVE_INFINITY)
    })

    it("should pass -Infinity", () => {
        validate(schema, Number.NEGATIVE_INFINITY)
    })

    it("should fail on NaN", () => {
        assertSnapshotThrows(() => validate(schema, Number.NaN))
    })

    it('should fail on "0"', () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have validation allowing Infinity", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ allowNaN: true })", () => {
    const schema = schemas.number({ allowNaN: true })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass NaN", () => {
        validate(schema, Number.NaN)
    })

    it("should fail on Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.POSITIVE_INFINITY))
    })

    it("should fail on -Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.NEGATIVE_INFINITY))
    })

    it('should fail on "0"', () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have validation allowing NaN", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ allowInfinity: true, allowNaN: true })", () => {
    const schema = schemas.number({ allowInfinity: true, allowNaN: true })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass Infinity", () => {
        validate(schema, Number.POSITIVE_INFINITY)
    })

    it("should pass -Infinity", () => {
        validate(schema, Number.NEGATIVE_INFINITY)
    })

    it("should pass NaN", () => {
        validate(schema, Number.NaN)
    })

    it('should fail on "0"', () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have validation allowing Infinity and NaN", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ intOnly: true })", () => {
    const schema = schemas.number({ intOnly: true })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass 9007199254740991", () => {
        validate(schema, Number.MAX_SAFE_INTEGER)
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })

    it("should fail on Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.POSITIVE_INFINITY))
    })

    it("should fail on -Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.NEGATIVE_INFINITY))
    })

    it("should fail on NaN", () => {
        assertSnapshotThrows(() => validate(schema, Number.NaN))
    })

    it("should fail on bigint", () => {
        assertSnapshotThrows(() => validate(schema, BigInt("0")))
    })

    it("should have validation, but not have for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ allowInfinity: true, intOnly: true })", () => {
    const schema = schemas.number({ allowInfinity: true, intOnly: true })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass Infinity", () => {
        validate(schema, Number.POSITIVE_INFINITY)
    })

    it("should pass -Infinity", () => {
        validate(schema, Number.NEGATIVE_INFINITY)
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })

    it("should fail on NaN", () => {
        assertSnapshotThrows(() => validate(schema, Number.NaN))
    })

    it('should fail on "0"', () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have validation allowing Infinity", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ allowNaN: true, intOnly: true })", () => {
    const schema = schemas.number({ allowNaN: true, intOnly: true })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass NaN", () => {
        validate(schema, Number.NaN)
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })

    it("should fail on Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.POSITIVE_INFINITY))
    })

    it("should fail on -Infinity", () => {
        assertSnapshotThrows(() => validate(schema, Number.NEGATIVE_INFINITY))
    })

    it('should fail on "0"', () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have validation allowing NaN", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ allowInfinity: true, allowNaN: true, intOnly: true })", () => {
    const schema = schemas.number({
        allowInfinity: true,
        allowNaN: true,
        intOnly: true,
    })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass Infinity", () => {
        validate(schema, Number.POSITIVE_INFINITY)
    })

    it("should pass -Infinity", () => {
        validate(schema, Number.NEGATIVE_INFINITY)
    })

    it("should pass NaN", () => {
        validate(schema, Number.NaN)
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })

    it('should fail on "0"', () => {
        assertSnapshotThrows(() => validate(schema, "0"))
    })

    it("should have validation allowing Infinity and NaN", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ maxValue: 1 })", () => {
    const schema = schemas.number({ maxValue: 1 })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass 1", () => {
        validate(schema, 1)
    })

    it("should fail on 2", () => {
        assertSnapshotThrows(() => validate(schema, 2))
    })

    it("should fail on NaN", () => {
        assertSnapshotThrows(() => validate(schema, Number.NaN))
    })

    it("should have validation for maxValue", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ minValue: 1 })", () => {
    const schema = schemas.number({ minValue: 1 })

    it("should pass 2", () => {
        validate(schema, 2)
    })

    it("should pass 1", () => {
        validate(schema, 1)
    })

    it("should fail on 0", () => {
        assertSnapshotThrows(() => validate(schema, 0))
    })

    it("should fail on NaN", () => {
        assertSnapshotThrows(() => validate(schema, Number.NaN))
    })

    it("should have validation for minValue", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 1
        validate(schema, value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ maxValue: 1, minValue: 0 })", () => {
    const schema = schemas.number({
        maxValue: 1,
        minValue: 0,
    })

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass 1", () => {
        validate(schema, 1)
    })

    it("should fail on -1", () => {
        assertSnapshotThrows(() => validate(schema, Number("-1")))
    })

    it("should fail on 2", () => {
        assertSnapshotThrows(() => validate(schema, 2))
    })

    it("should fail on NaN", () => {
        assertSnapshotThrows(() => validate(schema, Number.NaN))
    })

    it("should have validation for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ maxValue: 0, minValue: 1 })", () => {
    const schema = schemas.number({ maxValue: 0, minValue: 1 })

    it("should throw a fatal error on compile", () => {
        assertSnapshotThrows(() => createValidationOfSchema(schema))
    })
})

describe("schemas.int8", () => {
    const schema = schemas.int8

    it("should pass -128", () => {
        validate(schema, -128)
    })

    it("should pass 127", () => {
        validate(schema, 127)
    })

    it("should fail on -129", () => {
        assertSnapshotThrows(() => validate(schema, -129))
    })

    it("should fail on 128", () => {
        assertSnapshotThrows(() => validate(schema, 128))
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })
})

describe("schemas.int16", () => {
    const schema = schemas.int16

    it("should pass -32768", () => {
        validate(schema, -32768)
    })

    it("should pass 32767", () => {
        validate(schema, 32767)
    })

    it("should fail on -32769", () => {
        assertSnapshotThrows(() => validate(schema, -32769))
    })

    it("should fail on 32768", () => {
        assertSnapshotThrows(() => validate(schema, 32768))
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })
})

describe("schemas.int32", () => {
    const schema = schemas.int32

    it("should pass -2147483648", () => {
        validate(schema, -2147483648)
    })

    it("should pass 2147483647", () => {
        validate(schema, 2147483647)
    })

    it("should fail on -2147483649", () => {
        assertSnapshotThrows(() => validate(schema, -2147483649))
    })

    it("should fail on 2147483648", () => {
        assertSnapshotThrows(() => validate(schema, 2147483648))
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })
})

describe("schemas.uint8", () => {
    const schema = schemas.uint8

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass 255", () => {
        validate(schema, 255)
    })

    it("should fail on -1", () => {
        assertSnapshotThrows(() => validate(schema, -1))
    })

    it("should fail on 256", () => {
        assertSnapshotThrows(() => validate(schema, 256))
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })
})

describe("schemas.uint16", () => {
    const schema = schemas.uint16

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass 65535", () => {
        validate(schema, 65535)
    })

    it("should fail on -1", () => {
        assertSnapshotThrows(() => validate(schema, -1))
    })

    it("should fail on 65536", () => {
        assertSnapshotThrows(() => validate(schema, 65536))
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })
})

describe("schemas.uint32", () => {
    const schema = schemas.uint32

    it("should pass 0", () => {
        validate(schema, 0)
    })

    it("should pass 4294967295", () => {
        validate(schema, 4294967295)
    })

    it("should fail on -1", () => {
        assertSnapshotThrows(() => validate(schema, -1))
    })

    it("should fail on 4294967296", () => {
        assertSnapshotThrows(() => validate(schema, 4294967296))
    })

    it("should fail on 0.5", () => {
        assertSnapshotThrows(() => validate(schema, 0.5))
    })
})
