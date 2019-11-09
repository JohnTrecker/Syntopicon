import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

function Subtopics(props) {
  const [subtopics, setSubtopics] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(fetchSubtopics, [])

  function fetchSubtopics() {
    const { topic_id: id } = props.location.state;
    axios.get(`http://localhost:8888/v1/topics/${id}`)
      .then(res => setSubtopics(res.data.data.subtopics))
      .catch(err => console.log(err))
  }

  function handleSelect(selected) {
    const { id: subtopic_id, subtopic } = selected
    setSelected({subtopic_id, subtopic})
  }

  function generateTaxonomy(subtopics) {
    return subtopics.map(subtopic => (
      <ol>
        <li
          key={subtopic.id}
          className={`indent-${subtopic.number.split('.').length}`}
        >
          <p
            className='clickable'
            onClick={() => handleSelect(subtopic)}
          >
            <sup>{subtopic.number}  </sup>
            {subtopic.subtopic}
          </p>
          {subtopic.subtopics.length > 0 && generateTaxonomy(subtopic.subtopics)}
        </li>
      </ol>
    ))
  }

  return (
    <div>
      {generateTaxonomy(subtopics)}
      {selected && <Redirect
        to={{
          pathname: "/references",
          search: `?sub=${selected.subtopic_id}`,
          state: { ...props.location.state, ...selected }
        }}
      />}
    </div>
  )
}

export default Subtopics;