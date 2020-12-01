import React, { useRef } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Command } from '../../../data/dataTypes'

import {
  Wrapper,
  EditableCommand,
  StaticCommandWrapper,
  StaticCommandField,
  StaticCommandIcon,
  Actions,
} from './style'
import Icon from '../../icon/index'
import { SquaredBtn } from '../../buttons/index'

interface Props {
  id: string
  editMode: boolean
  command: Command
  index: number
  onChangePosition: (idx: number, toUp?: boolean) => void
  onDelete: (idx: number) => void
  onCommandChange: (idx: number, newCommand: Command) => void
}

const CommandField: React.FC<Props> = ({
  id,
  editMode,
  command,
  index,
  onChangePosition,
  onDelete,
  onCommandChange,
}) => {
  const staticCommandFieldRef = useRef(null)

  function onChangeHandler(e: React.FormEvent<HTMLTextAreaElement>) {
    onCommandChange(index, {
      ...command,
      command: e.currentTarget.value,
    })
  }

  const style: React.CSSProperties = {
    height: `${command.command.split('\n').length * 19 + 35}px`,
    overflowY: 'hidden',
  }

  return (
    <Wrapper>
      {editMode ? (
        <>
          <EditableCommand
            autoFocus={command.autoFocus}
            value={command.command}
            onChange={onChangeHandler}
            style={style}
            spellCheck="false"
          />
          <Actions>
            <SquaredBtn
              style={{ marginBottom: '10px' }}
              onClick={() => onDelete(index)}
            >
              <Icon name="close" />
            </SquaredBtn>
            <SquaredBtn
              style={{ marginBottom: '10px' }}
              onClick={() => onChangePosition(index, true)}
            >
              <Icon name="chevron-up" />
            </SquaredBtn>
            <SquaredBtn
              style={{ marginBottom: '10px' }}
              onClick={() => onChangePosition(index, false)}
            >
              <Icon name="chevron-down" />
            </SquaredBtn>
          </Actions>
        </>
      ) : (
        <CopyToClipboard text={command.command}>
          <StaticCommandWrapper style={style}>
            <StaticCommandField
              id={id}
              ref={staticCommandFieldRef}
              onDrop={(e) => e.preventDefault()}
            >
              {command.command.split('\n').map((str) => (
                <div>{str}</div>
              ))}
            </StaticCommandField>
            <StaticCommandIcon>
              <Icon name="content-copy" />
            </StaticCommandIcon>
          </StaticCommandWrapper>
        </CopyToClipboard>
      )}
    </Wrapper>
  )
}

export default CommandField
