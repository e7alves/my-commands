import './scss/mdi/materialdesignicons.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import Application from './containers/application'

if (process.env.NODE_ENV === 'development') {
  require('./devConfig/devConfig')
}

ReactDOM.render(
  <HashRouter>
    <Route component={Application} />
  </HashRouter>,
  document.getElementById('app'),
)
