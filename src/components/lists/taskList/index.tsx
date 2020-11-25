import React from 'react'
import { withTheme, DefaultTheme } from 'styled-components'

import { StyledList, ListItem, ListLink, RemoveAction } from '../style'
import { IconBtn, SquaredBtn } from '../../buttons'
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
      return <p>Empty</p>
    }
    return (
      <StyledList>
        {tasks.map(({ id, name }, idx) => (
          <ListItem key={id}>
            <ListLink to={`/tasks/${id}`}>
              {name}
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
      <Label>{title}</Label>
      <SquaredBtn
        style={{
          backgroundColor: theme.secondaryButtonBtn,
          marginLeft: '10px',
        }}
      >
        <LinkButton to={`/new-task?topicId=${topicId}`}>
          <Icon name="plus" />
        </LinkButton>
      </SquaredBtn>
      {renderList()}
    </>
  )
}

export default withTheme(TaskList)
