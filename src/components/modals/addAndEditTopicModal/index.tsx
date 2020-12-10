import React, { useState, useEffect, useContext } from 'react'

import { LangContext } from '../../../lang/langConfig'

import Modal from '..'
import { ModalContent, TextFieldWrapper } from './style'
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
  const messages = useContext(LangContext)

  const [topicName, setTopicName] = useState('')

  useEffect(() => setTopicName(content), [content])

  function onTextChange(e: React.FormEvent<HTMLInputElement>) {
    setTopicName(e.currentTarget.value)
  }

  function onClickButton() {
    setTopicName('')
    onConfirm(topicName)
  }

  return (
    <Modal isOpen={isOpen} title={title} height="120px" close={close}>
      <ModalContent>
        <TextFieldWrapper>
          <TextField
            value={topicName}
            onChange={onTextChange}
            onKeyDown={onClickButton}
          />
        </TextFieldWrapper>
        <ButtonsPanel>
          <CancelBtn onClick={close} style={{ marginLeft: '0.2rem' }}>
            {messages['label.cancel']}
          </CancelBtn>
          <PrimaryBtn onClick={onClickButton} style={{ marginLeft: '0.2rem' }}>
            {messages['label.confirm']}
          </PrimaryBtn>
        </ButtonsPanel>
      </ModalContent>
    </Modal>
  )
}

export default AddAndEditTopicModal
