import React from "react";
import PropTypes from 'prop-types';
import variables from 'styles/variables/_images.scss'
import './Image.scss'


const Image = ({name}) => {
  function setImage() {
    if (!name) return {}
    const resource = `${name.toLowerCase().replace(/\s/g, '-')}-big`
    const imageUrl = variables[resource]
    return imageUrl
      ? { 'backgroundImage': `url(${imageUrl})` }
      : {}
  }

  return (
    <div className="image--container" style={setImage()}></div>
  )
}

Image.propTypes = {
  name: PropTypes.string
}

export default Image;
