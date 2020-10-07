const chrome = {
  storage: {
    local: {
      get: (keys, callback) => callback({
        [keys[0]]: '<p>sudo apt-get update</p><p>sudo apt-get install nano</p>',
      }),
    },
  },
  runtime: {
    onMessage: {
      addListener: () => null,
    },
  },
}

global.chrome = chrome
