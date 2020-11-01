import { Topic, Task } from './dataTypes'

export const listTopics = (callback: (result: Topic[]) => void) => {
  chrome.storage.local.get(['topics'], (result) => {
    callback(result.topics)
  })
}

export const getTask = (key: string, callback: (result: Task) => void) => {
  chrome.storage.local.get([key], (result) => {
    const task = result[key]
    callback(task)
  })
}

export const listTasks = (
  keys: string[],
  callback: (result: Task[]) => void,
) => {
  chrome.storage.local.get(keys, (result) => {
    callback(result.tasks)
  })
}
