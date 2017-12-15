import React from 'react'

class Authors extends React.Component {
  constructor(){
    super()
  }
  render() {
    let {number, update} = this.props
    return (
      <ol>
      {number ? ['Plato.and other authors go here'].map( item => {
          <li onClick={update} key={item.number}>item.subtopic</li>
        })
       : null
      }
      </ol>
    )
  }
}

export default Authors;
