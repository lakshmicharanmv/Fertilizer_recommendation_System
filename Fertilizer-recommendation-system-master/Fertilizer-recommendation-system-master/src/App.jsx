import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import Home from './Home';
import Faq from './Faq';
import Contact from './Contact';
import Footer from './Footer';
import './App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <header className="app-header-sticky">

        <nav className={`premium-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-brand">
            <span className="nav-title">AgroFertile</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/faq" className="nav-link">FAQs</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>
      </header>
      <main className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;