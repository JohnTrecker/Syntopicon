import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Tree from 'react-d3-tree';
import NodeLabel from 'components/NodeLabel'
import useWindowDimensions from 'hooks/useWindowDimensions'

import './ConceptTree.scss'

const ConceptTree = (props) => {
  const { width, height } = useWindowDimensions()
  const _pathwidth = 250
  const { _baseX, _baseY } = positionSVG()

  const [selected, setSelected] = useState({})
  const [translate, setTranslate] = useState({ x: _baseX, y: _baseY })

  function handleClick (nodeData, evt) {
    const { _collapsed, depth, meta, children } = nodeData
    if (depth === 1) {
      if (_collapsed) setTranslate({ x: _baseX, y: _baseY})
      if (!_collapsed) setTranslate({ x: _baseX - _pathwidth, y: _baseY})
    }
    if (depth === 2) {
      if (!meta.subtopic_id) return
      handleSelect(nodeData)
    }
  }

  // TODO: include topic_id as well
  function handleSelect(nodeData) {
    const { name: subtopic, parent, meta } = nodeData
    const { subtopic_id } = meta
    const { name: topic } = parent
    setSelected({ subtopic_id, subtopic, topic })
  }

  // TODO: modify nodeSize, translation, or zoom depending on number of topic nodes, number / positionq of leaf nodes
  function positionSVG() {
    let _baseY = height / 4
    let _baseX = width / 2 - _pathwidth

    return {_baseX , _baseY}
  }

  const nodeSize = { x: _pathwidth, y: props.data.children.length > 3 ? 55 : 150 }

  return (
    <div className='tree-container'>
      <Tree
        className='svg-tree'
        data={props.data}
        nodeLabelComponent={NodeLabel}
        nodeSize={nodeSize}
        onClick={handleClick}
        separation={{siblings: 1, nonSiblings: 1}}
        textLayout={{textAnchor: "start", x: 25, y: 5 }}
        translate={translate}
        allowForeignObjects
        shouldCollapseNeighborNodes
        useCollapseData
      />
      {selected && <Redirect
        to={{
          pathname: "/references",
          search: `?sub=${selected.subtopic_id}`,
          state: { ...selected }
        }}
    />}
    </div>
  )
}

export default ConceptTree;
