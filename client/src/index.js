import { Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.scss';
import routes from 'constants/routes';

import Container from 'components/Container';
import Home from './routes/Home';
import About from './routes/About';
import References from './routes/References';
import Subtopics from './routes/Subtopics';
import Text from './routes/Text';
import Topics from './routes/Topics';
import Search from './routes/Search';
import Improve from './routes/Improve';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path={routes.BASE} component={Home} />
        <Route exact path={routes.ABOUT} component={About} />
        <Route exact path={routes.TOPICS} component={Topics} />
        <Route exact path={routes.SUBTOPICS} component={Subtopics} />
        <Route exact path={routes.REFERENCES} component={References} />
        <Route exact path={routes.EXCERPT} component={Text} />
        <Route exact path={routes.SEARCH} component={Search} />
        <Route exact path={routes.IMPROVE} component={Improve} />
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
// serviceWorker.unregister();
