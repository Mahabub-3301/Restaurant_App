import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';
import { loginUser } from '../api/authAPI';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ isLogin, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated} = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="logo">
          Dev Restaurant
        </Link>
        <ul className="menu-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/menu" className="nav-link">Menu</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          <li><Link to="/booking" className="nav-link book">Book Table</Link></li>
          {isAuthenticated() && (
            <li>
              <Link to={localStorage.getItem('role')=='admin' ? "/admin" : "/dashboard"} className="nav-link admin">
                {localStorage.getItem('role')=='admin' ? "Admin" : "Dashboard"}
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <li><Link to="/login" className="nav-link admin">Login</Link></li>)}
        </ul>
      </div>
    </nav>
  );
};

