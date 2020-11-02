import React from 'react'
import { withTheme, DefaultTheme } from 'styled-components'

import { TaskToSelect } from '../../data/dataTypes'

import { StyledTaskList, TaskListItem, TaskListLink } from './style'
import { IconBtn, SquaredBtn } from '../buttons'
import Icon from '../icon'
import { LinkButton } from '../links'
import Label from '../inputs/label'

interface Props {
  tasks: TaskToSelect[]
  onDelete: (idx: number) => void
  theme: DefaultTheme
}

const TaskList: React.FC<Props> = ({ tasks, onDelete, theme }) => {
  function renderList() {
    if (!tasks) {
      return null
    }
    if (tasks.length === 0) {
      return <p>Empty</p>
    }
    return (
      <StyledTaskList>
        {tasks.map(({ id, name }, idx) => (
          <TaskListItem key={id}>
            <TaskListLink to={`/task/${id}`}>
              {name}
              <IconBtn
                onClick={(e) => {
                  e.preventDefault()
                  onDelete(idx)
                }}
                iconName="close"
              />
            </TaskListLink>
          </TaskListItem>
        ))}
      </StyledTaskList>
    )
  }

  return (
    <>
      <Label>Tasks</Label>
      <SquaredBtn
        style={{
          backgroundColor: theme.secondaryButtonBtn,
          marginLeft: '10px',
        }}
      >
        <LinkButton to="/task">
          <Icon name="plus" />
        </LinkButton>
      </SquaredBtn>
      {renderList()}
    </>
  )
}

export default withTheme(TaskList)
