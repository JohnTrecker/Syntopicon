import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import './References.css';
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
    <div>
      <ul>
        {references.map(ref =>
          <li key={ref.id}>
            <q>{ref.summary}</q>
            <br/>
            <span>
              {getAttribution(ref)}
              <p className="p-link clickable" onClick={() => handleSelect(ref)}>More</p>
            </span>
            <br/>
            <br/>
          </li>
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

export default References;