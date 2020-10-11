import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import themeLoader from '@/src/theme/themeLoader'
import Application from '@/src/containers/Application'

if (process.env.NODE_ENV === 'development') {
  require('@/src/devConfig')
}

themeLoader().then(theme => {
  ReactDOM.render(
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Route component={Application} />
      </ThemeProvider>
    </HashRouter>,
    document.getElementById('app'),
  )
})
