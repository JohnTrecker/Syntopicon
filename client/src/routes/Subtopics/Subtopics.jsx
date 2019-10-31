import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

function Subtopics(props) {
  const [subtopics, setSubtopics] = useState([])
  const [selected, setSubtopic] = useState('')

  useEffect(fetchSubtopics, [])

  function fetchSubtopics() {
    const { id } = props.location.state;
    axios.get(`http://localhost:8888/v1/topics/${id}`)
      .then(res => setSubtopics(res.data.data.subtopics))
      .catch(err => console.log(err))
  }

  function handleSelect(subtopic) {
    setSubtopic(subtopic)
  }

  function generateTaxonomy(subtopics) {
    return subtopics.map(subtopic => {
      const classNm = `indent-${subtopic.number.split('.').length}`
      return <ol>
        <li
          key={subtopic.id}
          className={classNm}
          onClick={() => handleSelect(subtopic)}
        >
          <p>
            <sup>{subtopic.number}  </sup>
            {subtopic.subtopic}
          </p>
          {subtopic.subtopics.length > 0 && generateTaxonomy(subtopic.subtopics)}
        </li>
      </ol>
    })
  }

  return (
    <div>
      {generateTaxonomy(subtopics)}
      {selected && <Redirect
        to={{
          pathname: "/references",
          search: `?sub=${selected.id}`,
          state: { id: selected.id }
        }}
      />}
    </div>
  )
}

export default Subtopics;