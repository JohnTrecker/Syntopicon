import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

function References(props) {
  const [references, setReferences] = useState([])
  const [selected, setReference] = useState('')

  useEffect(fetchReferences, [])

  function fetchReferences() {
    const { id } = props.location.state;
    axios.get(`http://localhost:8888/v1/subtopics/${id}/references`)
      .then(res => setReferences(res.data.data))
      .catch(err => console.log(err))
  }

  function handleSelect(ref) {
    setReference(ref)
  }

  return (
    <div>
      <ul>
        {references.map(ref =>
          <li key={ref.id} onClick={() => handleSelect(ref)}>
            <q>{ref.summary}</q>
            <br/>
            <span>{`${ref.author} (${ref.title})`}</span>
          </li>
        )}
      </ul>
      {selected && <Redirect
        to={{
          pathname: "/excerpt",
          search: `?refs=${selected.id}`,
          state: { id: selected.id }
        }}
      />}
    </div>
  )
}

export default References;