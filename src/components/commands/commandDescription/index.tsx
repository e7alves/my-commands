import React, { useState, useEffect, useContext } from 'react'

import { LangContext } from '../../../lang/langConfig'

import { Command } from '../../../data/dataTypes'

import { Wrapper, EditableDescription, StaticDescription } from './style'
import { TextBtn } from '../../buttons/index'

interface Props {
  editMode: boolean
  command: Command
  index: number
  onCommandChange: (idx: number, newCommand: Command) => void
}

const CommandDescription: React.FC<Props> = ({
  command,
  index,
  editMode,
  onCommandChange,
}) => {
  const messages = useContext(LangContext)

  const [showDescription, setShowDescription] = useState<boolean>(false)

  useEffect(() => setShowDescription(false), [editMode])

  function onChangeHandler(e: React.FormEvent<HTMLTextAreaElement>) {
    onCommandChange(index, {
      ...command,
      description: e.currentTarget.value,
    })
  }

  function renderDescription() {
    const { description } = command
    if (editMode) {
      return showDescription || description ? (
        <EditableDescription value={description} onChange={onChangeHandler} />
      ) : (
        <TextBtn onClick={() => setShowDescription(true)} tabIndex="-1">
          {messages['label.addDescription']}
        </TextBtn>
      )
    }
    return description && <StaticDescription>{description}</StaticDescription>
  }

  return <Wrapper>{renderDescription()}</Wrapper>
}

export default CommandDescription
