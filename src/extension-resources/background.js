/* eslint-disable */
console.log('bg')

let id = null;
chrome.browserAction.onClicked.addListener(function(tab) {
  onWindowOpenedOrClosedHandler(
    () => chrome.storage.local.set({firstCommand: null}, createNew),
    () => chrome.windows.update(id, { focused: true })
  )
});

const createNew = (callback) => {
  var w = 440;
  var h = 220;
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2); 
  chrome.windows.create({
    url: chrome.runtime.getURL("index.html"),
    type: 'popup',
    width: w,
    height: screen.height,
    left: screen.width,
    top: top,
  }, (w) => {
    id = w.id
    callback && callback()
  });
}

function onWindowOpenedOrClosedHandler(onWindowClosed, onWindowOpened) {
  chrome.windows.getAll(null, windows => {
    isOpened = windows.find(w => w.id === id);
    if (!isOpened) {
      onWindowClosed && onWindowClosed();
    } else {
      onWindowOpened && onWindowOpened();
    }
 });
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.eventName === 'command-copied') {
    console.log(request.command)
    onWindowOpenedOrClosedHandler(
      () => chrome.storage.local.set({firstCommand: request.command}, createNew),
      () => {
        chrome.windows.update(id, { focused: true })
        chrome.runtime.sendMessage({ eventName: 'copy-by-context-menu', command: request.command })
      }
    )
  }
})


function onClickHandler(info, tab) {
  chrome.tabs.executeScript(
    { file: 'content.js' },
  )
  
  console.log('info', info.selectionText);

  // onWindowOpenedOrClosedHandler(
  //   () => createNew(() => {
  //     chrome.storage.local.set({firstCommand: info.selectionText}, function() {
  //       chrome.runtime.sendMessage({ eventName: 'copy-by-context-menu', command: info.selectionText })
  //     });
  //   }),
  //   () => {
  //     chrome.windows.update(id, { focused: true })
  //     chrome.runtime.sendMessage({ eventName: 'copy-by-context-menu', command: info.selectionText })
  //   }
  // )
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var title = "Add to my commands";
  chrome.contextMenus.create({"title": title, "contexts":["selection"], "id": "context selection"});
});

