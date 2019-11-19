import React, { useState } from 'react';
import Autocomplete from 'components/Autocomplete'
import ConceptTree from 'components/ConceptTree'
import suggestions from 'data/suggestions.json';
import template from 'data/template.json'
import './Search.scss'


const Search = () => {
  const [data, setData] = useState(template)
  const handleSelect = (topic) => setData(suggestions[topic])

  return (
      <section className='search--container'>
        <div className='selection-container'>
          <Autocomplete
            autofocus
            suggestions={Object.keys(suggestions)}
            handleSelect={handleSelect}
          />
        </div>
        <section className='concept-tree-container'>
          <ConceptTree data={data} />
        </section>
      </section>
  )
}

export default Search;