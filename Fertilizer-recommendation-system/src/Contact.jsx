import React from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out with any questions or to start your next project.</p>
      </div>
      <div className="contact-content-wrapper">
        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>123 AgriField Lane, Harvestown, HT 54321</p>
          </div>
          <div className="info-item">
            <FaPhone className="info-icon" />
            <p>(123) 456-7890</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <p>contact@agrofertile.com</p>
          </div>
          <div className="social-media-contact">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
        <div className="contact-form-section">
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit" className="submit-contact-btn">Send Message</button>
          </form>
        </div>
      </div>
      <div className="map-section">
        {/* In a real application, you would embed an interactive map here */}
        <img src="https://via.placeholder.com/1200x400.png?text=Our+Location" alt="Map placeholder" />
      </div>
    </div>
  );
};

export default Contact;
