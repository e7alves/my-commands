export enum CommandsTypes {
  LIST_TOPICS = 'LIST_TOPICS',
  LIST_TOPICS_SUCCESS = 'LIST_TOPICS_SUCCESS',
}

export interface Topic {
  id: number
  name: string
}

export interface CommandsState {
  topics: Topic[]
}
