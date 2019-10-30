import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

function Text(props) {
  const [excerpt, setText] = useState([])

  useEffect(fetchText, [])

  function fetchText() {
    const { id } = props.location.state;
    axios.get(`http://localhost:8888/v1/references/${id}`)
      .then(res => setText(res.data.data))
      .catch(err => console.log(err))
  }

  const { text, page_start, page_end, author, title } = excerpt
  const pages = page_end ? `${page_start}-${page_end}` : page_start
  const attribution = `${title}, ${author} (${pages})`
  return (
    <div>
      <p>{text}</p>
      <br/>
      <br/>
      <p>{attribution}</p>
    </div>
  )
}

export default Text;