import React from "react";
import { Link } from 'react-router-dom';
import Field from "./assets/field.png";
import './About.css';

function About() {
  return (
    <footer className="premium-footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} AgroFertile. All rights reserved.</p>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default About;