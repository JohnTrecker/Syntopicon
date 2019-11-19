import React from 'react';
import { NavLink } from 'react-router-dom'
import './Panel.scss'


const Panel = (props) => (
  <section className={`panel ${props.type}`}>
    <div className="panel--title-overlay" />
    <h1 className="panel--title">{props.title}</h1>
    <NavLink to={props.href} className="panel--cta">
      View
    </NavLink>
  </section>
);

export default Panel;