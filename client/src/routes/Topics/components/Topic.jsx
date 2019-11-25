import React from 'react'
import LazyLoad from 'react-lazy-load'
import variables from 'styles/variables/_images.scss'
import './Topic.scss'

const Topic = ({id, name, handleSelect}) => {
  function setImage() {
    const imageUrl = variables[name.toLowerCase().replace(/\s/g, '-')]
    if (imageUrl) console.log(imageUrl)
    return imageUrl ? imageUrl.replace(/"/g, '') : ''
  }

  return (
    <li
      key={id}
      onClick={() => handleSelect({id, name})}
      className={`topic-box clickable ${name}`}
    >
      <LazyLoad offsetVertical={700}>
        <img src={setImage()} alt=''/>
      </LazyLoad>
      <p className="topic-label">{name}</p>
    </li>
  );
}

export default Topic;