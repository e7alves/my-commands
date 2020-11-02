import React from 'react'

import Modal from '..'
import { ModalContent, ButtonsPanel, ConfirmText } from './style'
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
}) => (
  <Modal isOpen={isOpen} title={title} height="120px" close={close}>
    <ModalContent>
      <ConfirmText>
        {content && content.length > 80
          ? `${content.slice(0, 80)}...`
          : content}
      </ConfirmText>
      <ButtonsPanel>
        <CancelBtn onClick={close}>cancel</CancelBtn>
        <PrimaryBtn onClick={onConfirm}>confirm</PrimaryBtn>
      </ButtonsPanel>
    </ModalContent>
  </Modal>
)

export default ConfirmModal
