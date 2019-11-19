import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useTopic } from 'hooks/useTopicState';

import './Topics.scss'
import variables from 'styles/variables/_images.scss'
const axios = require('axios');


function Topics() {
  const [topics, setTopics] = useState([])
  const [state, dispatch] = useTopic()
  useEffect(fetchTopics, [])

  function fetchTopics() {
    axios.get('http://localhost:8888/v1/topics')
      .then(res => setTopics(res.data.data))
      .catch(err => console.log(err))
  }

  function handleSelect(selected) {
    const { id, name } = selected
    const payload = { topic: { id, name} }
    dispatch({type: 'UPDATE_TOPIC', payload})
  }

  function setImage({name}){
    const imageUrl = variables[name.toLowerCase().replace(/\s/g, '-')]
    if (imageUrl) console.log(imageUrl)
    return imageUrl
      ? { 'backgroundImage': `url(${imageUrl})` }
      : {}
  }

  return (
    <div className="topics--container">
      <ol className='topic-boxes-container'>
        {topics.map(topic => (
          <li
            key={topic.id}
            onClick={() => handleSelect(topic)}
            className="topic-box clickable"
            style={setImage(topic)}
          >
            <p className="topic-label">{topic.name}</p>
          </li>
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