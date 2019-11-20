import React from "react";
import { matchPath, withRouter } from 'react-router';
import { useTopic } from 'hooks/useTopicState'
import { Text, Link } from './components'
import routes from 'constants/routes'
import './Breadcrumb.scss'


const Breadcrumbs = () => {
  const [state, dispatch] = useTopic()
  const {topic, subtopic, reference } = state

  const breadcrumbRoutes = [
    {
      path: routes.BASE,
      targetPath: routes.TOPICS,
      breadcrumb: "Topics",
      id: true
    },
    {
      path: routes.TOPICS,
      targetPath: `${routes.SUBTOPICS}?top=${topic.id}`,
      breadcrumb: topic.name,
      id: topic.id
    },
    {
      path: routes.SUBTOPICS,
      targetPath: `${routes.REFERENCES}?ref=${reference.id}`,
      breadcrumb: subtopic.name,
      id: subtopic.id
    },
    {
      path: routes.REFERENCES,
      targetPath: routes.REFERENCES,
      breadcrumb: reference.name,
      id: reference.id
    }
  ];

  function handleClick(path, targetPath) {
    switch (path) {
      case '/' : {
        dispatch({ type: 'UPDATE_TOPIC', payload: { topic: {}, subtopic: {}, reference: {} } })
        break
      }
      case '/topics' : {
        dispatch({ type: 'UPDATE_TOPIC', payload: { subtopic: {}, reference: {} } })
        break
      }
      case '/subtopics' : {
        dispatch({ type: 'UPDATE_TOPIC', payload: { reference: {} } })
        break
      }
      default: {
        return
      }
    }
  }

  return (
    <div className="breadcrumbs">
      {breadcrumbRoutes
        .filter(({id, path}) => id ? true : matchPath(path) ? true : false )
        .map((route, i, breadcrumbs) => {
          return i === breadcrumbs.length - 1
            ? <Text data={route}/>
            : <Link data={route} handleClick={handleClick}/>
      })}
    </div>
  );
}

export default withRouter(Breadcrumbs);