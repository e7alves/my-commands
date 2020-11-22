import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { deleteTask, updateTopics } from '../../data/storageActions'
import { Topic, TaskToSelect } from '../../data/dataTypes'
import { TOPIC_DEFAULT_ID } from '../../consts'

import { Container } from './style'
import { HorizInputSection } from '../../components/inputs/style'
import TaskList from '../../components/lists/taskList'
import Label from '../../components/inputs/label'
import SelectBox from '../../components/inputs/selectBox'
import ConfirmModal from '../../components/modal/confirmModal'

interface TopicParam {
  topicId: string
}

interface Props {
  topics: Topic[]
  refreshTopics: () => void
  tasks: TaskToSelect[]
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Tasks: React.FC<Props> = ({ topics, refreshTopics }) => {
  const topicId = useQuery().get('topicId')

  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    topicId || TOPIC_DEFAULT_ID,
  )
  const [tasks, setTasks] = useState<TaskToSelect[]>(null)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [taskToDelete, setTaskToDelete] = useState<TaskToSelect>(null)

  function onSelectChange(e: React.FormEvent<HTMLSelectElement>) {
    const topicId = e.currentTarget.value
    setSelectedTopicId(topicId)
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
        title="Are you sure you want to delete this task:"
        content={taskToDelete && taskToDelete.name}
        onConfirm={onConfirmDeleteTask}
      />
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
        <TaskList tasks={tasks} title="Tasks" onDelete={onDeleteTask} />
      </Container>
    </>
  )
}

export default Tasks
