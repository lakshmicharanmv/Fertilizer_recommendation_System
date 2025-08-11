import React, { useState, useEffect } from "react";

function Location() {
  const [locationName, setLocationName] = useState("Loading location...");
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = "48a79aadfa15ea6114cb45496ae56c02";

    const fetchData = async (lat, lon) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.cod && data.cod !== 200) {
          throw new Error(data.message || "Location not found");
        }

        setLocationName(data.name || "Unknown location"); 
        setTemp(data.main?.temp);
        setHumidity(data.main?.humidity);
        
        // Store in localStorage if needed by other components
        localStorage.setItem('temp', data.main.temp);
        localStorage.setItem('hum', data.main.humidity);
        localStorage.setItem('weatherData', JSON.stringify({
          temp: data.main.temp,
          hum: data.main.humidity,
          timestamp: new Date().getTime()
        }));

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Unable to fetch weather data");
      } finally {
        setIsLoading(false);
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
            setError("Using default weather data");
            setLocationName("Default Location");
            setTemp(25);
            setHumidity(60);
            // Set default values in localStorage
            localStorage.setItem('temp', '25');
            localStorage.setItem('hum', '60');
            localStorage.setItem('weatherData', JSON.stringify({
              temp: 25,
              hum: 60,
              timestamp: new Date().getTime()
            }));
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000, // 10 seconds
            maximumAge: 60000 // 1 minute
          }
        );
      } else {
        setError("Using default weather data");
        setLocationName("Default Location");
        setTemp(25);
        setHumidity(60);
        // Set default values in localStorage
        localStorage.setItem('temp', '25');
        localStorage.setItem('hum', '60');
        localStorage.setItem('weatherData', JSON.stringify({
          temp: 25,
          hum: 60,
          timestamp: new Date().getTime()
        }));
        setIsLoading(false);
      }
    };

    getLocation();

    // Cleanup function if needed
    return () => {
      // Cancel any pending requests if component unmounts
    };
  }, []);

  return (
    <div className="location-info">
      {isLoading ? (
        <span>Loading location...</span>
      ) : error ? (
        <span>{error}</span>
      ) : (
        <span>📍 {locationName}</span>
      )}
    </div>
  );
}

export default Location;