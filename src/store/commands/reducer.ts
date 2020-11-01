import { CommandsState, CommandsTypes } from './types'

const stateDefault: CommandsState = {
  topics: null,
}

const reducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CommandsTypes.LIST_TOPICS_SUCCESS: {
      const { topics } = action.payload
      return {
        ...state,
        topics,
      }
    }
    default:
      return state
  }
}

export default reducer
