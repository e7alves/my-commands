import React, { useState, useEffect } from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
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
import AddAndEditTopicModal from '../../components/modals/addAndEditTopicModal'

import GlobalStyle from '../../styles/globalStyle'
import { AppContainer, AppWrapper } from './style'
import { defaultLang, LangContext } from '../../lang/langConfig'
import messageBundle from '../../lang/messageBundle'

import { TopicsContext } from '../../topicsContext'

const Application: React.FC<RouteComponentProps> = ({ history }) => {
  const [topics, setTopics] = useState<Topic[]>(null)
  const [addTopicModalIsOpen, setAddTopicModalIsOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>(themeDefault)
  const [lang, setLang] = useState<string>(defaultLang)

  const messages = messageBundle[lang]

  function refreshTopics() {
    listTopics((newTopics) => setTopics([...newTopics]))
  }

  useEffect(refreshTopics, [])

  useEffect(() => getTheme(({ theme }) => setTheme(theme || themeDefault)), [])

  useEffect(() => getLang(({ lang }) => setLang(lang || defaultLang)), [])

  function redirectToNewTask(request) {
    if (request.eventName === 'copy-by-context-menu') {
      if (
        !window.location.href.match(/new-task/) &&
        !window.location.href.match(/tasks\/.+/)
      ) {
        history.push('/new-task')
      }
    }
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(redirectToNewTask)
    return () => chrome.runtime.onMessage.removeListener(redirectToNewTask)
  }, [])

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
      <LangContext.Provider value={messages}>
        <TopicsContext.Provider
          value={{
            topics,
            refreshTopics,
            switchAddTopicModal: setAddTopicModalIsOpen,
          }}
        >
          <AppContainer>
            <AppWrapper>
              <GlobalStyle />
              <Navbar
                openAddTopicModal={() => setAddTopicModalIsOpen(true)}
                history={history}
              />
              <Switch>
                <Route path="/topics" exact component={Topics} />
                <Route path="/tasks" exact component={Tasks} />
                <Route
                  key="task-view"
                  path="/tasks/:taskId?"
                  exact
                  component={Task}
                />
                <Route key="new-task" path="/new-task" exact component={Task} />
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
                title={messages['label.newTopic']}
                onConfirm={onAddTopic}
              />
            </AppWrapper>
          </AppContainer>
        </TopicsContext.Provider>
      </LangContext.Provider>
    </ThemeProvider>
  )
}

export default Application
