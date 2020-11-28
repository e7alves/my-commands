interface StorageResult {
  [value: string]: any
}

interface StorageType {
  local: {
    get: (keys: string[], cb: (key: StorageResult) => void) => void
    set: (obj: Record<string, unknown>, callback?: () => void) => void
  }
}

interface RuntimeType {
  onMessage: {
    addListener: (request: any) => null
    removeListener: (request: any) => null
  }
}

declare namespace chrome {
  export const storage: StorageType
  export const runtime: RuntimeType
}
