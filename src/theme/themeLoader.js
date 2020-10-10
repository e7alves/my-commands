const defaultTheme = 'dark'

export default () => new Promise(resolve => {
  chrome.storage.local.get(['theme'], result => {
    resolve(result.theme || defaultTheme)
  })
})
