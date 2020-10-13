import themes from './themes'

const defaultThemeName = 'dark'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () =>
  new Promise((resolve) => {
    chrome.storage.local.get(['themeName'], ({ themeName }) => {
      resolve(themes[themeName] || themes[defaultThemeName])
    })
  })
