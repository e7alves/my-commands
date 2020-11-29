import React, { useContext, useRef } from 'react'

import { LangContext } from '../../../lang/langConfig'

import { importData } from '../../../data/storageActions'

import Modal from '..'
import { ModalContent, AlertText, FileUploadButton } from './style'
import { ButtonsPanel } from '../style'
import { PrimaryBtn, CancelBtn } from '../../buttons'

interface Props {
  isOpen: boolean
  close: () => void
}

const ConfirmImportModal: React.FC<Props> = ({ isOpen, close }) => {
  const messages = useContext(LangContext)

  const fileUploadRef = useRef(null)

  function onImportButtonClick() {
    fileUploadRef.current.click()
  }

  function onImportData(e: React.FormEvent<HTMLInputElement>) {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      try {
        const data = JSON.parse(fileReader.result as string)
        importData(data, () => window.location.reload())
      } catch (error) {
        window.alert('Invalid file content')
      }
    }
    fileReader.readAsText(e.currentTarget.files[0])
  }

  return (
    <Modal
      isOpen={isOpen}
      title={messages['label.alert']}
      height="120px"
      close={close}
    >
      <ModalContent>
        <AlertText>{messages['text.importDataAlert']}</AlertText>
        <ButtonsPanel>
          <CancelBtn onClick={close} style={{ marginRight: '0.2rem' }}>
            {messages['label.cancel']}
          </CancelBtn>
          <PrimaryBtn
            onClick={onImportButtonClick}
            style={{ marginLeft: '0.2rem' }}
          >
            {messages['label.import']}
          </PrimaryBtn>
          <FileUploadButton
            type="file"
            ref={fileUploadRef}
            onChange={onImportData}
          />
        </ButtonsPanel>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmImportModal
