import React, { useState, useEffect } from 'react'
import { DefaultTheme, withTheme } from 'styled-components'

import { Topic, TaskToSelect } from '../../data/dataTypes'
import TOPIC_DEFAULT_ID from '../../consts'

import { Container } from './style'
import { HorizInputSection } from '../../components/inputs/style'
import TaskList from '../../components/taskList'
import Label from '../../components/inputs/label'
import { SquaredBtn } from '../../components/buttons'
import Icon from '../../components/icon'
import SelectBox from '../../components/inputs/selectBox'

interface Props {
  topics: Topic[]
  tasks: TaskToSelect[]
  theme: DefaultTheme
}

const Tasks: React.FC<Props> = ({ theme, topics }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    TOPIC_DEFAULT_ID,
  )
  const [tasks, setTasks] = useState<TaskToSelect[]>([])

  function onSelectChange(e: React.FormEvent<HTMLSelectElement>) {
    const topicId = e.currentTarget.value
    setSelectedTopicId(topicId)
    const { tasks } = topics.find(({ id }) => id === topicId)
    setTasks(tasks)
  }

  function onDeleteTask(idx: number) {
    const taskToDelete = tasks[idx]
    alert(`Você quer deletar a task: ${taskToDelete.name}`)
  }

  return (
    <Container>
      <HorizInputSection>
        <Label>Topics</Label>
        <SelectBox
          id="topic"
          options={topics}
          value={`${selectedTopicId}`}
          onChange={onSelectChange}
        />
      </HorizInputSection>
      <Label>Tasks</Label>
      <SquaredBtn
        style={{
          backgroundColor: theme.secondaryButtonBtn,
          marginLeft: '10px',
        }}
      >
        <Icon name="plus" />
      </SquaredBtn>
      <TaskList tasks={tasks} onDelete={onDeleteTask} />
    </Container>
  )
}

export default withTheme(Tasks)
