import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { updateTopic, deleteTopic, createTopic } from '../../data/storage'
import { Topic, TaskToSelect } from '../../data/dataTypes'

import { Container } from './style'
import TopicList from '../../components/lists/topicList'
import ConfirmModal from '../../components/modal/confirmModal'
import AddAndEditTopicModal from '../../components/modal/addAndEditTopicModal'

interface Props {
  topics: Topic[]
  refreshTopics: () => void
  tasks: TaskToSelect[]
}

const Topics: React.FC<Props> = ({ topics, refreshTopics }) => {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState<boolean>(false)
  const [addAndEditTopicModalIsOpen, setAddAndEditTopicModalIsOpen] = useState<
    boolean
  >(false)
  const [editingTopic, setEditingTopic] = useState<boolean>()
  const [selectedTopic, setSelectedTopic] = useState<Topic>(null)

  function onDeleteTopic(idx: number) {
    setSelectedTopic(topics[idx])
    setConfirmModalIsOpen(true)
  }

  function onEditTopic(idx: number) {
    setEditingTopic(true)
    setSelectedTopic(topics[idx])
    setAddAndEditTopicModalIsOpen(true)
  }

  function onAddTopic() {
    setEditingTopic(false)
    setAddAndEditTopicModalIsOpen(true)
  }

  function onConfirmDeleteTopic() {
    const { id } = selectedTopic
    deleteTopic(id, refreshTopics)
  }

  function onConfirmEditOrAddTopic(newTopicName: string) {
    if (editingTopic) {
      const updatedTopic = {
        ...selectedTopic,
        name: newTopicName,
      }
      updateTopic(updatedTopic, refreshTopics)
      setConfirmModalIsOpen(false)
    } else {
      createTopic(
        {
          id: uuidv4(),
          name: newTopicName,
          tasks: [],
        },
        refreshTopics,
      )
    }
  }

  return (
    <>
      <ConfirmModal
        isOpen={confirmModalIsOpen}
        close={() => setConfirmModalIsOpen(false)}
        content={selectedTopic && selectedTopic.name}
        title="Are you sure you want to delete this topic:"
        onConfirm={onConfirmDeleteTopic}
      />
      <AddAndEditTopicModal
        isOpen={addAndEditTopicModalIsOpen}
        close={() => setAddAndEditTopicModalIsOpen(false)}
        content={selectedTopic && selectedTopic.name}
        title={editingTopic ? 'Rename topic' : 'New topic'}
        onConfirm={onConfirmEditOrAddTopic}
      />
      <Container>
        <TopicList
          topics={topics}
          title="Topics"
          onDelete={onDeleteTopic}
          onEdit={onEditTopic}
          onAdd={onAddTopic}
        />
      </Container>
    </>
  )
}

export default Topics
