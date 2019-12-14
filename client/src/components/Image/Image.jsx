import React from "react";
import PropTypes from 'prop-types';
import variables from 'styles/variables/images'
import './Image.scss'


const Image = ({name}) => {
  function getImage() {
    if (!name) return {}
    const alias = name.replace(/\s/g, "_").toLowerCase()
    const imageMeta = variables[alias]
    return imageMeta ? imageMeta : {}
  }

  const { big, author, handle } = getImage()

  return (
    <div
      className="image--container"
      style={{ backgroundImage: `url(${big})` }}
    >
      <p>
        Photo by{" "}
        <a href={`https://unsplash.com/${handle}`}>
          {author}
        </a>{" "}
        on <a href="https://unsplash.com">Unsplash</a>
      </p>
    </div>
  );
}

Image.propTypes = {
  name: PropTypes.string
}

export default Image;
