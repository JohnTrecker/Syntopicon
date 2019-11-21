import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


const Link = ({ data, handleClick }) => {
  const { path, targetPath, breadcrumb } = data
  return (
    <NavLink
      key={path}
      onClick={() => handleClick(path)}
      className="breadcrumbs--nav"
      to={targetPath}
    >
      {breadcrumb}
    </NavLink>
  )
}

Link.propTypes = {
  data: PropTypes.shape({
    path: PropTypes.string,
    targetPath: PropTypes.string,
    breadcrumb: PropTypes.string
  }),
  handleClick: PropTypes.func
}

export default Link;