interface StorageResult {
  [value: string]: string
}

interface FakeStorage {
  local: {
    get: (
      keys: string[],
      cb: (key: StorageResult) => StorageResult | void,
    ) => StorageResult
  }
}

interface FakeRuntime {
  onMessage: {
    addListener: () => null
  }
}

declare namespace chrome {
  export const storage: FakeStorage
  export const runtime: FakeRuntime
}
