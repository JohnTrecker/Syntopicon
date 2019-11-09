import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Tree from 'react-d3-tree';
import NodeLabel from 'components/NodeLabel'
import useWindowDimensions from 'hooks/useWindowDimensions'

import './ConceptTree.scss'

const ConceptTree = (props) => {
  const { width, height } = useWindowDimensions()
  const _pathwidth = 250
  const _baseY = height / 4
  const _baseX = width / 2 - _pathwidth

  const [selected, setSelected] = useState()
  const [translate, setTranslate] = useState({ x: _baseX, y: _baseY })

  useEffect(() => {
    if (!selected) setTranslate({ x: _baseX, y: _baseY })
  }, [props.data.name])

  const handleClick = (nodeData, evt) => {
    const { _collapsed, depth, meta, children } = nodeData
    if (depth === 1) {
      if (_collapsed) setTranslate({ x: _baseX, y: _baseY})
      if (!_collapsed) setTranslate({ x: _baseX - _pathwidth, y: _baseY})
    }
    if (depth === 2) {
      if (!meta.subtopic_id) return
      setSelected(meta.subtopic_id)
    }
  }

  const nodeSize = { x: _pathwidth, y: props.data.children.length > 3 ? 55 : 150 }

  return (
    <div className='tree-container'>
      <p style={{ border: '1px solid red;', position: 'absolute', top: '50%', left: 0}}>{width} ~ {height}</p>
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
        // style={{transform: 'translate(50%)'}}
      />
      {selected && <Redirect
        to={{
          pathname: "/references",
          search: `?sub=${selected}`,
          state: { id: selected }
        }}
    />}
    </div>
  )
}

export default ConceptTree;
