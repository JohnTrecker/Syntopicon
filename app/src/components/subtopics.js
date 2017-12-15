import React from 'react'
import data from '../data/subtopics.json'

class Subtopics extends React.Component {
  constructor(){
    super()
  }
  render(props){
    let {number, subtopic, update, hidden} = this.props
    let i = Number(number) - 1
    let indent = (str) => `${str.split('.').length - 1 * 5}em`
    return (
      <ul>
        {number ? data.topics[i].subtopics.map( item =>
          <li
            key={item.number}
            onClick={update}
            style={{ paddingLeft: indent(item.number) }}
            className='subtopic'>

             {item.subtopic}

          </li>
        ) : null}
      </ul>
    )
  }
}

export default Subtopics;
