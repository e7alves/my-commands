import { action } from 'typesafe-actions'

import { CommandsTypes, Topic } from './types'

export const listTopics = () => action(CommandsTypes.LIST_TOPICS)

export const listTopicsSuccess = (topics: Topic[]) =>
  action(CommandsTypes.LIST_TOPICS_SUCCESS, topics)
