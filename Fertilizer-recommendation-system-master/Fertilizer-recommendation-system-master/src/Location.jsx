import React, { useState, useEffect } from "react";

function Location() {
  const [locationName, setLocationName] = useState("Location");
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = "48a79aadfa15ea6114cb45496ae56c02";

    const fetchData = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        
        if (data.cod === "404") {
          throw new Error("Location not found");
        }

        setLocationName(data.name); 
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        
        localStorage.setItem('temp', data.main.temp);
        localStorage.setItem('hum', data.main.humidity);
        // There is no 'mositure' field in OpenWeatherMap API, you might want to calculate it differently if needed
        localStorage.setItem('mos', 'N/A'); // or any other logic for moisture

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to fetch weather data");
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchData(latitude, longitude);
          },
          (err) => {
            console.error("Geolocation error:", err);
            setError("Geolocation access denied");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser");
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      {error ? <p>{error}</p> : (
        <div>
          <p>{locationName}</p>
          {/* <p>Temperature: {temp ? `${temp}°C` : "Loading..."}</p>
          <p>Humidity: {humidity ? `${humidity}%` : "Loading..."}</p> */}
        </div>
      )}
    </div>
  );
}

export default Location;
