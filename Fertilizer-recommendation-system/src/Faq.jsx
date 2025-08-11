import React, { useState } from "react";
import "./Faq.css"; // Create this CSS file for styling

function Faq() {
  const faqs = [
    {
      question: "What is the Fertilizer Recommendation System?",
      answer:
        "The Fertilizer Recommendation System is an interactive tool designed to provide tailored fertilizer recommendations based on specific inputs such as soil color, crop type, age of the crop, and fertilizer usage history. It aims to optimize crop growth and enhance agricultural productivity.",
    },
    {
      question: "How do I use the Fertilizer Recommendation System?",
      answer:
        "To use the system, select your soil color, crop type, crop age, and indicate if you've used any fertilizer in the past 10 days. The system will provide a tailored fertilizer recommendation to optimize crop growth.",
    },
    {
      question: "What types of crops does the system support?",
      answer:
        "The system supports a variety of crops including Maize, Sugarcane, Cotton, Tobacco, Paddy, Barley, Wheat, Millets, Oil seeds, Pulses, and Ground Nuts.",
    },
    {
      question: "How is the fertilizer recommendation calculated?",
      answer:
        "The system uses machine learning models trained on agricultural data to predict the most suitable fertilizer based on inputs like soil color, crop type, crop age, and fertilizer usage history.",
    },
    {
      question: "What is the NPK ratio?",
      answer:
        "The NPK ratio represents the percentages of Nitrogen (N), Phosphorus (P), and Potassium (K) in a fertilizer. This ratio is essential for understanding the fertilizer's suitability for different crops.",
    },
    {
      question: "Is this system available on mobile?",
      answer:
        "Yes, the system is responsive and works well on both desktop and mobile devices.",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle FAQ answer visibility
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle custom query submission
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    alert(`Your query: ${query} has been submitted! We'll get back to you soon.`);
    setQuery("");
  };

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      
      {/* Search functionality */}
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search FAQs"
        />
      </div>

      {/* FAQ List */}
      <div className="faq-list">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleAnswer(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                {faq.question}
                <span className="faq-toggle">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <div 
                  id={`faq-answer-${index}`} 
                  className="faq-answer"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No FAQs found matching your search.</p>
        )}
      </div>

      {/* Custom Query Form */}
      <div className="custom-query">
        <h2>Still have questions?</h2>
        <p>Can't find what you're looking for? Ask us directly!</p>
        <form onSubmit={handleQuerySubmit}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question here..."
            required
            aria-label="Your question"
            rows="4"
          />
          <button type="submit" className="submit-btn">
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default Faq;