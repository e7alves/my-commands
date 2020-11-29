import React, { useContext } from 'react'

import { LangContext } from '../../../lang/langConfig'

import Modal from '..'
import { ModalContent, ConfirmText } from './style'
import { ButtonsPanel } from '../style'
import { PrimaryBtn, CancelBtn } from '../../buttons'

interface Props {
  isOpen: boolean
  close: () => void
  height?: string
  title: string
  content: string
  children?: React.ReactNode
  onConfirm: () => void
}

const ConfirmModal: React.FC<Props> = ({
  isOpen,
  close,
  title,
  content,
  onConfirm,
}) => {
  const messages = useContext(LangContext)

  return (
    <Modal isOpen={isOpen} title={title} height="120px" close={close}>
      <ModalContent>
        <ConfirmText>
          {content && content.length > 80
            ? `${content.slice(0, 80)}...`
            : content}
        </ConfirmText>
        <ButtonsPanel>
          <CancelBtn onClick={close} style={{ marginRight: '0.2rem' }}>
            {messages['label.cancel']}
          </CancelBtn>
          <PrimaryBtn onClick={onConfirm} style={{ marginLeft: '0.2rem' }}>
            {messages['label.confirm']}
          </PrimaryBtn>
        </ButtonsPanel>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
