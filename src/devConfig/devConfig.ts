global.chrome = {
  storage: {
    local: {
      get: (keys, callback: (key: StorageResult) => StorageResult) =>
        callback({ [keys[0]]: 'dark' }),
    },
  },
  runtime: {
    onMessage: {
      addListener: () => null,
    },
  },
}
