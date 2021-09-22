import React, { createContext, useReducer } from 'react';

const TopicStateContext = createContext()
const TopicDispatchContext = createContext()

function topicReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TOPIC':
    case 'UPDATE_SUBTOPIC':
    case 'UPDATE_REFERENCE': {
      return { ...state, ...action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function TopicProvider({ children }) {
  const initialState = { topic: {}, subtopic: {}, reference: {} };
  const [state, dispatch] = useReducer(topicReducer, initialState)
  return (
    <TopicStateContext.Provider value={state}>
      <TopicDispatchContext.Provider value={dispatch}>
        {children}
      </TopicDispatchContext.Provider>
    </TopicStateContext.Provider>
  )
}

export {
  TopicProvider,
  TopicStateContext,
  TopicDispatchContext
}
