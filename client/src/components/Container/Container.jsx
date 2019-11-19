import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopicProvider } from 'context/topic'
import Navbar from 'components/Navbar';
import './Container.scss'


const Container = (Component) => (
  <div className="app--container">
    <TopicProvider>
      <Router>
        <Navbar />
        <Component style={{"width": "80vh"}}/>
      </Router>
    </TopicProvider>
  </div>
)

export default Container;