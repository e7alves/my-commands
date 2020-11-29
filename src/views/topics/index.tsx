import React, { useState, useContext } from 'react'

import { LangContext } from '../../lang/langConfig'

import { updateTopics, deleteTopic } from '../../data/storageActions'
import { Topic } from '../../data/dataTypes'

import { Container } from './style'
import TopicList from '../../components/lists/topicList'
import ConfirmModal from '../../components/modals/confirmModal'
import AddAndEditTopicModal from '../../components/modals/addAndEditTopicModal'

import { TopicsContext, TopicsContextType } from '../../topicsContext'

const Topics: React.FC = () => {
  const messages = useContext(LangContext)

  const { topics, refreshTopics, switchAddTopicModal } = useContext<
    TopicsContextType
  >(TopicsContext)

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
    setConfirmModalIsOpen(false)
  }

  function onConfirmEditOrAddTopic(newTopicName: string) {
    const updatedTopic = {
      ...selectedTopic,
      name: newTopicName,
    }
    updateTopics([updatedTopic], refreshTopics)
    setEditTopicModalIsOpen(false)
  }

  return (
    <>
      <ConfirmModal
        isOpen={confirmModalIsOpen}
        close={() => setConfirmModalIsOpen(false)}
        content={selectedTopic && selectedTopic.name}
        title={messages['text.deleteTopicAlert']}
        onConfirm={onConfirmDeleteTopic}
      />
      <AddAndEditTopicModal
        isOpen={editTopicModalIsOpen}
        close={() => setEditTopicModalIsOpen(false)}
        content={selectedTopic && selectedTopic.name}
        title={messages['label.renameTopic']}
        onConfirm={onConfirmEditOrAddTopic}
      />
      <Container>
        <TopicList
          topics={topics}
          title={messages['label.topics']}
          onDelete={onDeleteTopic}
          onEdit={onEditTopic}
          onAdd={() => switchAddTopicModal(true)}
        />
      </Container>
    </>
  )
}

export default Topics
