import React from "react";
import PropTypes from 'prop-types';
import './NodeLabel.scss'


const NodeLabel = (props) => {
  const {className, nodeData} = props
  return (
    <div className={className}>
      <p>{nodeData.name}</p>
    </div>
  )
}

NodeLabel.propTypes = {
  className: PropTypes.string,
  nodeData: PropTypes.shape({
    name: PropTypes.string
  })
}

export default {
  render: <NodeLabel className="tree-node-text"/>,
  foreignObjectWrapper: {
    width: 600,
    height: '5em',
  }
};
