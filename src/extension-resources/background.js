let windowId = null

function onWindowClosedOrOpenedHandler(onWindowClosed, onWindowOpened) {
  chrome.windows.getAll(null, (windows) => {
    const isOpened = windows.find(({ id }) => id === windowId)
    if (!isOpened) {
      onWindowClosed && onWindowClosed()
    } else {
      onWindowOpened && onWindowOpened()
    }
  })
}

const createNewWindow = (url, callback) => {
  chrome.windows.create(
    {
      url: chrome.runtime.getURL(url),
      type: 'popup',
      width: 414,
      height: window.screen.height,
      left: window.screen.width,
      top: 0,
    },
    (window) => {
      windowId = window.id
      callback && callback()
    },
  )
}

const getCurrentTabURL = (callback) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    callback && callback(tabs[0].url)
  })
}

chrome.browserAction.onClicked.addListener(() => {
  onWindowClosedOrOpenedHandler(
    () =>
      chrome.storage.local.set({ contextSelectionCommands: null }, () =>
        createNewWindow('index.html#/tasks'),
      ),
    () => chrome.windows.update(windowId, { focused: true }),
  )
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'command-copied') {
    onWindowClosedOrOpenedHandler(
      () =>
        getCurrentTabURL((url) => {
          chrome.storage.local.set(
            {
              contextSelectionCommands: [request.command],
              link: url,
            },
            createNewWindow('index.html#/new-task'),
          )
        }),
      () => {
        chrome.storage.local.get((result) => {
          const newContextSelectionCommands = [
            ...(result.contextSelectionCommands || []),
            request.command,
          ]
          chrome.storage.local.set(
            {
              contextSelectionCommands: newContextSelectionCommands,
            },
            () => {
              chrome.runtime.sendMessage({
                eventName: 'copy-by-context-menu',
                command: newContextSelectionCommands,
              })
              chrome.windows.update(windowId, { focused: true })
            },
          )
        })
      },
    )
  }
})

function onClickHandler() {
  chrome.tabs.executeScript({ file: 'content.js' })
}

chrome.contextMenus.onClicked.addListener(onClickHandler)

chrome.runtime.onInstalled.addListener(() => {
  const title = 'Add to my commands'
  chrome.contextMenus.create({
    title,
    contexts: ['selection'],
    id: 'context-selection',
  })
  chrome.storage.local.get(['topics'], (result) => {
    if (!result.topics) {
      const defaultTopic = {
        id: '1',
        name: 'General',
        tasks: [],
      }
      chrome.storage.local.set({ topics: [defaultTopic] })
    }
  })
})
