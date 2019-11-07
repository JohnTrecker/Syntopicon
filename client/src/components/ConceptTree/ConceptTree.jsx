import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Tree from 'react-d3-tree';
import './ConceptTree.scss'
import NodeLabel from 'components/NodeLabel'


class ConceptTree extends React.Component {
  constructor(props){
    super()
    this.state = {
      translate: {},
      dimensions: { width: undefined, height: undefined},
      selected: undefined
    }
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect()
    this.setState({
      translate: {
        x: dimensions.width / 4,
        y: dimensions.height / 3
      },
      dimensions: {
        width: dimensions.width,
        height: dimensions.height
      }
    })
  }

  // TODO:
  componentWillUnmount(){
    // destroy d3 root node
    // clear intervals
    // remove event listeners
  }

  componentDidUpdate(prevProps){
    if (prevProps.data.name !== this.props.data.name) {
      const { width, height } = this.state.dimensions      
      this.setState({translate: {x: width / 4, y: height / 3}})
    }
  }

  handleClick = (nodeData, evt) => {
    const { _collapsed, depth, meta, children } = nodeData
    const { width, height } = this.state.dimensions
    if (depth === 1) {
      if (_collapsed) this.setState({translate: {x: width / 4, y: height / 3}})
      if (!_collapsed) this.setState({translate: {x: width / 8, y: height / 3}})
    }
    if (depth === 2) {
      if (!meta.subtopic_id) return
      this.setState({selected: meta.subtopic_id})
    }
  }

  render() {
    const { children } = this.props.data
    const { selected, translate } = this.state
    const nodeSize = {
      x: 250,
      y: children.length > 3 ? 55 : 150
    }
    return (
      <div className='tree-container' ref={tc => (this.treeContainer = tc)}>
        <Tree
          className='svg-tree'
          data={this.props.data}
          nodeSize={nodeSize}
          textLayout={{textAnchor: "start", x: 25, y: 5 }}
          translate={translate}
          nodeLabelComponent={NodeLabel}
          separation={{siblings: 1, nonSiblings: 1}}
          onClick={this.handleClick}
          style={{
            transform: 'translate(50%)'
          }}
          allowForeignObjects
          shouldCollapseNeighborNodes
          useCollapseData
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
}

export default ConceptTree;
