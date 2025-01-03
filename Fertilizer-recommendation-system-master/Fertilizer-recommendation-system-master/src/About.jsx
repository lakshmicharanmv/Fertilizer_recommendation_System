import React from "react";
import { Link } from 'react-router-dom'
import Field from "./assets/field.png";

function About() {
  return (
    <>
      <footer>
        <div className="foot">
          <div className="footLogo">
            <img src={Field} alt="logo" id="logo"></img>
            <h1 id="logoName">AgroFertile</h1>
          </div>
          <div className="footLink">
            <a href="#homeSec">Home</a>
            <Link to="/faq">Faq</Link>
            <a href="#">Contact</a>
          </div>
          <div className="footProject">
            <a href="#">Project Info</a>
            <a href="#">Linked In</a>
          </div>
          <div className="footCopy">
            <h1>&copy;. All rights reserved</h1>
          </div>
        </div>
      </footer>
    </>
  );
}

export default About;
