import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useTopic } from 'hooks/useTopicState';
import Breadcrumb from 'components/Breadcrumb'
import Image from 'components/Image'
import Taxonomy from './components/Taxonomy'
import './Subtopics.scss'
const axios = require('axios');


const Subtopics = () => {
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

  return (
    <div className="subtopics--container">
      <Breadcrumb />
      <Image name={state.topic.name}/>
      <section className="taxonomy--container">
        <Taxonomy
          subtopics={subtopics}
          handleSelect={handleSelect}
        />
      </section>
      {/* {generateTaxonomy(subtopics)} */}
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