import React, { useState, useEffect, useContext } from 'react'
import { useParams, RouteComponentProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import htmlToFormattedText from 'html-to-formatted-text'

import { LangContext } from '../../lang/langConfig'

import { Command, TaskInfo, Task as TaskType } from '../../data/dataTypes'
import {
  getTask,
  saveTask,
  updateTopics,
  getCommandsFromContextSelection,
  updateCommandsContextSelection,
  clearCommandsContextSelection,
} from '../../data/storageActions'
import sortByName from '../../data/sortByName'

import { TOPIC_DEFAULT_ID } from '../../consts'

import { Container, Section } from './style'
import TaskHeader from '../../components/taskHeader'
import Commands from '../../components/commands'
import { PrimaryBtn, CancelBtn, SecondaryBtn } from '../../components/buttons'
import { AlignedContainer } from '../../styles/layout'

import { TopicsContext, TopicsContextType } from '../../topicsContext'

import useQuery from '../../useQuery'

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

const Task: React.FC<RouteComponentProps> = ({ history, location }) => {
  const messages = useContext(LangContext)

  const { taskId } = useParams<TaskParam>()
  const addingNewTask = !taskId

  const defaultTopicId = useQuery().get('topicId')
  if (defaultTopicId) {
    taskInfoDefault.topicId = defaultTopicId
  }

  const { topics, refreshTopics } = useContext<TopicsContextType>(TopicsContext)

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
          history.push('/new-task')
        }
      })
    }
  }, [])

  function setCommandsFromContextSelection() {
    getCommandsFromContextSelection((commands: any) => {
      if (commands) {
        setCommandsCopy(
          commands.map((command: string | Command) =>
            typeof command === 'string'
              ? {
                  id: uuidv4(),
                  description: '',
                  command: htmlToFormattedText(command),
                }
              : command,
          ),
        )
      }
    })
  }

  function getCommandsByContextSelection(request) {
    if (request.eventName === 'copy-by-context-menu') {
      if (window.location.href.match(/editMode=true|new-task/)) {
        setCommandsFromContextSelection()
      } else {
        history.push('/new-task')
      }
    }
  }

  useEffect(() => {
    if (addingNewTask) {
      setCommandsFromContextSelection()
    }
    chrome.runtime.onMessage.addListener(getCommandsByContextSelection)
    return () => {
      chrome.runtime.onMessage.removeListener(getCommandsByContextSelection)
      if (!window.location.href.match(/new-task/)) {
        clearCommandsContextSelection()
      }
    }
  }, [])

  function toggleEditMode() {
    if (editMode) {
      clearCommandsContextSelection(() => setEditMode(!editMode))
      history.replace(`${location.pathname}?editMode=false`)
    } else {
      updateCommandsContextSelection(commandsCopy, () => setEditMode(!editMode))
      history.replace(`${location.pathname}?editMode=true`)
    }
  }

  function onCommandsChange(newCommands: Command[]) {
    setCommandsCopy(newCommands)
    getCommandsFromContextSelection(() => {
      updateCommandsContextSelection(newCommands)
    })
  }

  function onCancelEdition() {
    if (addingNewTask) {
      history.push('/tasks')
    } else {
      const { commands } = task
      setCommandsCopy(commands)
      setTaskInfoCopy(getTaskInfo(task))
      toggleEditMode()
    }
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
            sortByName(topic.tasks)
            topicsToUpdate.push(topic)
          }
          if (topic.id === task.topicId) {
            topicsToUpdate.push({
              ...topic,
              tasks: topic.tasks.filter((tk) => tk.id !== task.id),
            })
          }
        })
      } else if (taskToSave.name !== task.name) {
        topics.forEach((topic) => {
          if (topic.id === task.topicId) {
            const newTasks = topic.tasks.map((tk) =>
              tk.id !== task.id ? tk : { ...tk, name: taskToSave.name },
            )
            sortByName(newTasks)
            topicsToUpdate.push({
              ...topic,
              tasks: newTasks,
            })
          }
        })
      }
      updateTopics(topicsToUpdate, () => {
        refreshTopics()
        if (addingNewTask) {
          history.push(`/tasks/${taskToSave.id}`)
        } else {
          toggleEditMode()
        }
      })
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
                {messages['label.edit']}
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
              {messages['label.cancel']}
            </CancelBtn>
            <PrimaryBtn
              style={{ flex: 1, marginLeft: '5px' }}
              onClick={onSaveEdition}
            >
              {messages['label.save']}
            </PrimaryBtn>
          </AlignedContainer>
        )}
      </Container>
    </>
  )
}

export default Task
