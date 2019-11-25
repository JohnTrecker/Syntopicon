import React, { useEffect, useState } from 'react';
import './Improve.scss';
import content from 'constants/content.json';
const axios = require('axios');


const Improve = () => {
  const [topics, setTopics] = useState([])
  const [subtopics, setSubtopics] = useState([])
  const [selected, setSelected] = useState({topic: {}, subtopic: {}})
  const [cache, setCache] = useState({topics: {}, subtopics: {}})
  const [authors, setAuthors] = useState({})

  function topsToId(topics=[]){
    return topics.reduce((obj, { name, id }) => {
      obj[name] = id
      // TODO: recurse over nested subtopics
      return obj
    }, {})
  }

  function cacheValues(values=[], type='topics') {
    setCache({ ...cache, [type]: topsToId(values) })
  }

  function fetchTopics() {
    axios.get('http://localhost:8888/v1/topics')
    .then(res => {
      setTopics(res.data.data)
      cacheValues(res.data.data)
    })
    .catch(err => console.log(err))
  }

  function fetchSubtopics(id) {
    axios.get(`http://localhost:8888/v1/topics/${id}`)
      .then(res => {
        const subs = res.data.data.subtopics.map(({subtopic: name, id}) => ({name, id}));
        setSubtopics(subs)
        console.log(subs)
        cacheValues(subs, 'subtopics')
      })
      .catch(err => console.log(err))
  }

  // function fetchAuthors() {
  //   axios.get('http://localhost:8888/v1/authors')
  //     .then(res => setAuthors(res.data.data))
  //     .catch(err => console.log(err))
  // }

  useEffect(fetchTopics, [])

  const handleTopicSelect = (e) => {
    const name = e.target.value
    const topic = { name, id: cache.topics[name] }
    setSelected({ ...selected, topic })
    fetchSubtopics(topic.id)
    e.preventDefault()
  }


  return (
    <section className="improve--container">
      <div className="improve--content">
        <div className="content--branding">
          <h1 className="content--title">Thought leadership can come from anywhere.</h1>
          <p className="content--tagline">Contribute texts that move the conversation forward</p>
          <form className="content--description" action="/my-handling-form-page" method="post">

            <div className="input-container">
              <label className="input-label">Full Text:</label>
              <textarea className="input-element" name="user_text"></textarea>
            </div>

            <div className="input-container">
              <label className="input-label">Excerpt:</label>
              <textarea className="input-element" name="user_excerpt"></textarea>
            </div>

            <div className="input-container">
              <label className="input-label">Author:</label>
              <input className="input-element" type="text" name="user_author" />
            </div>

            <div className="input-container">
              <label className="input-label">Title:</label>
              <input className="input-element" type="text" name="user_title" />
            </div>

            <div className="input-container">
              <label className="input-label">Topic:</label>
              <select className="input-element"
                value={selected.topic.name}
                onChange={handleTopicSelect}
              >
                {topics.map(({name, id}) =>
                  <option key={id} value={name}>{name}</option>
                )}
              </select>
            </div>

            <div className="input-container">
              <label className="input-label">Subtopic:</label>
              <select className="input-element" disabled={!selected.topic.name} name="user_subtopic">
                {subtopics.map(({ name, id }) =>
                  <option key={id} value={name}>{name}</option>
                )}
              </select>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
export default Improve;