import '@/src/styles/style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import themeLoader from '@/src/theme/themeLoader'
import ThemeContext from '@/src/theme/ThemeContext'
import Application from '@/src/containers/Application'

if (process.env.NODE_ENV === 'development') {
  require('@/src/devConfig')
}

themeLoader().then(theme => {
  ReactDOM.render(
    <HashRouter>
      <ThemeContext.Provider value={theme}>
        <Route component={Application} />
      </ThemeContext.Provider>
    </HashRouter>,
    document.getElementById('app'),
  )
})
