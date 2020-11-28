import { Topic, Task, Command } from './dataTypes'
import { TOPIC_DEFAULT_ID } from '../consts'

export const listTopics = (callback: (result: Topic[]) => void) => {
  chrome.storage.local.get(['topics'], (result) => {
    callback && callback(result.topics)
  })
}

export const getTask = (key: string, callback: (result: Task) => void) => {
  chrome.storage.local.get([key], (result) => {
    const task = result[key]
    callback && callback(task)
  })
}

export const listTasks = (
  keys: string[],
  callback: (result: Task[]) => void,
) => {
  chrome.storage.local.get(keys, (result) => {
    callback && callback(result.tasks)
  })
}

export const updateTopics = (
  topicsToUpdate: Topic[],
  callback?: () => void,
) => {
  listTopics((topics) => {
    topicsToUpdate.forEach((topic) => {
      const { id } = topic
      const indexToUpdate = topics.findIndex((tp) => tp.id === id)
      const topicToUpdate = { ...topics[indexToUpdate] }
      topics.splice(indexToUpdate, 1, {
        ...topicToUpdate,
        ...topic,
      })
    })
    chrome.storage.local.set({ topics }, callback)
  })
}

export const deleteTask = (taskId: string, callback?: () => void) => {
  chrome.storage.local.set({ [taskId]: null }, callback)
}

export const deleteTopic = (topicId: string, callback: () => void) => {
  listTopics((topics) => {
    const topicToDelete = topics.find((topic) => topic.id === topicId)
    const { tasks } = topicToDelete
    tasks.forEach(({ id }) => deleteTask(id))
    chrome.storage.local.set(
      { topics: topics.filter(({ id }) => id !== topicId) },
      callback,
    )
  })
}

export const createTopic = (topic: Topic, callback?: () => void) => {
  listTopics((topics) => {
    if (!topics) {
      chrome.storage.local.set({ topics: [topic] }, callback)
    } else {
      topics.push(topic)
      chrome.storage.local.set({ topics }, callback)
    }
  })
}

export const saveTask = (task: Task, callback?: () => void) => {
  const { id } = task
  chrome.storage.local.set({ [id]: task }, callback)
}

export const getTheme = (callback?: (theme: StorageResult) => void) => {
  chrome.storage.local.get(['theme'], callback)
}

export const updateTheme = (theme: string, callback?: () => void) => {
  chrome.storage.local.set({ theme }, callback)
}

export const getLang = (callback?: (lang: StorageResult) => void) => {
  chrome.storage.local.get(['lang'], callback)
}

export const updateLang = (lang: string, callback?: () => void) => {
  chrome.storage.local.set({ lang }, callback)
}

export const getDataToExport = (callback?: (lang: StorageResult) => void) => {
  chrome.storage.local.get(null, callback)
}

export const importData = (data: any, callback?: () => void) => {
  chrome.storage.local.set({ ...data }, callback)
}

export const clearData = (callback?: () => void) => {
  listTopics((topics) => {
    topics.forEach(({ tasks }) => {
      tasks.forEach(({ id }) => {
        chrome.storage.local.set({ [id]: null })
      })
    })
    chrome.storage.local.set({ theme: null })
    chrome.storage.local.set({ lang: null })
    chrome.storage.local.set({
      topics: topics
        .filter(({ id }) => id === TOPIC_DEFAULT_ID)
        .map((topic) => ({ ...topic, tasks: [] })),
    })
    callback && callback()
  })
}

export const getCommandsFromContextSelection = (
  callback?: (commands: string[] | Command[]) => void,
) => {
  chrome.storage.local.get(['contextSelectionCommands', 'link'], (result) => {
    const { contextSelectionCommands, link } = result
    callback && callback(contextSelectionCommands)
  })
}

export const updateCommandsContextSelection = (
  newCommands: Command[],
  callback?: () => void,
) => {
  chrome.storage.local.set({ contextSelectionCommands: newCommands }, callback)
}

export const clearCommandsContextSelection = (callback?: () => void) => {
  chrome.storage.local.set({ contextSelectionCommands: null }, callback)
}
