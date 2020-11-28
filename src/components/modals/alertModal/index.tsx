import React from 'react'

import Modal from '..'
import { ModalContent, AlertText } from './style'
import { ButtonsPanel } from '../style'
import { PrimaryBtn, CancelBtn } from '../../buttons'

interface Props {
  isOpen: boolean
  close: () => void
  height?: string
  title: string
  content: React.ReactNode
  children?: React.ReactNode
  onConfirm: () => void
  showOkButton?: boolean
}

const AlertModal: React.FC<Props> = ({
  isOpen,
  close,
  title,
  content,
  onConfirm,
  showOkButton,
}) => (
  <Modal
    isOpen={isOpen}
    title={title}
    height="120px"
    close={close}
    shouldCloseOnOverlayClick={false}
  >
    <ModalContent>
      <AlertText>{content}</AlertText>
      {showOkButton && (
        <ButtonsPanel>
          <PrimaryBtn onClick={onConfirm}>ok</PrimaryBtn>
        </ButtonsPanel>
      )}
    </ModalContent>
  </Modal>
)

AlertModal.defaultProps = {
  showOkButton: true,
}

export default AlertModal
