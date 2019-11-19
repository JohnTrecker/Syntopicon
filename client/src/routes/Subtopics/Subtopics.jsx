import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useTopic } from 'hooks/useTopicState';
import Breadcrumb from 'components/Breadcrumb'
import './Subtopics.scss'

const axios = require('axios');


function Subtopics(props) {
  const [subtopics, setSubtopics] = useState([])
  const [state, dispatch] = useTopic()

  useEffect(fetchSubtopics, [])

  function fetchSubtopics() {
    const { id } = state.topic;
    if (!id) return
    axios.get(`http://localhost:8888/v1/topics/${id}`)
      .then(res => setSubtopics(res.data.data.subtopics))
      .catch(err => console.log(err))
  }

  function handleSelect(selected) {
    const { id, subtopic: name } = selected
    const payload = { subtopic: {id, name} }
    dispatch({ type: 'UPDATE_TOPIC', payload })
  }

  function generateTaxonomy(subtopics) {
    return subtopics.map(subtopic => (
      <ol className="subtopic-tree" key={subtopic.number}>
        <li
          key={subtopic.id}
          className={`subtopics-list-item indent-${subtopic.number.split('.').length}`}
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
    <div className="subtopics--container">
      <Breadcrumb />
      {generateTaxonomy(subtopics)}
      {state.subtopic.id && <Redirect
        to={{
          pathname: "/references",
          search: `?sub=${state.subtopic.id}`,
        }}
      />}
    </div>
  )
}

export default withRouter(Subtopics);