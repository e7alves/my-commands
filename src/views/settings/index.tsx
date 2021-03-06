import React, { useContext, useState } from 'react'
import { withTheme, DefaultTheme } from 'styled-components'
import FileSaver from 'file-saver'

import { getDataToExport, clearData } from '../../data/storageActions'

import { exportFileName } from '../../consts'
import { langs, LangContext } from '../../lang/langConfig'

import windowDefaultOptions from '../../data/windowDefaultOptions'

import { Container, Section } from './style'
import { HorizInputSection } from '../../components/inputs/style'
import Label from '../../components/inputs/label'
import SelectBox from '../../components/inputs/selectBox'
import { SecondaryBtn } from '../../components/buttons'
import Radios from '../../components/inputs/radios'
import ConfirmModal from '../../components/modals/confirmModal'
import AlertModal from '../../components/modals/alertModal'
import ImportDataModal from '../../components/modals/importDataModal'

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
  const [importDataModalIsOpen, setImportDataModalIsOpen] = useState<boolean>(
    false,
  )

  function onExportData() {
    getDataToExport((data) => {
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json;charset=utf-8',
      })
      FileSaver.saveAs(blob, exportFileName)
    })
  }

  function onImportDataButtonClick() {
    setImportDataModalIsOpen(true)
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

  function onResetWindowOptions() {
    const { width, height, screenLeft, screenTop } = windowDefaultOptions
    window.resizeTo(width, height)
    window.moveTo(screenLeft, screenTop)
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
            <Label style={{ width: labelWidth }}>
              {messages['label.theme']}
            </Label>
            <Radios
              options={['dark', 'light']}
              onChange={(theme) => updateTheme(theme)}
              value={currentTheme}
            />
          </HorizInputSection>
        </Section>
        <Section>
          <HorizInputSection>
            <Label style={{ width: labelWidth }}>
              {messages['label.data']}
            </Label>
            <HorizInputSection>
              <SecondaryBtn
                iconName="export"
                style={{
                  border: `1px solid ${theme.secondaryButtonBg}`,
                }}
                onClick={onExportData}
              >
                {messages['label.export']}
              </SecondaryBtn>
              <SecondaryBtn
                iconName="import"
                style={{
                  marginLeft: '1rem',
                  border: `1px solid ${theme.secondaryButtonBg}`,
                }}
                onClick={onImportDataButtonClick}
              >
                {messages['label.import']}
              </SecondaryBtn>
              <SecondaryBtn
                iconName="delete-forever"
                style={{
                  marginLeft: '1rem',
                  backgroundColor: theme.clearButtonBg,
                  border: `1px solid ${theme.clearButtonBorderColor}`,
                  color: theme.dangerColor,
                  boxSizing: 'content-box',
                }}
                onClick={onClearDataButtonClick}
              >
                {messages['label.clearData']}
              </SecondaryBtn>
            </HorizInputSection>
          </HorizInputSection>
        </Section>
        <Section>
          <HorizInputSection>
            <Label style={{ width: labelWidth }}>
              {messages['label.window']}
            </Label>
            <SecondaryBtn
              iconName="window-restore"
              onClick={onResetWindowOptions}
            >
              {messages['label.resetWindowOptions']}
            </SecondaryBtn>
          </HorizInputSection>
        </Section>
      </Container>
      <ConfirmModal
        isOpen={confirmModalIsOpen}
        close={() => setConfirmModalIsOpen(false)}
        content=""
        title={messages['text.deleteDataAlert']}
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
      <ImportDataModal
        isOpen={importDataModalIsOpen}
        close={() => setImportDataModalIsOpen(false)}
      />
    </>
  )
}

export default withTheme(Settings)
