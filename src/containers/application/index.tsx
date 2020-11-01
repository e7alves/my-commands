import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Topic } from '../../data/dataTypes'
import { listTopics } from '../../data/storage'

import Navbar from '../../components/navbar/index'
import Task from '../../views/task/index'
import Tasks from '../../views/tasks'

import GlobalStyle from '../../styles/GlobalStyle'
import AppContainer from './style'

const Application: React.FC<null> = () => {
  const [topics, setTopics] = useState<Topic[]>([])
  useEffect(() => listTopics(setTopics), [])

  return (
    <AppContainer>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route
          path="/"
          exact
          component={(props) => <Tasks {...props} topics={topics} />}
        />
        <Route path="/task/:taskId" exact component={Task} />
      </Switch>
    </AppContainer>
  )
}

export default Application
