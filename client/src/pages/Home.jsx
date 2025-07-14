import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Home.css';

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1 className="home-heading">
          Welcome to <span className="green-text">My Restaurant</span>
        </h1>
        <p className="home-description">
          Experience exquisite dining in a cozy ambiance. We offer a blend of traditional and modern culinary delights, crafted with passion and the freshest ingredients.
        </p>

        <div className="features-grid">
          <div className="feature-card green-bg">
            <h2 className="feature-heading green-text">Our Specials</h2>
            <p className="feature-text">Discover our chef's daily recommendations and seasonal delights.</p>
            <Link to="/menu" className="action-button green-button">View Menu</Link>
          </div>
          <div className="feature-card blue-bg">
            <h2 className="feature-heading blue-text">Book Your Table</h2>
            <p className="feature-text">Reserve your spot for an unforgettable dining experience.</p>
            <Link to="/booking" className="action-button blue-button">Book Now</Link>
          </div>
        </div>

        <div className="testimonials">
          <h3 className="testimonial-heading">What Our Guests Say</h3>
          <div className="testimonial-container">
            <blockquote className="testimonial">
              <p>"Absolutely delightful food and impeccable service. A must-visit!"</p>
              <footer>— Manager</footer>
            </blockquote>
            <blockquote className="testimonial">
              <p>"The ambiance is perfect, and every dish was a masterpiece."</p>
              <footer>— Mehbub</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

