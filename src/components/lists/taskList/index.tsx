import React from 'react'
import { withTheme, DefaultTheme } from 'styled-components'

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
  title: string
  topicId: string
  onDelete?: (idx: number) => void
  onEdit?: (idx: number) => void
  theme: DefaultTheme
}

const TaskList: React.FC<Props> = ({
  tasks,
  title,
  topicId,
  onDelete,
  theme,
}) => {
  function renderList() {
    if (!tasks) {
      return null
    }
    if (tasks.length === 0) {
      return (
        <p
          style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'center' }}
        >
          Empty
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
        <Label>{title}</Label>
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
