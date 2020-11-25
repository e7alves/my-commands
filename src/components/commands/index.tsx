import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Command } from '../../data/dataTypes'

import { CommandList, CommandListItem } from './style'
import CommandDescription from './commandDescription'
import CommandField from './commandField'
import { AddCommandBtn } from '../buttons/index'

interface Props {
  editMode: boolean
  commands: Command[]
  onCommandsChange: (newCommmands: Command[]) => void
  onCancelEdition: () => void
  onSaveEdition: (commands: Command[]) => void
}

const Commands: React.FC<Props> = ({
  editMode,
  commands,
  onCommandsChange,
}) => {
  function onChangePosition(idx: number, toUp?: boolean) {
    if ((idx === 0 && toUp) || (idx === commands.length - 1 && !toUp)) {
      return
    }
    const idxToChange = toUp ? idx - 1 : idx + 1
    const newCommands = [...commands]
    newCommands[idxToChange] = commands[idx]
    newCommands[idx] = commands[idxToChange]
    onCommandsChange(newCommands)
  }

  function onDelete(idxToDelete: number) {
    onCommandsChange(commands.filter((command, idx) => idx !== idxToDelete))
  }

  function onAddCommand() {
    onCommandsChange([
      ...commands,
      {
        id: uuidv4(),
        command: '',
        description: '',
        autoFocus: true,
      },
    ])
  }

  function onCommandChange(idx: number, newCommand: Command) {
    const newCommandsCopy = [...commands]
    newCommandsCopy[idx] = newCommand
    onCommandsChange(newCommandsCopy)
  }

  return (
    <>
      <CommandList>
        {commands &&
          commands.map((command, idx) => (
            <CommandListItem key={command.id}>
              <CommandDescription
                editMode={editMode}
                command={command}
                index={idx}
                onCommandChange={onCommandChange}
              />
              <CommandField
                id={command.id}
                editMode={editMode}
                command={command}
                index={idx}
                onChangePosition={onChangePosition}
                onDelete={onDelete}
                onCommandChange={onCommandChange}
              />
            </CommandListItem>
          ))}
      </CommandList>
      {editMode && <AddCommandBtn onClick={onAddCommand} />}
    </>
  )
}

export default Commands
