import themes from '@/src/styles/themes'

const defaultThemeName = 'dark'

export default () => new Promise(resolve => {
  chrome.storage.local.get(['themeName'], ({ themeName }) => {
    resolve(themes[themeName] || themes[defaultThemeName])
  })
})
