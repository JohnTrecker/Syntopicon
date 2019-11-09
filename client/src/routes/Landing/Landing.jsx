import React, {Fragment, useState} from 'react';
import { Redirect, Link } from 'react-router-dom';

import './Landing.scss'

import Autocomplete from 'components/Autocomplete'
import ConceptTree from 'components/ConceptTree'

import Logo from 'icons';
import suggestions from 'data/suggestions.json';
import template from 'data/template.json'


function Landing() {
  const [data, setData] = useState(template)
  const handleSelect = (topic) => setData(suggestions[topic])

  return (
    <Fragment>
      <header className='banner'>
        <div className='cta-container'>
          <p className='cta-text clickable'>Explore the whole history of an idea</p>
          <Link className='btn-landing cta' to='/topics'>Explore</Link>
          <p className='cta-text'>Or search for a topic</p>
          <Autocomplete
            autofocus
            suggestions={Object.keys(suggestions)}
            handleSelect={handleSelect}
          />
        </div>
        <Logo className='landing-logo'/>
      </header>
      <section className='landing-fold'>
        <ConceptTree data={data} />
      </section>
    </Fragment>
  )
}

export default Landing;