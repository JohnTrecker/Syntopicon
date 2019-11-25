import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import './Panel.scss'


const Panel = ({title, href}) => (
  <section className={`panel`}>
    <div className="panel--title-overlay" />
    <h1 className="panel--title">{title}</h1>
    <NavLink to={href} className="panel--cta">
      View
    </NavLink>
  </section>
);

Panel.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
}

export default Panel;