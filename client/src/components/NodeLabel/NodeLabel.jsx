import React from "react";
import './NodeLabel.scss'


const NodeLabel = (props) => {
  const {className, nodeData} = props
  return (
    <div className={className}>
      <p>{nodeData.name}</p>
    </div>
  )
}

export default {
  render: <NodeLabel className="tree-node-text"/>,
  foreignObjectWrapper: {
    width: 600,
    height: '5em',
  }
};
