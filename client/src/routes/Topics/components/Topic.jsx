import React from 'react'
import LazyLoad from 'react-lazy-load'
import variables from 'styles/variables/images'
import './Topic.scss'

const Topic = ({id, name, handleSelect}) => {
  function setImage() {
    let alias = name.replace(/\s/g, '_').toLowerCase()
    const imageMeta = variables[alias]
    return imageMeta ? imageMeta.small : ''
  }

  return (
    <li
      key={id}
      onClick={() => handleSelect({ id, name })}
      className={`topic-box clickable ${name}`}
    >
      <LazyLoad offsetBottom={2000}>
        <img src={setImage()} alt="" />
      </LazyLoad>
      <p className="topic-label">{name}</p>
    </li>
  );
}

export default Topic;