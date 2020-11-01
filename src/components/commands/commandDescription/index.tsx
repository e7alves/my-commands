import React, { useState, useEffect } from 'react'

import { Command } from '../../../dataTypes'

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
        <TextBtn onClick={() => setShowDescription(true)}>
          Add description
        </TextBtn>
      )
    }
    return description && <StaticDescription>{description}</StaticDescription>
  }

  return <Wrapper>{renderDescription()}</Wrapper>
}

export default CommandDescription
