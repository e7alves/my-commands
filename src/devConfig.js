const chrome = {
  storage: {
    local: {
      get: (keys, callback) => callback({ [keys[0]]: 'dark' }),
    },
  },
  runtime: {
    onMessage: {
      addListener: () => null,
    },
  },
}

global.chrome = chrome
