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
          <ul className="menu-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/menu" className="nav-link">Menu</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li><Link to="/booking" className="nav-link book">Book Table</Link></li>
            <li><Link to="/admin" className="nav-link admin">Admin</Link></li>
          </ul>
        </div>
    </nav>
  );
};

