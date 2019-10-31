import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Landing.css'

function Landing() {

  return (
    <header className="banner">
      <div className="cta-container">
        <p className="cta-text">Explore the whole history of an idea</p>
        <Link className="btn-landing cta" to="/topics">Explore</Link>
      </div>
    </header>
  )
}

export default Landing;