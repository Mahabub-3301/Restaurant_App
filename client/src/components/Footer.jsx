// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: '#222', color: '#fff', padding: '2rem 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h3>Resto</h3>
        <p>© 2025 Dev Resto. All rights reserved.</p>

        {/* Social Links */}
        <div style={{ margin: '1rem 0' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}><FaFacebookF /></a>
          <a href="https://github.com/Mahabub-3301" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}><FaGithub /></a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/shaik-mahaboob-42569b362/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}><FaLinkedinIn /></a>
        </div>

        {/* Important Routes */}
        <div style={{ margin: '1rem 0' }}>
          <Link to="/" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Home</Link>
          <Link to="/menu" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Menu</Link>
          <Link to="/about" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>About</Link>
          <Link to="/contact" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Contact</Link>
          <Link to="/book" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Book Table</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
