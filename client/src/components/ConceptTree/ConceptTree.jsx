import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Tree from 'react-d3-tree';
import NodeLabel from 'components/NodeLabel'
import useWindowDimensions from 'hooks/useWindowDimensions'
import topics from 'data/topics.json'

import './ConceptTree.scss'

const ConceptTree = (props) => {
  const { width, height } = useWindowDimensions()
  const _pathwidth = 250
  const { _baseX, _baseY } = positionSVG()

  const [selected, setSelected] = useState()
  const [translate, setTranslate] = useState({ x: _baseX, y: _baseY })

  function handleClick (nodeData, evt) {
    const { depth, subtopic_id } = nodeData
    if (depth === 0) handleDepth0(nodeData)
    if (depth === 1) handleDepth1(nodeData)
    if (depth === 2) {
      if (!subtopic_id) return
      return handleSelect(nodeData)
    }
  }

  function handleDepth0(nodeData) {
    const { _collapsed, _children } = nodeData
    if (_collapsed) setTranslate({ x: _baseX + _pathwidth, y: _baseY })
    if (!_collapsed && _children) setTranslate({ x: _baseX - _pathwidth, y: _baseY })
  }

  function handleDepth1(nodeData) {
    const { _collapsed, _children, name } = nodeData
    if (!_children && topics[name]) {
      return handleSelect(nodeData, true)
    }
    if (_collapsed) setTranslate({ x: _baseX, y: _baseY })
    if (!_collapsed && _children) setTranslate({ x: _baseX - _pathwidth, y: _baseY })
  }

  function handleSelect(nodeData, isTopic=false) {
    if (isTopic) {
      setSelected({
        topic: nodeData.name,
        topic_id: topics[nodeData.name]
      })
      return
    }
    console.log(nodeData)
    setSelected({
      subtopic_id: nodeData.subtopic_id,
      subtopic: nodeData.name,
      topic_id: topics[nodeData.parent.name],
      topic: nodeData.parent.name
    })
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
          pathname: selected.subtopic_id ? "/references" : "/subtopics",
          search: selected.subtopic_id ? `?sub=${selected.subtopic_id}` : `?top=${selected.topic_id}`,
          state: { ...selected }
        }}
    />}
    </div>
  )
}

export default ConceptTree;
