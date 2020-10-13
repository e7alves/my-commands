import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Tasks from '../views/Tasks'
import Topics from '../views/Topics'

import GlobalStyle from '../styles/GlobalStyle'
import { MainContainer } from '../styles/layout'

const Application: React.FC<null> = () => (
  <MainContainer>
    <GlobalStyle />
    <Navbar />
    <Switch>
      <Route path="/" exact component={Tasks} />
      <Route path="/topics" exact component={Topics} />
    </Switch>
  </MainContainer>
)

export default Application
