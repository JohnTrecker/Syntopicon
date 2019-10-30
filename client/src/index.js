import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

const ErrorBoundary = import('./components/ErrorBoundary');
const Topics = lazy(() => import('./routes/Topics'));
const Subtopics = lazy(() => import('./routes/Subtopics'));
const References = lazy(() => import('./routes/References'));
const Text = lazy(() => import('./routes/Text'));


ReactDOM.render(
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {/* <ErrorBoundary> */}
          <Route exact path="/topics" component={Topics} />
          <Route path="/subtopics" component={Subtopics} />
          <Route path="/references" component={References} />
          <Route path="/excerpt" component={Text} />
        {/* </ErrorBoundary> */}
      </Switch>
    </Suspense>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
