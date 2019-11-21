import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from 'icons/Logo';
import { useTopicDispatch } from 'hooks/useTopicState';
import './Navbar.scss'

const Navbar = () => {
  const dispatch = useTopicDispatch()

  function handleClick() {
    dispatch({
      type: 'UPDATE_TOPIC',
      payload: {topic: {}, subtopic: {}, reference: {}}
    })
  }

  return (
    <aside className="navbar--container">
      <div className="logo-and-title">
        <Logo />
      </div>
      <div className="nav-links">
        <NavLink to="/">home</NavLink>
        <NavLink to="/topics" onClick={handleClick}>topics</NavLink>
        <NavLink to="/search" onClick={handleClick}>search</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/contact">contact</NavLink>
      </div>
    </aside>
  )
}


export default Navbar;