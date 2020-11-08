import React, { useState, useEffect } from 'react'

import { updateTopics, deleteTopic, createTopic } from '../../data/storage'
import { Topic, TaskToSelect } from '../../data/dataTypes'

import { Container } from './style'
import TopicList from '../../components/lists/topicList'
import ConfirmModal from '../../components/modal/confirmModal'
import AddAndEditTopicModal from '../../components/modal/addAndEditTopicModal'

interface Props {
  topics: Topic[]
  refreshTopics: () => void
  tasks: TaskToSelect[]
  openAddTopicModal: () => void
}

const Topics: React.FC<Props> = ({
  topics,
  refreshTopics,
  openAddTopicModal,
}) => {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState<boolean>(false)
  const [editTopicModalIsOpen, setEditTopicModalIsOpen] = useState<boolean>(
    false,
  )
  const [selectedTopic, setSelectedTopic] = useState<Topic>(null)

  function onDeleteTopic(idx: number) {
    setSelectedTopic(topics[idx])
    setConfirmModalIsOpen(true)
  }

  function onEditTopic(idx: number) {
    setSelectedTopic(topics[idx])
    setEditTopicModalIsOpen(true)
  }

  function onConfirmDeleteTopic() {
    const { id } = selectedTopic
    deleteTopic(id, refreshTopics)
  }

  function onConfirmEditOrAddTopic(newTopicName: string) {
    const updatedTopic = {
      ...selectedTopic,
      name: newTopicName,
    }
    updateTopics([updatedTopic], refreshTopics)
    setConfirmModalIsOpen(false)
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
        isOpen={editTopicModalIsOpen}
        close={() => setEditTopicModalIsOpen(false)}
        content={selectedTopic && selectedTopic.name}
        title="Rename topic"
        onConfirm={onConfirmEditOrAddTopic}
      />
      <Container>
        <TopicList
          topics={topics}
          title="Topics"
          onDelete={onDeleteTopic}
          onEdit={onEditTopic}
          onAdd={openAddTopicModal}
        />
      </Container>
    </>
  )
}

export default Topics
