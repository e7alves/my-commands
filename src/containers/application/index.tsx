import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ThemeProvider } from 'styled-components'

import { Topic } from '../../data/dataTypes'
import {
  listTopics,
  createTopic,
  getTheme,
  updateTheme,
  getLang,
  updateLang,
} from '../../data/storageActions'
import themes, { themeDefault } from '../../theme/themes'

import Navbar from '../../components/navbar/index'
import Task from '../../views/task/index'
import Tasks from '../../views/tasks'
import Topics from '../../views/topics'
import Settings from '../../views/settings'
import AddAndEditTopicModal from '../../components/modal/addAndEditTopicModal'

import GlobalStyle from '../../styles/GlobalStyle'
import AppContainer from './style'
import { defaultLang, LangContext, messageBundle } from '../../lang/langConfig'

const Application: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>(null)
  const [addTopicModalIsOpen, setAddTopicModalIsOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>(themeDefault)
  const [lang, setLang] = useState<string>(defaultLang)

  function refreshTopics() {
    listTopics((newTopics) => setTopics([...newTopics]))
  }

  useEffect(refreshTopics, [])

  useEffect(() => getTheme(({ theme }) => setTheme(theme || themeDefault)), [])

  useEffect(() => getLang(({ lang }) => setLang(lang || defaultLang)), [])

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

  function onUpdateTheme(theme: string) {
    updateTheme(theme, () => setTheme(theme))
  }

  function onUpdateLang(lang: string) {
    updateLang(lang, () => setLang(lang))
  }

  if (!topics || !theme || !lang) {
    return null
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <LangContext.Provider value={messageBundle[lang]}>
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
                <Tasks
                  {...props}
                  topics={topics}
                  refreshTopics={refreshTopics}
                />
              )}
            />
            <Route
              path="/task/:taskId?"
              exact
              component={(props) => (
                <Task
                  {...props}
                  topics={topics}
                  refreshTopics={refreshTopics}
                />
              )}
            />
            <Route
              path="/settings"
              exact
              component={(props) => (
                <Settings
                  {...props}
                  currentTheme={theme}
                  updateTheme={onUpdateTheme}
                  currentLang={lang}
                  updateLang={onUpdateLang}
                />
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
      </LangContext.Provider>
    </ThemeProvider>
  )
}

export default Application
