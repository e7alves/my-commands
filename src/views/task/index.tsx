import React, { useState, useEffect } from 'react'
import { useParams, RouteComponentProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import htmlToFormattedText from 'html-to-formatted-text'

import {
  Command,
  TaskInfo,
  Task as TaskType,
  Topic,
} from '../../data/dataTypes'
import {
  getTask,
  saveTask,
  updateTopics,
  getCommandsFromContextSelection,
  updateCommandsContextSelection,
  clearCommandsContextSelection,
} from '../../data/storageActions'
import { TOPIC_DEFAULT_ID } from '../../consts'

import { Container, Section } from './style'
import TaskHeader from '../../components/taskHeader'
import Commands from '../../components/commands'
import { PrimaryBtn, CancelBtn, SecondaryBtn } from '../../components/buttons'
import { AlignedContainer } from '../../styles/layout'

interface TaskParam {
  taskId: string
}

const taskDefault = {
  id: undefined,
  name: '',
  link: '',
  topicId: TOPIC_DEFAULT_ID,
  commands: [],
}

const taskInfoDefault = {
  name: '',
  link: '',
  topicId: TOPIC_DEFAULT_ID,
}

const getTaskInfo = (task: TaskType) => {
  const { topicId, name, link } = task
  return { topicId, name, link }
}

interface Props extends RouteComponentProps {
  topics: Topic[]
  refreshTopics: () => void
}

const Task: React.FC<Props> = ({ history, topics, refreshTopics }) => {
  const { taskId } = useParams<TaskParam>()
  const addingNewTask = !taskId

  const [editMode, setEditMode] = useState(addingNewTask)
  const [task, setTask] = useState<TaskType>(taskDefault)
  const [commandsCopy, setCommandsCopy] = useState<Command[]>([
    {
      id: uuidv4(),
      command: '',
      description: '',
    },
  ])
  const [taskInfoCopy, setTaskInfoCopy] = useState<TaskInfo>(taskInfoDefault)

  useEffect(() => {
    if (!addingNewTask) {
      getTask(taskId, (task) => {
        if (task) {
          setTask(task)
          setTaskInfoCopy(getTaskInfo(task))
          setCommandsCopy(task.commands)
        } else {
          history.push('/task')
        }
      })
    }
  }, [])

  function setCommandFromContextSelection() {
    getCommandsFromContextSelection((commands: any) => {
      if (commands) {
        setCommandsCopy(
          commands.map((command) =>
            typeof command === 'string'
              ? {
                  id: uuidv4(),
                  description: '',
                  command: htmlToFormattedText(command),
                }
              : command,
          ),
        )
        setEditMode(true)
      }
    })
  }

  useEffect(() => {
    setCommandFromContextSelection()
    chrome.runtime.onMessage.addListener((request) => {
      if (request.eventName === 'copy-by-context-menu') {
        setCommandFromContextSelection()
      }
    })
  }, [])

  function toggleEditMode() {
    setEditMode(!editMode)
  }

  function onCommandsChange(newCommands: Command[]) {
    setCommandsCopy(newCommands)
    getCommandsFromContextSelection(() => {
      updateCommandsContextSelection(newCommands)
    })
  }

  function onCancelEdition() {
    clearCommandsContextSelection(() => {
      if (addingNewTask) {
        history.push('/tasks')
      } else {
        const { commands } = task
        setCommandsCopy(commands)
        setTaskInfoCopy(getTaskInfo(task))
        toggleEditMode()
      }
    })
  }

  function onSaveEdition() {
    const taskToSave = {
      ...task,
      ...taskInfoCopy,
      commands: commandsCopy,
      id: task.id || uuidv4(),
    }
    saveTask(taskToSave, () => {
      const topicsToUpdate = []
      if (taskToSave.topicId !== task.topicId || addingNewTask) {
        topics.forEach((topic) => {
          if (topic.id === taskToSave.topicId) {
            topic.tasks.push({
              id: taskToSave.id,
              name: taskToSave.name,
            })
            topicsToUpdate.push(topic)
          }
          if (topic.id === task.topicId) {
            topicsToUpdate.push({
              ...topic,
              tasks: topic.tasks.filter((tk) => tk.id !== task.id),
            })
          }
        })
      }
      updateTopics(topicsToUpdate, () => {
        refreshTopics()
        history.push(`/task/${taskToSave.id}`)
      })
      clearCommandsContextSelection()
    })
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
          onCommandsChange={onCommandsChange}
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
