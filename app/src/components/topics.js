import React from 'react';
import data from '../data/subtopics.json'

class Topics extends React.Component {
  constructor(){
    super();
    this.state = {
      subtopic: null
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    let num = e.target.innerHTML.split('.')[0]
    num = Number(num)
    this.setState({subtopic: num})
  }

  render(){
    const topics = data.topics
    let {subtopic} = this.state
    return (
      <ol className='topics'>
        {topics.map( item => {
            return (
              <li key={item.number} onClick={this.handleClick}>
                {`${item.number}. ${item.topic}`}
              </li>
              )
        })}
      </ol>
    )
  }
}

export default Topics