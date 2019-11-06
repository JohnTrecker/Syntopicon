import React, { useState, useEffect } from "react";
import Tree from 'react-d3-tree';
import './ConceptTree.scss'


class ConceptTree extends React.Component {
  constructor(props){
    super()
    this.state = {
      translate: {}
    }
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect()
    this.setState({
      translate: {
        x: dimensions.width / 4,
        y: dimensions.height / 4
      }
    })
  }

  render() {
    return (
      <div className='tree-container' ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={this.props.data}
          nodeSize={{ x: 200, y: 35 }}
          textLayout={{textAnchor: "start", x: 15, y: -15 }}
          translate={this.state.translate}
          shouldCollapseNeighborNodes
          useCollapseData
        />
      </div>
    )
  }
}

export default ConceptTree;
