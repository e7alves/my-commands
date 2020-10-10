import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '@/src/components/Navbar'
import Tasks from '@/src/views/Tasks'
import Topics from '@/src/views/Topics'

const Application = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Tasks} />
      <Route path="/topics" exact component={Topics} />
    </Switch>
  </>
)

export default Application
