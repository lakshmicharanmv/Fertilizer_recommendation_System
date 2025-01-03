import React, { useState } from "react";
import { Link } from "react-router-dom";
import Field from "./assets/field.png";
import Signup from "./Signup";
import Location from "./Location";
import About from "./About";
import axios from "axios";

function Home() {
  const [login, setLogin] = useState("Sign up");
  const [checkLog, setLog] = useState(false);
  const [out, setOut] = useState(false);
  const [getsign, setSign] = useState(false);
  const [ans, setAns] = useState("nothing");
  const [ansfind, setAnsfind] = useState(false);
  const [temp, setTemp] = useState(localStorage.getItem("temp"));
  const [humidity, setHumidity] = useState(localStorage.getItem("hum"));
  const [recommendation, setRecommendation] = useState("");
  const vegetables = [
    "---select the vegetable---",
    "Maize",
    "Sugarcane",
    "Cotton",
    "Tobacco",
    "Paddy",
    "Barley",
    "Wheat",
    "Millets",
    "Oil seeds",
    "Pulses",
    "Ground Nuts",
  ];

  function handleSignIn() {
    setLog(!checkLog);
  }

  function getSignup(data) {
    setLogin(data);
    if (data !== null) {
      setLog(false);
      setSign(true);
    }
  }

  function handleRecommendation(event) {
    event.preventDefault();
    const soilType = document.getElementById("soilColor").value;
    const cropType = document.getElementById("cropType").value;
    const cropAge = document.getElementById("cropAge").value;
    const npkRatio = document.getElementById("npk").value;
    const fertilizerUsed = document.getElementById("fertilize").value;

    const payload = {
      soilType,
      cropType,
      cropAge,
      npkRatio,
      fertilizerUsed,
      temperature: temp,
      humidity: humidity,
    };

    axios
      .post("http://127.0.0.1:8000/api/predict-fertilizer/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAns(response.data.fertilizer);
        setRecommendation(response.data.recommendation);
        setAnsfind(true);
        localStorage.setItem("recommendation", response.data.fertilizer);
      })
      .catch((error) => {
        console.error("Error fetching fertilizer recommendation:", error);
        alert("An error occurred while getting the recommendation.");
      });
  }

  return (
    <>
      <header>
        <nav>
          <div className="header">
            <div className="logoDiv">
              <img src={Field} alt="logo" id="logo" />
              <h1 id="logoName">AgroFertile</h1>
              <p id="location" title="Your Location">
                <i className="fa-solid fa-location-dot"></i>
                <Location />
              </p>
            </div>
            <div className="navDiv">
              <a href="#homeSec">Home</a>
              <a href="#footid">About</a>
              <Link to="/faq">FAQ</Link>
              <a href="#">Contact</a>
            </div>
            {/* <div className="loginDiv">
              <button type="button" onClick={handleSignIn}>
                <i className="fa-regular fa-circle-user"></i>
                {login}
              </button>
            </div> */}
          </div>
        </nav>
      </header>

      <main>
        <div className="backHead">
          <div className="onPic">
            <h1> Fertilizer Recommendation System</h1>
            <p>Simple | Easy</p>
          </div>
          <p id="homeSec"></p>
          <div className="useDiv">
            <h1>How to use</h1>
            <p>
              To use the Fertilizer Recommendation System, start by selecting
              your soil color (e.g., White, Black, Loamy) from the dropdown
              menu. Next, choose your crop type (e.g., Paddy, Barley) and enter
              the crop's age. Indicate if you have applied any fertilizer in the
              last 10 days and whether it was in NPK ratio. Based on this
              information, the system will provide a tailored fertilizer
              recommendation to optimize crop growth.
            </p>
          </div>
          <div className="formDiv">
            <h1>Enter your data</h1>
            <form>
              <p>Soil Color:</p>
              <select id="soilColor">
                <option value="">---Select the Color---</option>
                <option value="Black">Black</option>
                <option value="Loamy">Loamy</option>
                <option value="Red">Red</option>
                <option value="Sandy">Sandy</option>
                <option value="Clayey">Clayey</option>
              </select>
              <p>Crop Type:</p>
              <select id="cropType">
                {vegetables.map((vegi, index) => (
                  <option value={vegi} key={index}>
                    {vegi}
                  </option>
                ))}
              </select>
              <p>Age of Crop:</p>
              <input type="number" id="cropAge" placeholder="15 days" />
              <p>Any Fertilizer used in past 10 days:</p>
              <select id="fertilize">
                <option value="">---Select---</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <p>Enter NPK ratio:</p>
              <input type="text" id="npk" />
              <button type="submit" id="generate" onClick={handleRecommendation}>
                Get Recommendation
              </button>
            </form>
          </div>
        </div>
      </main>

      <div className={ansfind ? "recommend" : "norecommend"}>
        <h3>Fertilizer Recommendation:</h3>
        <p>{ans}</p>
        <h4>Additional Tips:</h4>
        {recommendation && typeof recommendation === "object" ? (
          <ul>
            {Object.entries(recommendation).map(([key, value], index) => (
              <li key={index}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>{recommendation}</p>
        )}
        <button type="button" id="tryAgain" onClick={() => setAnsfind(false)}>
          Try Again
        </button>
      </div>
      <p id="footid"></p>
      <footer >
        <About />
      </footer>
    </>
  );
}

export default Home;
