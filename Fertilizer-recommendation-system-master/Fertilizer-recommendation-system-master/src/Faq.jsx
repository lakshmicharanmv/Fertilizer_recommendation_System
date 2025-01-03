import React, { useState } from "react";
import About from "./About";

function Faq() {
  // FAQ questions and answers
  const faqs = [
    {
      question: "What is the Fertilizer Recommendation System?",
      answer:
        "The Fertilizer Recommendation System is an interactive tool designed to provide tailored fertilizer recommendations based on specific inputs such as soil color, crop type, age of the crop, and fertilizer usage history. It aims to optimize crop growth and enhance agricultural productivity.",
    },
    {
      question: "How do I use the Fertilizer Recommendation System?",
      answer:
        "To use the system, select your soil color, crop type, crop age, and indicate if you’ve used any fertilizer in the past 10 days. The system will provide a tailored fertilizer recommendation to optimize crop growth.",
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
      question: "Can I get recommendations for crops not listed?",
      answer:
        "Currently, the system supports a fixed set of crops, but we are working to include more crop types in the future.",
    },
    {
      question: "How often should I update the soil data?",
      answer:
        "It is recommended to update the soil data periodically or whenever significant changes in soil conditions are observed.",
    },
    {
      question: "What should I do if I encounter an error with the system?",
      answer:
        "If you encounter an error, please check your inputs for accuracy. If the issue persists, feel free to contact support for further assistance.",
    },
    {
      question: "What is the NPK ratio?",
      answer:
        "The NPK ratio represents the percentages of Nitrogen (N), Phosphorus (P), and Potassium (K) in a fertilizer. This ratio is essential for understanding the fertilizer's suitability for different crops.",
    },
    {
      question: "How do I interpret the fertilizer recommendation?",
      answer:
        "The system provides a tailored fertilizer recommendation based on the selected inputs. The recommendation will include the type of fertilizer and the quantity to apply.",
    },
    {
      question: "Can I use this system for organic farming?",
      answer:
        "The system is designed to recommend fertilizers based on standard agricultural practices. For organic farming, it's important to use organic fertilizers or consult with experts in organic agriculture.",
    },
    {
      question: "Is this system available on mobile?",
      answer:
        "Yes, the system is responsive and works well on both desktop and mobile devices.",
    },
    {
      question: "What factors affect crop growth?",
      answer:
        "Factors such as soil quality, weather conditions, water availability, and fertilizer use all play a crucial role in crop growth.",
    },
    {
      question: "Does the system provide weather-based recommendations?",
      answer:
        "Yes, the system uses weather data to provide more accurate fertilizer recommendations tailored to current environmental conditions.",
    },
    {
      question: "How do I get started with the system?",
      answer:
        "Simply visit the website, select your soil and crop type, and input the necessary data such as crop age and fertilizer usage to get started.",
    },
    {
      question: "How often should I fertilize my crops?",
      answer:
        "The frequency of fertilization depends on the crop type, soil health, and environmental conditions. The system will suggest the optimal fertilization schedule.",
    },
    {
      question: "Are there any guidelines for irrigating crops?",
      answer:
        "Yes, the system provides irrigation guidelines based on soil moisture and crop requirements.",
    },
    {
      question: "Can I track the performance of my crops?",
      answer:
        "While the system does not directly track crop performance, it can help you make informed decisions to improve crop health and productivity.",
    },
    {
      question: "Is the Fertilizer Recommendation System free to use?",
      answer:
        "Yes, the Fertilizer Recommendation System is free to use for all users.",
    },
    {
      question: "How do I provide feedback on the system?",
      answer:
        "We welcome feedback! You can provide feedback through the contact form on our website or by reaching out to our support team.",
    },
    {
      question: "Who developed the Fertilizer Recommendation System?",
      answer:
        "The system was developed by AgroFertile, a team of agricultural and AI experts aiming to improve farming practices through technology.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [query, setQuery] = useState("");

  // Toggle FAQ answer visibility
  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Hide the answer if clicked again
    } else {
      setActiveIndex(index); // Show the answer
    }
  };

  // Handle custom query submission
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    alert(`Your query: ${query} has been submitted!`);
    setQuery(""); // Reset the query field
  };

  return (
    <>
      <div className="faqFull">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 onClick={() => toggleAnswer(index)}>{faq.question}</h3>
            {activeIndex === index && <p>{faq.answer}</p>}
          </div>
        ))}

        <div className="customQuery">
          <h3>Have a custom query?</h3>
          <form onSubmit={handleQuerySubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your question"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div>
        <About />
      </div>
    </>
  );
}

export default Faq;
