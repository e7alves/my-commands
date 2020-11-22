import React from 'react'
import ReactModal from 'react-modal'
import { DefaultTheme, withTheme } from 'styled-components'

import { ModalTitle } from './style'

ReactModal.setAppElement('#app')

const overlayStyle: React.CSSProperties = {
  backgroundColor: 'rgba(150, 166, 188, 0.5)',
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
}

const modalStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
  padding: '10px',
  position: 'static',
  margin: '250px 0 0 0',
  transform: 'none',
  width: '325px',
}

ReactModal.defaultStyles.overlay = overlayStyle

interface Props {
  isOpen: boolean
  close: () => void
  theme: DefaultTheme
  title?: string
  height?: string
  children?: React.ReactNode
  shouldCloseOnOverlayClick?: boolean
}

const Modal: React.FC<Props> = ({
  isOpen,
  close,
  theme,
  title,
  height,
  children,
  shouldCloseOnOverlayClick,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={close}
    style={{
      content: { ...modalStyle, backgroundColor: theme.background, height },
    }}
    shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
  >
    <ModalTitle>{title}</ModalTitle>
    {children}
  </ReactModal>
)

Modal.defaultProps = {
  height: '100px',
  shouldCloseOnOverlayClick: true,
}

export default withTheme(Modal)
