import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Command } from '../../dataTypes'

import { CommandList, CommandListItem } from './style'
import CommandDescription from './commandDescription'
import CommandField from './commandField'
import { AddCommandBtn } from '../buttons/index'

interface Props {
  editMode: boolean
  commands: Command[]
  setCommands: (newCommmands: Command[]) => void
  onCancelEdition: () => void
  onSaveEdition: (commands: Command[]) => void
}

const Commands: React.FC<Props> = ({ editMode, commands, setCommands }) => {
  function onChangePosition(idx: number, toUp?: boolean) {
    if ((idx === 0 && toUp) || (idx === commands.length - 1 && !toUp)) {
      return
    }
    const idxToChange = toUp ? idx - 1 : idx + 1
    const newCommands = [...commands]
    newCommands[idxToChange] = commands[idx]
    newCommands[idx] = commands[idxToChange]
    setCommands(newCommands)
  }

  function onDelete(idxToDelete: number) {
    setCommands(commands.filter((command, idx) => idx !== idxToDelete))
  }

  function onAddCommand() {
    setCommands([
      ...commands,
      {
        id: uuidv4(),
        command: '',
        description: '',
        autoFocus: true,
      },
    ])
  }

  function onCommandChange(idx, newCommand) {
    const newCommandsCopy = [...commands]
    newCommandsCopy[idx] = newCommand
    setCommands(newCommandsCopy)
  }

  return (
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
      {editMode && <AddCommandBtn onClick={onAddCommand} />}
    </CommandList>
  )
}

export default Commands
