import React from 'react';
import Panel from './components/Panel';
import routes from 'constants/routes';
import './Home.scss'

function Home() {
  return (
    <div className="home--container">
      <Panel title="Peruse" href={routes.TOPICS} />
      <Panel title="Search" href={routes.SEARCH} />
      <Panel title="Improve" href={routes.IMPROVE} />
    </div>
  );
}

export default Home;