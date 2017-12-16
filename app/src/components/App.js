import React     from 'react';
import Topics    from './topics'
import Subtopics from './subtopics'
// import Authors   from './authors'
// import Passage   from './passage'
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      topic:         null,
      subtopic:      null,
      passage:       null,
      hidetopics:    false,
      hidesubtopics: false,
      hideauthors:   false,
      hidepassage:   false
    }
    this.updateTopic    = this.updateTopic.bind(this)
    this.updateSubtopic = this.updateSubtopic.bind(this)
    this.updatePassage  = this.updatePassage.bind(this)
    this.hide           = this.hide.bind(this)

  }

  updateTopic(e){
    let value = e.target.innerHTML.split('.')[0]
    this.setState({...this.state, topic: value})
    this.hide(e, 'topic')
    console.log('topic set to', value, '\n', 'e.target ', e)
  }

  updateSubtopic(e){
    let value = e.target.innerHTML.split('.')[0]
    this.setState({...this.state, subtopic: value})
    this.hide(e, 'subtopic')
    console.log('subtopic set to', value)
  }

  updatePassage(e){
    let value = e.target.innerHTML.split('.')[0]
    this.setState({passage: value})
    console.log('passage set to', value)
  }

  hide(e, name){
    let list = document.getElementsByClassName(name)
    for (let el of list) {
      if (el != e.target) el.hidden = true
    }
  }

  render(){
    let {topic, subtopic} = this.state
    return (
      <div id='container'>
        <Topics
          update={this.updateTopic} />
        <Subtopics
          update={this.updateSubtopic}
          number={topic}
          subtopic={subtopic} />
      </div>
    )
  }
}

export default App;

        // <Authors   update={this.updatePassge} number={topic} subtopic={subtopic} />
        // <Passage   passage={passage} />
