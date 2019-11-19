import { useContext } from 'react';
import { TopicStateContext, TopicDispatchContext } from 'context/topic'


function useTopicState() {
  const context = useContext(TopicStateContext)
  if (context === undefined) {
    throw new Error('useTopicState must be used within a TopicProvider')
  }
  return context
}

function useTopicDispatch() {
  const context = useContext(TopicDispatchContext)
  if (context === undefined) {
    throw new Error('useTopicDispatch must be used within a TopicProvider')
  }
  return context
}

function useTopic(Component) {
  return [useTopicState(), useTopicDispatch()]
}

export {
  useTopic,
  useTopicState,
  useTopicDispatch
}
