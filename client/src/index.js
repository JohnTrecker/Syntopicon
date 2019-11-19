import { Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.scss';
import * as serviceWorker from './serviceWorker';

import Container from 'components/Container';
import Home from './routes/Home';
import About from './routes/About';
import References from './routes/References';
import Subtopics from './routes/Subtopics';
import Text from './routes/Text';
import Topics from './routes/Topics';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/topics" component={Topics} />
        <Route exact path="/subtopics" component={Subtopics} />
        <Route exact path="/references" component={References} />
        <Route exact path="/excerpt" component={Text} />
        <Redirect to='/' />
      </Switch>
    </Suspense>
  )
}


ReactDOM.render(
  Container(App),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
