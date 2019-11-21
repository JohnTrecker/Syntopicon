import React from 'react';
import PropTypes from 'prop-types';


const Text = ({ data }) => {
  const { path, breadcrumb } = data
  return (
    <p key={path} className="breadcrumbs--nav selected">{breadcrumb}</p>
  )
}

Text.propTypes = {
  data: PropTypes.shape({
    path: PropTypes.string,
    breadcrumb: PropTypes.string
  })
}

export default Text;