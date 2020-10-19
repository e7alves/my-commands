import themes from './themes'

const defaultThemeName = 'dark'

interface Theme {
  background: string
  text: string
}

export default (): Promise<Theme> =>
  new Promise((resolve) => {
    chrome.storage.local.get(['themeName'], ({ themeName }) => {
      resolve(themes[themeName] || themes[defaultThemeName])
    })
  })
