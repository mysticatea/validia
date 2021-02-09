export class Cache<T extends object, U> {
    private readonly map = new WeakMap<T, U>()
    private readonly factory: (key: T) => U

    constructor(factory: (key: T) => U) {
        this.factory = factory
    }

    get(key: T): U {
        if (this.map.has(key)) {
            return this.map.get(key)!
        }

        const value = this.factory(key)
        this.map.set(key, value)
        return value
    }
}
