import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          My Restaurant
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="menu-toggle"
          aria-label="Toggle navigation"
        >
          <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <div className={`menu ${isOpen ? 'menu-open' : ''}`}>
          <ul className="menu-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/menu" className="nav-link">Menu</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li><Link to="/booking" className="nav-link book">Book Table</Link></li>
            <li><Link to="/admin" className="nav-link admin">Admin</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

