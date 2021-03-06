import React from 'react'
import { withTheme, DefaultTheme } from 'styled-components'

import { TOPIC_DEFAULT_ID } from '../../../consts'

import { TaskToSelect } from '../../../data/dataTypes'

import {
  StyledList,
  ListItem,
  ListLink,
  RemoveAction,
  EditAction,
  ListHeader,
} from '../style'
import { IconBtn, SquaredBtn } from '../../buttons'
import Icon from '../../icon'
import Label from '../../inputs/label'

interface Props {
  topics: TaskToSelect[]
  title: string
  onDelete: (idx: number) => void
  onEdit: (idx: number) => void
  onAdd: () => void
  theme: DefaultTheme
  displayEditAction?: boolean
  displayRemoveAction?: boolean
}

const TopicList: React.FC<Props> = ({
  topics,
  title,
  onDelete,
  onEdit,
  onAdd,
  theme,
}) => {
  function renderList() {
    if (!topics) {
      return null
    }
    if (topics.length === 0) {
      return <p>Empty</p>
    }
    return (
      <StyledList>
        {topics.map(({ id, name }, idx) => (
          <ListItem key={id}>
            <ListLink to={`/tasks?topicId=${id}`}>
              <span>{name}</span>
              {TOPIC_DEFAULT_ID !== id && (
                <span>
                  <EditAction>
                    <IconBtn
                      onClick={(e) => {
                        e.preventDefault()
                        onEdit(idx)
                      }}
                      iconName="pencil"
                      style={{ marginRight: '7px' }}
                    />
                  </EditAction>
                  <RemoveAction>
                    <IconBtn
                      onClick={(e) => {
                        e.preventDefault()
                        onDelete(idx)
                      }}
                      iconName="close"
                    />
                  </RemoveAction>
                </span>
              )}
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
        <SquaredBtn
          backgroundColor={theme.secondaryButtonBg}
          style={{
            borderRadius: '3px',
            color: theme.secondaryButtonTextColor,
            height: 'inherit',
            marginLeft: '10px',
            width: '3rem',
          }}
          onClick={onAdd}
        >
          <Icon name="plus" />
        </SquaredBtn>
      </ListHeader>
      {renderList()}
    </>
  )
}

export default withTheme(TopicList)
