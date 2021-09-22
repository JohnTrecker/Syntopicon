import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useTopic } from 'hooks/useTopicState';
import Breadcrumb from 'components/Breadcrumb'
import Image from 'components/Image'
import './References.scss';
const axios = require('axios');


function References() {
  const [references, setReferences] = useState([])
  const [state, dispatch] = useTopic()
  const [errorFetching, setErrorFetching] = useState(false)

  useEffect(fetchReferences, [])

  return (
    <div className="reference--container">
      <Breadcrumb />
      {!errorFetching && <Image name={state.topic.name} />}
      <div className={`list--container${errorFetching ? ' full-width' : ''}`}>
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

  function fetchReferences() {
    const { id } = state.subtopic;
    axios.get(`http://localhost:8888/v1/subtopics/${id}/references`)
      .then(res => setReferences(res.data.data))
      .catch(err => {
        setErrorFetching(true)
      })
  }

  function handleSelect(selection) {
    const { id, title: name } = selection
    const payload = { reference: { id, name } }
    dispatch({ type: 'UPDATE_REFERENCE', payload })
  }

  function getPages(start, end){
    return end ? `${start} - ${end}` : start
  }

  function getAttribution(ref){
    const { author, title, page_start, page_end } = ref
    return author === 'Bible'
      ? `${page_start} (${title})`
      : `${author} (${title}, ${getPages(page_start, page_end)})`
  }

}

export default withRouter(References);