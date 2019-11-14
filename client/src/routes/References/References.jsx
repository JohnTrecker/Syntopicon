import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Breadcrumb from 'components/Breadcrumb'
import './References.scss';

const axios = require('axios');


function References(props) {
  const [references, setReferences] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(fetchReferences, [])

  function fetchReferences() {
    const { subtopic_id: id } = props.location.state;
    axios.get(`http://localhost:8888/v1/subtopics/${id}/references`)
      .then(res => setReferences(res.data.data))
      .catch(err => console.log(err))
  }

  function handleSelect(selection) {
    const { id: ref_id, title: ref } = selection
    setSelected({ref_id, ref})
  }

  function getAttribution(ref){
    const { author, title, page_start, page_end } = ref
    return author === 'Bible'
      ? `${page_start} (${title})`
      : `${author} (${title})`
  }

  return (
    <div className="reference--container">
      <Breadcrumb />
      <h1 className="reference-title">Excerpts</h1>
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
      {selected && <Redirect
        to={{
          pathname: "/excerpt",
          search: `?refs=${selected.ref_id}`,
          state: { ...props.location.state, ...selected }
        }}
      />}
    </div>
  )
}

export default withRouter(References);