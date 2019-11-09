import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import './Topics.scss'

const axios = require('axios');


function Topics() {
  const [topics, setTopics] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(fetchTopics, [])

  function fetchTopics() {
    axios.get('http://localhost:8888/v1/topics')
      .then(res => setTopics(res.data.data))
      .catch(err => console.log(err))
  }

  function handleSelect(selected) {
    const { id: topic_id, name: topic } = selected
    setSelected({ topic_id, topic })
  }

  console.log(selected)
  return (
    <div>
      <ol className='boxes-container'>
        {topics.map(topic =>
          <li
            key={topic.id}
            onClick={() => handleSelect(topic)}
            className="topic-box clickable"
          >
            <p>{topic.name}</p>
          </li>
        )}
      </ol>
      {selected && <Redirect
        to={{
          pathname: "/subtopics",
          search: `?topic=${selected.topic_id}`,
          state: { ...selected }
        }}
      />}
    </div>
  )
}

export default Topics;