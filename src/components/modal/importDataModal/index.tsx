import React, { useRef } from 'react'

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
      title="Alert"
      height="120px"
      close={close}
      shouldCloseOnOverlayClick={false}
    >
      <ModalContent>
        <AlertText>
          if you import data, all existing data will be removed
        </AlertText>
        <ButtonsPanel>
          <CancelBtn onClick={close}>cancel</CancelBtn>
          <PrimaryBtn onClick={onImportButtonClick}>Import</PrimaryBtn>
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
