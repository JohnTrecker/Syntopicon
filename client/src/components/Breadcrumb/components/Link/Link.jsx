import React from 'react';
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

export default Link;