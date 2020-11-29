import React, { useContext } from 'react'
import { withTheme, DefaultTheme } from 'styled-components'

import { LangContext } from '../../../lang/langConfig'

import {
  StyledList,
  ListItem,
  ListLink,
  RemoveAction,
  ListHeader,
} from '../style'
import { IconBtn } from '../../buttons'
import Icon from '../../icon'
import { LinkButton } from '../../links'
import Label from '../../inputs/label'

interface ListItemType {
  name: string
  id: string
}

interface Props {
  tasks: ListItemType[]
  topicId: string
  onDelete?: (idx: number) => void
  onEdit?: (idx: number) => void
  theme: DefaultTheme
}

const TaskList: React.FC<Props> = ({ tasks, topicId, onDelete, theme }) => {
  const messages = useContext(LangContext)

  function renderList() {
    if (!tasks) {
      return null
    }
    if (tasks.length === 0) {
      return (
        <p
          style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'center' }}
        >
          {messages['label.emptyList']}
        </p>
      )
    }
    return (
      <StyledList>
        {tasks.map(({ id, name }, idx) => (
          <ListItem key={id}>
            <ListLink to={`/tasks/${id}`}>
              <span>{name}</span>
              <RemoveAction>
                <IconBtn
                  onClick={(e) => {
                    e.preventDefault()
                    onDelete(idx)
                  }}
                  iconName="close"
                />
              </RemoveAction>
            </ListLink>
          </ListItem>
        ))}
      </StyledList>
    )
  }

  return (
    <>
      <ListHeader>
        <Label>{messages['label.tasks']}</Label>
        <LinkButton
          backgroundColor={theme.secondaryButtonBg}
          style={{
            borderRadius: '3px',
            marginLeft: '10px',
            width: '3rem',
          }}
          to={`/new-task?topicId=${topicId}`}
        >
          <Icon name="plus" />
        </LinkButton>
      </ListHeader>
      {renderList()}
    </>
  )
}

export default withTheme(TaskList)
