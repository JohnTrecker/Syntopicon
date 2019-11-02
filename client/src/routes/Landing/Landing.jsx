import React, {Fragment} from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Landing.scss'

import Autocomplete from 'components/Autocomplete'
import Logo from 'icons';
import suggestions from 'data/suggestions.json';

function Landing() {
  return (
    <Fragment>
      <header className='banner'>
        <div className='cta-container'>
          <p className='cta-text clickable'>Explore the whole history of an idea</p>
          <Link className='btn-landing cta' to='/topics'>Explore</Link>
          <p className='cta-text'>Or search for a topic</p>
          <Autocomplete 
            suggestions={Object.keys(suggestions)}
          />
        </div>
        <Logo className='landing-logo'/>
      </header>
      <section className='landing-fold'>
      </section>
    </Fragment>
  )
}

export default Landing;