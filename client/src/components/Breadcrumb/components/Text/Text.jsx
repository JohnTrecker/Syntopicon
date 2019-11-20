import React from 'react';

const Text = ({ data }) => {
  const { path, breadcrumb } = data
  return (
    <p key={path} className="breadcrumbs--nav selected">{breadcrumb}</p>
  )
}

export default Text;