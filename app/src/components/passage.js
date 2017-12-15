import React from 'react'
import data from '../data/subtopics.json'

class Passage extends React.Component {
  constructor(){
    super()
  }
  render(props) {
    let [vol, alpha, omega] = this.props.passage.split('.')
    return (
      <div>
      </div>
    )
  }
}

export default Passage;
