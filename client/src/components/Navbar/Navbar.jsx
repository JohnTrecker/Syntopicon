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
      <NavLink to="/">home</NavLink>
      <NavLink to="/topics">topics</NavLink>
      <NavLink to="/search">search</NavLink>
      <NavLink to="/about">about</NavLink>
      <NavLink to="/contact">contact</NavLink>
    </div>
  </aside>
)

export default Navbar;