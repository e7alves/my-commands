import { DefaultTheme } from 'styled-components'

import themes from './themes'

const defaultThemeName = 'dark'

export default (): Promise<DefaultTheme> =>
  new Promise((resolve) => {
    chrome.storage.local.get(['themeName'], ({ themeName }) => {
      resolve(themes[themeName] || themes[defaultThemeName])
    })
  })
