import React from 'react'

import { TaskToSelect } from '../../data/dataTypes'

import { StyledTopicList, TopicListItem, TopicListLink } from './style'
import { IconBtn } from '../buttons'

interface Props {
  tasks: TaskToSelect[]
  onDelete: (idx: number) => void
}

const TopicList: React.FC<Props> = ({ tasks, onDelete }) => {
  if (tasks.length === 0) {
    return <p>Empty</p>
  }
  return (
    <StyledTopicList>
      {tasks.map(({ id, name }, idx) => (
        <TopicListItem key={id}>
          <TopicListLink to={`/task/${id}`}>
            {name}
            <IconBtn
              onClick={(e) => {
                e.preventDefault()
                onDelete(idx)
              }}
              iconName="close"
            />
          </TopicListLink>
        </TopicListItem>
      ))}
    </StyledTopicList>
  )
}

export default TopicList
