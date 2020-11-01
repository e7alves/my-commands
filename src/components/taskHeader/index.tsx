import React, { useMemo } from 'react'

import { TaskInfo, Topic } from '../../dataTypes'

import { Container, InnerContainer, Section } from './style'
import TextField from '../inputs/textField'
import SelectBox from '../inputs/selectBox'
import Label from '../inputs/label'
import Link from '../link'

interface Props {
  editMode: boolean
  topics: Topic[]
  taskInfo: TaskInfo
  setTaskInfo: (newTaskInfo: TaskInfo) => void
}

const TaskHeader: React.FC<Props> = ({
  editMode,
  topics,
  taskInfo,
  setTaskInfo,
}) => {
  function renderLabel(text: string, htmlFor?: string) {
    return (
      <Label style={{ width: '2rem', marginRight: '0.5rem' }} htmlFor={htmlFor}>
        {text}
      </Label>
    )
  }

  const { topicId, name, link } = taskInfo

  const topicName = useMemo(
    () => topics.find((topic) => topic.id === topicId).name,
    [topicId],
  )

  function onSelectChange(e: React.FormEvent<HTMLSelectElement>) {
    setTaskInfo({
      ...taskInfo,
      topicId: e.currentTarget.value,
    })
  }

  function onTextChange(e: React.FormEvent<HTMLInputElement>) {
    setTaskInfo({
      ...taskInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  return (
    <Container editMode={editMode}>
      <InnerContainer>
        {editMode ? (
          <>
            <Section>
              {renderLabel('Topic', 'topic')}
              <SelectBox
                id="topic"
                options={topics}
                value={`${topicId}`}
                onChange={onSelectChange}
              />
            </Section>
            <Section>
              {renderLabel('Task', 'task')}
              <TextField
                id="task"
                name="name"
                value={name}
                onChange={onTextChange}
              />
            </Section>
            <Section>
              {renderLabel('Link', 'link')}
              <TextField
                id="link"
                name="link"
                value={link}
                onChange={onTextChange}
              />
            </Section>
          </>
        ) : (
          <>
            <Section>
              {renderLabel('Topic')}
              <p>{topicName}</p>
            </Section>
            <Section>
              {renderLabel('Task')}
              <p>{name}</p>
            </Section>
            {link && (
              <Section>
                {renderLabel('Link')}
                <Link to={link}>
                  {link.length > 37 ? `${link.slice(0, 37)}...` : link}
                </Link>
              </Section>
            )}
          </>
        )}
      </InnerContainer>
    </Container>
  )
}

export default TaskHeader
