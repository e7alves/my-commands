import { Topic, Task } from '../dataTypes'

interface StorageResult {
  [value: string]: any
}

interface FakeStorage {
  local: {
    get: (keys: string[], cb: (key: StorageResult) => void) => void
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
