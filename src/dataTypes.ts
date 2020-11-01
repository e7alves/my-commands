export interface Topic {
  id: string
  name: string
}

export interface Command {
  id: string
  description?: string
  command: string
  autoFocus?: boolean
}

export interface TaskInfo {
  topicId: string
  name: string
  link?: string
}

export interface Task extends TaskInfo {
  id: string
  commands: Command[]
}
