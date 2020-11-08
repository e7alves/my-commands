import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { Topic } from '../../data/dataTypes'
import { listTopics, createTopic } from '../../data/storageActions'

import Navbar from '../../components/navbar/index'
import Task from '../../views/task/index'
import Tasks from '../../views/tasks'
import Topics from '../../views/topics'
import AddAndEditTopicModal from '../../components/modal/addAndEditTopicModal'

import GlobalStyle from '../../styles/GlobalStyle'
import AppContainer from './style'

const Application: React.FC<null> = () => {
  const [topics, setTopics] = useState<Topic[]>(null)
  const [addTopicModalIsOpen, setAddTopicModalIsOpen] = useState<boolean>(false)

  function refreshTopics() {
    listTopics((newTopics) => setTopics([...newTopics]))
  }

  useEffect(refreshTopics, [])

  function onAddTopic(topicName: string) {
    createTopic(
      {
        id: uuidv4(),
        name: topicName,
        tasks: [],
      },
      refreshTopics,
    )
    setAddTopicModalIsOpen(false)
  }

  if (!topics) {
    return null
  }

  return (
    <AppContainer>
      <GlobalStyle />
      <Navbar openAddTopicModal={() => setAddTopicModalIsOpen(true)} />
      <Switch>
        <Route
          path="/topics"
          exact
          component={(props) => (
            <Topics
              {...props}
              topics={topics}
              refreshTopics={refreshTopics}
              openAddTopicModal={() => setAddTopicModalIsOpen(true)}
            />
          )}
        />
        <Route
          path="/tasks/:topicId?"
          exact
          component={(props) => (
            <Tasks {...props} topics={topics} refreshTopics={refreshTopics} />
          )}
        />
        <Route
          path="/task/:taskId?"
          exact
          component={(props) => (
            <Task {...props} topics={topics} refreshTopics={refreshTopics} />
          )}
        />
      </Switch>
      <AddAndEditTopicModal
        isOpen={addTopicModalIsOpen}
        close={() => setAddTopicModalIsOpen(false)}
        content=""
        title="New topic"
        onConfirm={onAddTopic}
      />
    </AppContainer>
  )
}

export default Application
