import React from 'react';
import Topics from './topics'
import Subtopics from './subtopics'
import Authors from './authors'
import Passage from './passage'
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      topic: null,
      subtopic: null,
      author: null,
      passage: null,
      show: {
        topics: true,
        subtopics: false,
        authors: false,
        passage: false
      }
    }
  }
  render(){
    let {topic} = this.state
    return (
      <div id='container'>
        <Topics number={topic}/>
        <Subtopics number={topic} subtopic={subtopic}/>
        <Authors number={topic} subtopic={subtopic}/>
        <Passage passage={passage}/>
      </div>
    )
  }
}

export default App;