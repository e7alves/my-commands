import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import {
  Command,
  TaskInfo,
  Task as TaskType,
  Topic,
} from '../../data/dataTypes'
import { getTask } from '../../data/storage'

import { Container, Section } from './style'
import TaskHeader from '../../components/taskHeader'
import Commands from '../../components/commands'
import { PrimaryBtn, CancelBtn, SecondaryBtn } from '../../components/buttons'
import { AlignedContainer } from '../../styles/layout'

interface TaskParam {
  taskId: string
}

const taskDefault = {
  id: '',
  name: '',
  link: '',
  topicId: '1',
  commands: [],
}

const getTaskInfo = (task) => {
  const { topicId, name, link } = task
  return { topicId, name, link }
}

const Task: React.FC = () => {
  const { taskId } = useParams<TaskParam>()

  const [editMode, setEditMode] = useState(!taskId)
  const [topics, setTopics] = useState<Topic[]>(null)
  const [task, setTask] = useState<TaskType>(taskDefault)
  const [commandsCopy, setCommandsCopy] = useState<Command[]>([])
  const [taskInfoCopy, setTaskInfoCopy] = useState<TaskInfo>()

  useEffect(() => {
    chrome.storage.local.get(['topics'], (result) => {
      setTopics(result.topics || [])
    })
  }, [])

  useEffect(() => {
    if (taskId) {
      const key = `t${taskId}`
      getTask(key, (task) => {
        setTask(task)
        setTaskInfoCopy(getTaskInfo(task))
        setCommandsCopy(task.commands)
      })
    }
  }, [])

  if (!topics) {
    return null
  }

  function toggleEditMode() {
    setEditMode(!editMode)
  }

  function onCancelEdition() {
    const { commands } = task
    setCommandsCopy(commands)
    setTaskInfoCopy(getTaskInfo(task))
    toggleEditMode()
  }

  function onSaveEdition() {
    setTask({
      ...task,
      ...taskInfoCopy,
      commands: commandsCopy,
    })
    toggleEditMode()
  }

  return (
    <>
      <TaskHeader
        editMode={editMode}
        topics={topics}
        taskInfo={taskInfoCopy}
        setTaskInfo={(newTaskInfo) => setTaskInfoCopy(newTaskInfo)}
      />
      <Container>
        {!editMode && (
          <Section>
            <AlignedContainer position="right">
              <SecondaryBtn onClick={toggleEditMode} iconName="pencil">
                Edit
              </SecondaryBtn>
            </AlignedContainer>
          </Section>
        )}
        <Commands
          editMode={editMode}
          commands={commandsCopy}
          setCommands={(newCommands) => setCommandsCopy(newCommands)}
          onCancelEdition={onCancelEdition}
          onSaveEdition={onSaveEdition}
        />
        {editMode && (
          <AlignedContainer position="center" style={{ marginTop: '1rem' }}>
            <CancelBtn
              style={{ flex: 1, marginRight: '5px' }}
              onClick={onCancelEdition}
            >
              cancel
            </CancelBtn>
            <PrimaryBtn
              style={{ flex: 1, marginLeft: '5px' }}
              onClick={onSaveEdition}
            >
              save
            </PrimaryBtn>
          </AlignedContainer>
        )}
      </Container>
    </>
  )
}

export default Task
