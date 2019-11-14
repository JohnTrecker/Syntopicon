import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Section from './components/Section';
import './Home.scss'

function Home() {
  return (
    <div className="home-sections">
      <Section type="section-topics" title="Peruse" href="/topics" />
      <Section type="section-search" title="Search" href="/search" />
      <Section type="section-follow" title="Follow" href="/account" />
    </div>
  );
}

export default Home;