import React from 'react';
import './Section.scss'
import { NavLink } from 'react-router-dom'

const Section = (props) => (
  <section className={`section ${props.type}`}>
    <div className="section--title-overlay" />
    <h1 className="section--title">{props.title}</h1>
    <NavLink to={props.href} className="section--cta">
      View
    </NavLink>
  </section>
);

export default Section;