import React from 'react'
import './Taxonomy.scss'


const Taxonomy = ({ handleSelect, subtopics }) => (
  subtopics.map(subtopic => (
    <ol className="subtopic-tree" key={subtopic.number}>
      <li
        key={subtopic.id}
        className={`subtopics-list-item indent-${subtopic.number.split('.').length}`}
      >
        <p
          className='clickable'
          onClick={() => handleSelect(subtopic)}
        >
          <sup>{subtopic.number}  </sup>
          {subtopic.subtopic}
        </p>
        {subtopic.subtopics.length > 0 &&
          <Taxonomy
            subtopics={subtopic.subtopics}
            handleSelect={handleSelect}
          />
        }
      </li>
    </ol>
  ))
)

export default Taxonomy;