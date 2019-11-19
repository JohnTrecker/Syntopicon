import React from 'react';
import Panel from './components/Panel';
import './Home.scss'

function Home() {
  return (
    <div className="home--container">
      <Panel type="panel-topics" title="Peruse" href="/topics" />
      <Panel type="panel-search" title="Search" href="/search" />
      <Panel type="panel-follow" title="Follow" href="/account" />
    </div>
  );
}

export default Home;