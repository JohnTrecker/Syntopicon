import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useTopic } from 'hooks/useTopicState';
import Breadcrumb from 'components/Breadcrumb'
import Image from 'components/Image'
import './References.scss';

const axios = require('axios');


function References(props) {
  const [references, setReferences] = useState([])
  const [state, dispatch] = useTopic()

  useEffect(fetchReferences, [])

  function fetchReferences() {
    const { id } = state.subtopic;
    if (!id) return
    axios.get(`http://localhost:8888/v1/subtopics/${id}/references`)
      .then(res => setReferences(res.data.data))
      .catch(err => console.log(err))
  }

  function handleSelect(selection) {
    const { id, title: name } = selection
    const payload = { reference: { id, name } }
    dispatch({ type: 'UPDATE_TOPIC', payload })
  }

  function getPages(s, e){
    return e
      ? `${s} - ${e}`
      : s
  }
  function getAttribution(ref){
    const { author, title, page_start, page_end } = ref
    return author === 'Bible'
      ? `${page_start} (${title})`
      : `${author} (${title}, ${getPages(page_start, page_end)})`
  }

  return (
    <div className="reference--container">
      <Breadcrumb />
      <Image name={state.topic.name} />
      <div className="list--container">
        <ul className="reference-list">
          {references.map(ref =>
            <div key={ref.id} className="reference-list-item">
              <q className="quote">{ref.summary}</q>
              <span className="attribution">
                {getAttribution(ref)}
                <p className="p-link clickable" onClick={() => handleSelect(ref)}>More</p>
              </span>
            </div>
          )}
        </ul>
      </div>
      {state.reference.id && <Redirect
        to={{
          pathname: "/excerpt",
          search: `?refs=${state.reference.id}`,
        }}
      />}
    </div>
  )
}

export default withRouter(References);