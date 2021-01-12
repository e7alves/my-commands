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
  chrome.storage.local.get(['windowOptions'], ({ windowOptions }) => {
    const defaultWidth = 500
    const defaultHeight = window.screen.height
    const defaultTop = 0
    const width = windowOptions
      ? windowOptions.width || defaultWidth
      : defaultWidth
    const height = windowOptions
      ? windowOptions.height || defaultHeight
      : defaultHeight
    const top = windowOptions
      ? windowOptions.screenTop || defaultTop
      : defaultTop

    const defaultLeft = window.screen.width - width - 5
    const left = windowOptions
      ? windowOptions.screenLeft || defaultLeft
      : defaultLeft

    chrome.windows.create(
      {
        url: chrome.runtime.getURL(url),
        type: 'popup',
        width,
        height,
        left,
        top,
      },
      (window) => {
        windowId = window.id
        callback && callback()
      },
    )
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
        chrome.storage.local.set(
          {
            contextSelectionCommands: [request.command],
          },
          createNewWindow('index.html#/new-task?editMode=true'),
        ),
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
  chrome.tabs.executeScript({ file: 'content.js' }, () => {
    if (chrome.runtime.lastError) {
      console.log('not applicable in this context')
    }
  })
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
