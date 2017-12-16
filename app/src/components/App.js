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
    this.update = this.update.bind(this)
    this.hide   = this.hide.bind(this)
  }

  update(e, number, category){
    this.setState({...this.state, topic: number})
    this.hide(e, category)
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
          update={this.update} />
        <Subtopics
          update={this.update}
          number={topic}
          subtopic={subtopic} />
      </div>
    )
  }
}

export default App;

        // <Authors   update={this.updatePassge} number={topic} subtopic={subtopic} />
        // <Passage   passage={passage} />
