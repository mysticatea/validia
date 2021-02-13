import assert from "assert"
import fs from "fs"
import path from "path"
import format from "pretty-format"
import util from "util"

const IsUpdateMode = Boolean(process.env.UPDATE_SNAPSHOT) // eslint-disable-line no-process-env
const SnapshotFilePath = path.resolve(__dirname, "../__snapshot__.js")
const writeFile = util.promisify(fs.writeFile)

let snapshot: Record<string, string> = Object.create(null)
let snapshotUpdated = false
let unusedKeys = new Set<string>()
let currentTest = ""
let currentIndex = 0

export const mochaHooks = {
    // Load the snapshot.
    beforeAll() {
        delete require.cache[SnapshotFilePath]
        snapshot = require(SnapshotFilePath) // eslint-disable-line @mysticatea/ts/no-require-imports
        snapshotUpdated = false
        unusedKeys = new Set(Object.keys(snapshot))
    },

    // Save the snapshot.
    async afterAll() {
        if (IsUpdateMode) {
            for (const unusedKey of unusedKeys) {
                delete snapshot[unusedKey]
                snapshotUpdated = true
            }
        }

        if (snapshotUpdated) {
            await writeFile(
                SnapshotFilePath,
                Object.entries(snapshot)
                    .filter(([key]) => !(IsUpdateMode && unusedKeys.has(key)))
                    .map(([key, value]) => {
                        const keyStr = JSON.stringify(key)
                        const valStr = value.replace(/`|\$\{/gu, "\\$&")
                        return `exports[${keyStr}] = String.raw\`\n${valStr}\n\`.slice(1, -1)`
                    })
                    .sort(undefined)
                    .join("\n"),
            )
        }
    },

    // Get the current test name.
    beforeEach(this: Mocha.Context) {
        currentTest = this.currentTest?.fullTitle() ?? ""
        currentIndex = 0
    },
    afterEach() {
        currentTest = ""
        currentIndex = 0
    },
}

export function assertSnapshot(value: any): void {
    if (currentTest === "") {
        throw new Error("The current test title is nothing.")
    }

    const key = `${currentTest} #[${currentIndex++}]`
    const expected = snapshot[key]
    const actual = format(value)

    unusedKeys.delete(key)

    if (IsUpdateMode || expected == null) {
        snapshot[key] = actual
        snapshotUpdated = true
    } else {
        assert.strictEqual(actual, expected)
    }
}

export function assertThrows(f: () => void): void {
    if (currentTest === "") {
        throw new Error("The current test title is nothing.")
    }

    const key = `${currentTest} #[${currentIndex++}]`
    const expected = snapshot[key]
    try {
        f()
    } catch (error) {
        const actual = format(error)

        unusedKeys.delete(key)

        if (IsUpdateMode || expected == null) {
            snapshot[key] = actual
            snapshotUpdated = true
        } else {
            assert.strictEqual(actual, expected)
        }
        return
    }

    assert.fail(`Expected to be thrown: ${expected ?? "(snapshot not found)"}`)
}
