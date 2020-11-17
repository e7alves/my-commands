import React, { useContext, useState } from 'react'
import { withTheme, DefaultTheme } from 'styled-components'
import FileSaver from 'file-saver'

import {
  getDataToExport,
  importData,
  clearData,
} from '../../data/storageActions'

import { exportFileName } from '../../consts'
import { langs, LangContext } from '../../lang/langConfig'

import { Container, Section } from './style'
import { HorizInputSection } from '../../components/inputs/style'
import Label from '../../components/inputs/label'
import SelectBox from '../../components/inputs/selectBox'
import { SecondaryBtn, TextBtn } from '../../components/buttons'
import Radios from '../../components/inputs/radios'
import FileUpload from '../../components/inputs/fileUpload'
import ConfirmModal from '../../components/modal/confirmModal'
import AlertModal from '../../components/modal/alertModal'

interface Props {
  theme: DefaultTheme
  currentTheme: string
  updateTheme: (theme: string) => void
  currentLang: string
  updateLang: (theme: string) => void
}

interface AlertModalMsgType {
  title?: string
  content?: React.ReactNode
  showOkButton?: boolean
}

const Settings: React.FC<Props> = ({
  theme,
  currentTheme,
  updateTheme,
  currentLang,
  updateLang,
}) => {
  const messages = useContext(LangContext)

  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState<boolean>(false)
  const [alertModalIsOpen, setAlertModalIsOpen] = useState<boolean>(false)
  const [alertModalMsg, setAlertModalMsg] = useState<AlertModalMsgType>({
    title: null,
    content: null,
    showOkButton: false,
  })

  function onExportData() {
    getDataToExport((data) => {
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json;charset=utf-8',
      })
      FileSaver.saveAs(blob, exportFileName)
    })
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

  function onClearDataButtonClick() {
    setConfirmModalIsOpen(true)
  }

  function onClearData() {
    setConfirmModalIsOpen(false)
    setAlertModalIsOpen(true)
    setAlertModalMsg({
      ...alertModalMsg,
      title: 'Removing data...',
    })
    clearData(() => {
      setTimeout(() => {
        setAlertModalMsg({
          title: 'Data removed',
          content: 'Refresh page',
          showOkButton: true,
        })
      }, 2000)
    })
  }

  const labelWidth = '3.5rem'
  return (
    <>
      <Container>
        <Section>
          <HorizInputSection>
            <Label htmlFor="lang" style={{ width: labelWidth }}>
              {messages['label.language']}
            </Label>
            <SelectBox
              id="lang"
              onChange={(e) => updateLang(e.currentTarget.value)}
              options={langs}
              value={currentLang}
              style={{ flex: 1 }}
            />
          </HorizInputSection>
        </Section>
        <Section>
          <HorizInputSection>
            <Label style={{ width: labelWidth }}>Theme</Label>
            <Radios
              options={['dark', 'light']}
              onChange={(theme) => updateTheme(theme)}
              value={currentTheme}
            />
          </HorizInputSection>
        </Section>
        <Section>
          <HorizInputSection>
            <Label style={{ width: labelWidth }} htmlFor="lang">
              Data
            </Label>
            <SecondaryBtn iconName="download" onClick={onExportData}>
              Export
            </SecondaryBtn>
            <FileUpload
              onChange={onImportData}
              text="Import"
              style={{ marginLeft: '1rem' }}
            />
            <SecondaryBtn
              iconName="delete-forever"
              style={{
                marginLeft: '1rem',
                backgroundColor: theme.text,
                color: theme.dangerColor,
              }}
              onClick={onClearDataButtonClick}
            >
              Clear
            </SecondaryBtn>
          </HorizInputSection>
        </Section>
      </Container>
      <ConfirmModal
        isOpen={confirmModalIsOpen}
        close={() => setConfirmModalIsOpen(false)}
        content=""
        title="Are you sure you want to delete all data"
        onConfirm={onClearData}
      />
      <AlertModal
        isOpen={alertModalIsOpen}
        close={() => setAlertModalIsOpen(false)}
        content={alertModalMsg.content}
        title={alertModalMsg.title}
        onConfirm={() => window.location.reload()}
        showOkButton={alertModalMsg.showOkButton}
      />
    </>
  )
}

export default withTheme(Settings)
