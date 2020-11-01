import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import loggerMiddleware from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import commands from './commands/reducer'
// import rootSaga from './rootSaga'

import { CommandsState } from './commands/types'

const rootReducer = combineReducers({ commands })

const sagaMiddleware = createSagaMiddleware()

const dev = process.env.NODE_ENV === 'development'

export interface ApplicationState {
  commands: CommandsState
}

// eslint-disable-next-line import/no-mutable-exports
let store: Store<ApplicationState>
if (dev) {
  // eslint-disable-next-line no-console
  console.log('Running into dev mode...')
  store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, loggerMiddleware),
  )
} else {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
}

// sagaMiddleware.run(rootSaga)

export default store
