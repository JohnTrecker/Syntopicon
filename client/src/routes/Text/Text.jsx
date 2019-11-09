import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

function Text(props) {
  const [excerpt, setText] = useState(null)

  useEffect(fetchText, [])

  function fetchText() {
    const { ref_id: id } = props.location.state;
    axios.get(`http://localhost:8888/v1/references/${id}`)
      .then(res => setText(res.data.data))
      .catch(err => console.log(err))
  }

  function getAttribution(){
    if (!excerpt) return ''
    const { text, page_start, page_end, author, title } = excerpt
    const pages = page_end ? `${page_start}-${page_end}` : page_start
    return `${title}, ${author} (${pages})`
  }

  function getText(){
    if (!excerpt) return ''
    const { text } = excerpt
    let indexStart = 0
    let indexEnd = text.length
    const delimiters = ['.', '!', '?']

    for (let i = 0; i < text.length; i++) {
      if (delimiters.includes(text[i])) {
        indexStart = i + 2 // 1. punctuation, 2. space
        break
      }
    }

    for (let i = text.length - 1; i > 0; i--) {
      if (delimiters.includes(text[i])) {
        indexEnd = i + 1 // 1. final punctuation
        break
      }
    }

    return text.slice(indexStart, indexEnd)
  }

  return (
    <div>
      <p>{getText()}</p>
      <br/>
      <br/>
      <p>{getAttribution()}</p>
    </div>
  )
}

export default Text;