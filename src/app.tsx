import './scss/mdi/materialdesignicons.scss'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import store from './store/index'
import themeLoader from './theme/themeLoader'
import Application from './containers/Application'

if (process.env.NODE_ENV === 'development') {
  require('./devConfig/devConfig')
}

themeLoader().then((theme) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Route component={Application} />
        </ThemeProvider>
      </Provider>
    </HashRouter>,
    document.getElementById('app'),
  )
})
