import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useTopic } from 'hooks/useTopicState';
import Topic from './components';
import {default as jsonTopics} from 'data/topics.json';

import './Topics.scss'
const axios = require('axios');


function Topics() {
  const [topics, setTopics] = useState([])
  const [state, dispatch] = useTopic()
  useEffect(fetchTopics, [])

  function fetchTopics() {
    axios.get('http://localhost:8888/v1/topics')
      .then(res => setTopics(res.data.data))
      .catch(_ => {
        setTopics(
          Object.entries(jsonTopics)
            .map(
              ([topic, id]) => ({name: topic, id})
            )
      )})
  }

  function handleSelect(selected) {
    const { id, name } = selected
    const payload = { topic: { id, name} }
    dispatch({type: 'UPDATE_TOPIC', payload})
  }

  return (
    <div className="topics--container">
      <ol className='topic-boxes-container'>
        {topics.map((topic) => (
          <Topic
            id={topic.id}
            key={topic.id}
            name={topic.name}
            handleSelect={handleSelect}
          />
        ))}
      </ol>
      {state.topic.id && <Redirect
        to={{
          pathname: "/subtopics",
          search: `?topic=${state.topic.id}`,
        }}
      />}
    </div>
  )
}

export default withRouter(Topics);