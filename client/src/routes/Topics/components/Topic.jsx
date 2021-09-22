import React from 'react'
import LazyLoad from 'react-lazy-load'
import variables from 'styles/variables/images'
import './Topic.scss'

const Topic = ({id, name, handleSelect}) => {
  const alias = name.replace(/\s/g, '_').toLowerCase()
  const source = (alias in variables) ? variables[alias].small : ''

  return (
    <li
      key={id}
      onClick={() => handleSelect({ id, name })}
      className={`topic-box clickable ${name}`}
    >
      <LazyLoad offsetBottom={2000}>
        <img src={source} alt={`${alias}-image`} />
      </LazyLoad>
      <p className="topic-label">{name}</p>
    </li>
  );
}

export default Topic;