import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import themeLoader from './theme/themeLoader'
import Application from './containers/Application'

if (process.env.NODE_ENV === 'development') {
  require('./devConfig')
}

themeLoader().then((theme) => {
  ReactDOM.render(
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Route component={Application} />
      </ThemeProvider>
    </HashRouter>,
    document.getElementById('app'),
  )
})
