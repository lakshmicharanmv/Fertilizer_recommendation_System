import React from 'react';
import './RecommendationModal.css';

const RecommendationModal = ({ recommendation, onClose }) => {
  if (!recommendation) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h3>Fertilizer Recommendation:</h3>
        <p className="fertilizer-result">{recommendation.fertilizer}</p>
        <h4>Additional Tips:</h4>
        <ul className="recommendation-list">
          {recommendation.recommendation && Object.entries(recommendation.recommendation).map(([key, value]) => (
            <li key={key}>
              <p><strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}</p>
            </li>
          ))}
        </ul>
        <button type="button" className="try-again-btn" onClick={onClose}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default RecommendationModal;
