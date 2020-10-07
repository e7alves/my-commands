import '@/src/styles/style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from '@/src/views/Home'

if (process.env.NODE_ENV === 'development') {
  require('@/src/devConfig')
}

ReactDOM.render(
  <BrowserRouter>
    <Route component={Home} />
  </BrowserRouter>,
  document.getElementById('app'),
)
