import axios from 'axios';
import { useState } from 'react';
import './Home.css';
import RecommendationModal from './RecommendationModal';

function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    soil_color: '',
    crop_type: '',
    age_of_crop: '',
    fertilizer_used: '',
    N_ratio: '',
    P_ratio: '',
    K_ratio: '',
  });
  const [errors, setErrors] = useState({});

  const getWeatherData = () => {
    const weather = localStorage.getItem('weather');
    if (weather) {
      return JSON.parse(weather);
    }
    return { temp: null, humidity: null };
  };

  const { temp, humidity } = getWeatherData();

  // Crop options
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

  // Soil color options
  const soilColors = [
    "---Select the Color---",
    "Black",
    "Loamy",
    "Red",
    "Sandy",
    "Clayey",
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.soil_color || formData.soil_color === soilColors[0]) {
      errors.soil_color = "Please select a soil color";
    }
    if (!formData.crop_type || formData.crop_type === vegetables[0]) {
      errors.crop_type = "Please select a crop type";
    }
    if (!formData.age_of_crop) {
      errors.age_of_crop = "Please enter crop age";
    }
    if (!formData.fertilizer_used) {
      errors.fertilizer_used = "Please select fertilizer usage";
    }
    return errors;
  };

  // Handle recommendation submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const apiData = {
          soilType: formData.soil_color,
          cropType: formData.crop_type,
          cropAge: formData.age_of_crop,
          fertilizerUsed: formData.fertilizer_used,
          npkRatio: `${formData.N_ratio}-${formData.P_ratio}-${formData.K_ratio}`,
          temperature: 25, // Placeholder value
          humidity: 60,    // Placeholder value
        };

        const response = await axios.post(
          'https://fertilizer-recommendation-system-48.vercel.app/api/predict-fertilizer/',
          apiData
        );
        if (response.data && response.data.fertilizer) {
          setRecommendation(response.data);
          setShowModal(true);
        } else {
          setErrors({ api: 'Failed to get a valid recommendation. Please try again.' });
        }
      } catch (error) {
        console.error('There was an error submitting the form:', error);
        setErrors({ api: 'An unexpected error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRecommendation(null);
    setErrors({});
    // Reset form fields
    setFormData({
      soil_color: '',
      crop_type: '',
      age_of_crop: '',
      fertilizer_used: '',
      N_ratio: '',
      P_ratio: '',
      K_ratio: '',
    });
  };

  return (
    <div className="home-container">

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Fertilizer Recommendation System</h1>
          <p className="hero-subtitle">Simple | Easy | Effective</p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="instructions-section">
        <h2 className="section-title">How to use</h2>
        <p className="instructions-text">
          To use the Fertilizer Recommendation System, start by selecting your soil color 
          (e.g., White, Black, Loamy) from the dropdown menu. Next, choose your crop type 
          (e.g., Paddy, Barley) and enter the crop's age. Indicate if you have applied any 
          fertilizer in the last 10 days and whether it was in NPK ratio. Based on this 
          information, the system will provide a tailored fertilizer recommendation to 
          optimize crop growth.
        </p>
      </section>

      {/* Recommendation Form */}
      <section className="form-section">
        <h2 className="section-title">Enter your data</h2>
        <form className="recommendation-form" onSubmit={handleSubmit}>
          {/* Soil Color */}
          <div className="form-group soil-color">
            <label htmlFor="soil_color">Soil Color:</label>
            <select 
              id="soil_color" 
              value={formData.soil_color}
              onChange={handleInputChange}
              className={errors.soil_color ? "error" : ""}
            >
              {soilColors.map((color, index) => (
                <option value={color} key={index}>
                  {color}
                </option>
              ))}
            </select>
            {errors.soil_color && (
              <span className="error-message">{errors.soil_color}</span>
            )}
          </div>

          {/* Crop Type */}
          <div className="form-group crop-type">
            <label htmlFor="crop_type">Crop Type:</label>
            <select 
              id="crop_type" 
              value={formData.crop_type}
              onChange={handleInputChange}
              className={errors.crop_type ? "error" : ""}
            >
              {vegetables.map((vegi, index) => (
                <option value={vegi} key={index}>
                  {vegi}
                </option>
              ))}
            </select>
            {errors.crop_type && (
              <span className="error-message">{errors.crop_type}</span>
            )}
          </div>

          {/* Crop Age */}
          <div className="form-group crop-age">
            <label htmlFor="age_of_crop">Age of Crop (days):</label>
            <input 
              type="number" 
              id="age_of_crop" 
              placeholder="e.g. 15" 
              value={formData.age_of_crop}
              onChange={handleInputChange}
              className={errors.age_of_crop ? "error" : ""}
            />
            {errors.age_of_crop && (
              <span className="error-message">{errors.age_of_crop}</span>
            )}
          </div>

          {/* Fertilizer Used */}
          <div className="form-group fertilizer-used">
            <label htmlFor="fertilizer_used">Any Fertilizer used in past 10 days:</label>
            <select 
              id="fertilizer_used" 
              value={formData.fertilizer_used}
              onChange={handleInputChange}
              className={errors.fertilizer_used ? "error" : ""}
            >
              <option value="">---Select---</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.fertilizer_used && (
              <span className="error-message">{errors.fertilizer_used}</span>
            )}
          </div>

          {/* NPK Ratio */}
          <div className="form-group npk-ratio">
            <label>Enter N-P-K ratio (optional):</label>
            <div className="npk-inputs">
              <input 
                type="number" 
                id="N_ratio" 
                placeholder="N"
                value={formData.N_ratio}
                onChange={handleInputChange}
              />
              <input 
                type="number" 
                id="P_ratio" 
                placeholder="P"
                value={formData.P_ratio}
                onChange={handleInputChange}
              />
              <input 
                type="number" 
                id="K_ratio" 
                placeholder="K"
                value={formData.K_ratio}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-button-container">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Get Recommendation"}
            </button>
          </div>
        </form>
      </section>

      {showModal && (
        <RecommendationModal 
          recommendation={recommendation} 
          onClose={handleCloseModal} 
        />
      )}


    </div>
  );
}

export default Home;