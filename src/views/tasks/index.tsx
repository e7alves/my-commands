import React, { useState, useEffect, useContext } from 'react'

import { LangContext } from '../../lang/langConfig'

import {
  deleteTask,
  updateTopics,
  setLastTopicSelected,
  getLastTopicSelected,
} from '../../data/storageActions'
import { TaskToSelect } from '../../data/dataTypes'
import { TOPIC_DEFAULT_ID } from '../../consts'

import { Container } from './style'
import { HorizInputSection } from '../../components/inputs/style'
import TaskList from '../../components/lists/taskList'
import Label from '../../components/inputs/label'
import SelectBox from '../../components/inputs/selectBox'
import ConfirmModal from '../../components/modals/confirmModal'

import { TopicsContext, TopicsContextType } from '../../topicsContext'

import useQuery from '../../useQuery'

const Tasks: React.FC = () => {
  const messages = useContext(LangContext)

  const topicId = useQuery().get('topicId')

  const { topics, refreshTopics } = useContext<TopicsContextType>(TopicsContext)

  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    topicId || TOPIC_DEFAULT_ID,
  )
  const [tasks, setTasks] = useState<TaskToSelect[]>(null)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [taskToDelete, setTaskToDelete] = useState<TaskToSelect>(null)

  useEffect(() => {
    getLastTopicSelected((lastTopicSelected) => {
      lastTopicSelected && setSelectedTopicId(lastTopicSelected)
    })
  }, [])

  function onSelectChange(e: React.FormEvent<HTMLSelectElement>) {
    const topicId = e.currentTarget.value
    setLastTopicSelected(topicId, () => setSelectedTopicId(topicId))
  }

  useEffect(() => {
    const topic = topics.find(({ id }) => id === selectedTopicId)
    topic && setTasks(topic.tasks)
  }, [selectedTopicId, topics])

  function onDeleteTask(idx: number) {
    setTaskToDelete(tasks[idx])
    setModalIsOpen(true)
  }

  function onConfirmDeleteTask() {
    const { id } = taskToDelete
    const topic = topics.find(({ id }) => id === selectedTopicId)
    const updatedTopic = {
      ...topic,
      tasks: topic.tasks.filter((task) => task.id !== id),
    }
    deleteTask(id, () => {
      updateTopics([updatedTopic], () => {
        setModalIsOpen(false)
        refreshTopics()
      })
    })
  }

  return (
    <>
      <ConfirmModal
        isOpen={modalIsOpen}
        close={() => setModalIsOpen(false)}
        title={messages['text.deleteTaskAlert']}
        content={taskToDelete && taskToDelete.name}
        onConfirm={onConfirmDeleteTask}
      />
      <Container>
        <HorizInputSection style={{ marginBottom: '1.5rem' }}>
          <Label>{messages['label.topics']}</Label>
          <SelectBox
            id="topic"
            options={topics}
            value={`${selectedTopicId}`}
            onChange={onSelectChange}
          />
        </HorizInputSection>
        <TaskList
          tasks={tasks}
          onDelete={onDeleteTask}
          topicId={selectedTopicId}
        />
      </Container>
    </>
  )
}

export default Tasks
