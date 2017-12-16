import React from 'react';
import data from '../data/subtopics2.json'

let Topics = ({update, hidden}) => {
  const topics = data.topics
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