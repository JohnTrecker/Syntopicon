import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import Tree from 'react-d3-tree';
import NodeLabel from 'components/NodeLabel'
import useWindowDimensions from 'hooks/useWindowDimensions'
import { useTopic } from 'hooks/useTopicState'
import topics from 'data/topics.json'

import './ConceptTree.scss'

const ConceptTree = (props) => {
  const { width, height } = useWindowDimensions()
  const _pathwidth = 250
  const { _baseX, _baseY } = positionSVG()

  const [translate, setTranslate] = useState({ x: _baseX, y: _baseY })
  const [state, dispatch] = useTopic()

  // TODO: modify nodeSize, translation, or zoom depending on number of topic nodes, number / positionq of leaf nodes
  function positionSVG() {
    let _baseY = height / 3
    let _baseX = width / 3 - _pathwidth

    return { _baseX, _baseY }
  }

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
      const id = topics[nodeData.name]
      const name = nodeData.name
      const payload = { topic: { id, name } }

      dispatch({ type: 'UPDATE_TOPIC', payload })
      return
    }

    const { subtopic_id: id, name, parent } = nodeData
    const payload = {
      subtopic: { id, name },
      topic: { id: topics[parent.name], name: parent.name },
    }

    dispatch({ type: 'UPDATE_TOPIC', payload })
    return
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
      {state.topic.id && <Redirect
        to={{
          pathname: state.subtopic.id ? "/references" : "/subtopics",
          search: state.subtopic.id ? `?sub=${state.subtopic.id}` : `?top=${state.topic.id}`,
        }}
    />}
    </div>
  )
}

ConceptTree.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.array
    })),
  })
}

export default ConceptTree;
