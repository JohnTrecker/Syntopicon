import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from 'components/Navbar';
import './Container.scss'


const Container = (Component) => (
  <div className="app--container">
    <Router>
      <Navbar />
      <Component style={{"width": "80vh"}}/>
    </Router>
  </div>
)

export default Container;