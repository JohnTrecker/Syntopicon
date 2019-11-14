import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from 'icons/Logo';
import './Navbar.scss'

const Navbar = () => (
  <aside className="navbar--container">
    <div className="logo-and-title">
      <Logo />
    </div>
    <div className="nav-links">
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/topics">TOPICS</NavLink>
      <NavLink to="/search">SEARCH</NavLink>
      <NavLink to="/about">ABOUT</NavLink>
      <NavLink to="/contact">CONTACT</NavLink>
    </div>
  </aside>
)

export default Navbar;