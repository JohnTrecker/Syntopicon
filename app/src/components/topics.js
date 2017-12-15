import React from 'react';
import data from '../data/subtopics.json'

let Topics = (props) => {
  const topics = data.topics
  let { update, hidden } = props
  return (
    <ol className='topics'>
      {topics.map( item =>
        <li key={item.number} onClick={update} className='topic'>
          {`${item.number}. ${item.topic}`}
        </li>
      )}
    </ol>
  )
}

export default Topics