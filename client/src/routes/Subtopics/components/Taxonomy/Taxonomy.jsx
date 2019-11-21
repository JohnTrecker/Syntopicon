import React from 'react'
import PropTypes from 'prop-types'
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

Taxonomy.propTypes = {
  handleSelect: PropTypes.func,
  subtopics: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string,
    id: PropTypes.number,
    subtopic: PropTypes.string,
  }))
}

export default Taxonomy;