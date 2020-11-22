import { createContext } from 'react'
import { Topic } from './data/dataTypes'

export interface TopicsContextType {
  topics: Topic[]
  refreshTopics: () => void
  switchAddTopicModal: (value: boolean) => void
}

export const TopicsContext = createContext<TopicsContextType>({
  topics: undefined,
  refreshTopics: undefined,
  switchAddTopicModal: undefined,
})
