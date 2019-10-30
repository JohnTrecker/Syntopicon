import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

function Topics() {
  const [topics, setTopics] = useState([])
  const [selected, setTopic] = useState('')

  useEffect(fetchTopics, [])

  function fetchTopics() {
    axios.get('http://localhost:8888/v1/topics')
      .then(res => setTopics(res.data.data))
      .catch(err => console.log(err))
  }

  function handleSelect(topic) {
    setTopic(topic)
  }

  return (
    <div>
      <ol>
        {topics.map(topic =>
          <li key={topic.id} onClick={() => handleSelect(topic)}>
            {topic.name}
          </li>
        )}
      </ol>
      {selected && <Redirect
        to={{
          pathname: "/subtopics",
          search: `?topic=${selected.id}`,
          state: { id: selected.id }
        }}
      />}
    </div>
  )
}

export default Topics;