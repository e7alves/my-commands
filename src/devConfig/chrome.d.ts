interface StorageResult {
  [value: string]: any
}

interface FakeStorage {
  local: {
    get: (keys: string[], cb: (key: StorageResult) => void) => void
    set: (obj: Record<string, unknown>, callback?: () => void) => void
  }
}

interface FakeRuntime {
  onMessage: {
    addListener: (request: any) => null
    removeListener: (request: any) => null
  }
}

declare namespace chrome {
  export const storage: FakeStorage
  export const runtime: FakeRuntime
}
