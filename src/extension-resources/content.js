function getSelectionHtml() {
  let html = ''
  if (typeof window.getSelection !== 'undefined') {
    const selection = window.getSelection()
    if (selection.rangeCount) {
      const container = document.createElement('div')
      for (let i = 0, length = selection.rangeCount; i < length; i += 1) {
        container.appendChild(selection.getRangeAt(i).cloneContents())
      }
      html = container.innerHTML
    }
  } else if (typeof document.selection !== 'undefined') {
    if (document.selection.type === 'Text') {
      html = document.selection.createRange().htmlText
    }
  }
  return html
}

chrome.runtime.sendMessage({
  eventName: 'command-copied',
  command: getSelectionHtml(),
})
