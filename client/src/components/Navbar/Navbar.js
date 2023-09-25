// Imports
import { NavLink } from "react-router-dom";

// Styles
import './navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo"><NavLink to='/'>Underhill Hall</NavLink></li>
        <li><NavLink to='/'>Dashboard</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
        <li><NavLink to='/contact'>Contact Us</NavLink></li>
      </ul>
    </div>
  )
};
