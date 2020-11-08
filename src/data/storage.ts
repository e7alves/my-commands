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
    topics.push(topic)
    chrome.storage.local.set({ topics }, callback)
  })
}

export const saveTask = (task: Task, callback?: () => void) => {
  const { id } = task
  chrome.storage.local.set({ [id]: task }, callback)
}
