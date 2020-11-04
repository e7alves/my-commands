import React, { useState, useEffect } from 'react'

import Modal from '..'
import { ModalContent } from './style'
import { ButtonsPanel } from '../style'
import { PrimaryBtn, CancelBtn } from '../../buttons'
import TextField from '../../inputs/textField'

interface Props {
  isOpen: boolean
  close: () => void
  content: string
  title: string
  onConfirm: (topicName: string) => void
}

const AddAndEditTopicModal: React.FC<Props> = ({
  isOpen,
  close,
  content,
  title,
  onConfirm,
}) => {
  const [topicName, setTopicName] = useState('')

  useEffect(() => setTopicName(content), [content])

  function onTextChange(e: React.FormEvent<HTMLInputElement>) {
    setTopicName(e.currentTarget.value)
  }

  return (
    <Modal isOpen={isOpen} title={title} height="120px" close={close}>
      <ModalContent>
        <TextField value={topicName} onChange={onTextChange} />
        <ButtonsPanel>
          <CancelBtn onClick={close}>cancel</CancelBtn>
          <PrimaryBtn onClick={() => onConfirm(topicName)}>confirm</PrimaryBtn>
        </ButtonsPanel>
      </ModalContent>
    </Modal>
  )
}

export default AddAndEditTopicModal
